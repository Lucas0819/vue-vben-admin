<template>
  <PageWrapper title="活动地址-票图">
    <CollapseContainer title="添加活动地址-票图">
      <BasicForm @register="register" @submit="handleSubmit" />
    </CollapseContainer>
    <TmpChartSplitManagement v-if="isUpdate" :temp-chart-id="recordId" />
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent, ref, unref } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form';
  import { CollapseContainer } from '/@/components/Container';
  import { PageWrapper } from '/@/components/Page';
  import { formSchema } from '/@/views/tmp/tmp-chart/tmpChart.data';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { createTmpChart, findOne, updateTmpChart } from '/@/api/tmp/tmpChart';
  import { useRouter } from 'vue-router';
  import { onMountedOrActivated } from '@vben/hooks';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useTabs } from '/@/hooks/web/useTabs';
  import { isNotEmpty } from '@/utils/is';
  import TmpChartSplitManagement from '/@/views/tmp/tmp-chart-split/index.vue';
  import { TmpChartItem } from '@/api/tmp/model/tmpChartModel';
  import { useGo } from '@/hooks/web/usePage';
  import { PageEnum } from '@/enums/pageEnum';

  export default defineComponent({
    components: {
      TmpChartSplitManagement,
      BasicForm,
      CollapseContainer,
      PageWrapper,
    },
    setup() {
      const { t } = useI18n();
      const recordId = ref('');
      const data = ref<TmpChartItem | null>(null);
      const { currentRoute } = useRouter();
      const { query } = unref(currentRoute);
      const go = useGo();
      const isUpdate = ref(false);
      if (isNotEmpty(query.id)) {
        recordId.value = query.id;
        isUpdate.value = true;
      }

      const { setTitle, updatePath } = useTabs();

      const [register, { resetFields, setFieldsValue, validate }] = useForm({
        autoFocusFirstItem: true,
        labelWidth: 200,
        baseColProps: {
          span: 24,
        },
        wrapperCol: {
          span: 12,
        },
        actionColOptions: {
          span: 24,
          style: 'text-align: left; margin-left: 200px;',
        },
        resetButtonOptions: {
          text: t('common.resetText'),
        },
        submitButtonOptions: {
          text: t('common.saveText'),
        },
        schemas: formSchema,
      });

      onMountedOrActivated(async () => {
        if (!unref(isUpdate)) {
          setTitle('活动地址-票图-新增');
          return;
        }
        await resetFields();
        data.value = await findOne(recordId.value);
        setTitle('活动地址-票图-' + data.value?.name);
        setFieldsValue(data.value);
      });

      async function handleSubmit() {
        const values = await validate();
        if (unref(isUpdate)) {
          values.id = unref(recordId);
          await updateTmpChart(values);
        } else {
          // 默认未发布
          values.isRelease = false;
          recordId.value = await createTmpChart(values);
        }
        await handleSuccess();
        if (!unref(isUpdate)) {
          // 重定向到编辑页
          const path = PageEnum.TMP_TMP_CHART_FORM + `?id=${recordId.value}`;
          await updatePath(path);
          go(path, true);
        }
      }

      function handleSuccess() {
        return new Promise((resolve) => {
          const { createSuccessModal } = useMessage();
          createSuccessModal({
            title: t('sys.api.operationSuccess'),
            content: unref(isUpdate)
              ? t('sys.api.updateSuccessMsg', ['活动地址-票图'])
              : t('sys.api.createSuccessMsg', ['活动地址-票图']),
            closable: false,
            okText: t('common.okText'),
            onOk: () => {
              resolve();
              return Promise.resolve();
            },
          });
        });
      }

      return {
        isUpdate,
        data,
        recordId,
        register,
        handleSubmit,
      };
    },
  });
</script>
