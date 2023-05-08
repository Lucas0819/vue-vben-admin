<template>
  <PageWrapper title="活动场次">
    <CollapseContainer title="添加活动场次">
      <BasicForm @register="register" @submit="handleSubmit" />
    </CollapseContainer>
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent, ref, unref } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form';
  import { CollapseContainer } from '/@/components/Container';
  import { PageWrapper } from '/@/components/Page';
  import { formSchema } from '/@/views/bis/bis-activity-event/bisActivityEvent.data';
  import { useI18n } from '/@/hooks/web/useI18n';
  import {
    createBisActivityEvent,
    findOne,
    updateBisActivityEvent,
  } from '/@/api/bis/bisActivityEvent';
  import { useRouter } from 'vue-router';
  import { onMountedOrActivated } from '@vben/hooks';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useTabs } from '/@/hooks/web/useTabs';
  import { isNotEmpty } from '@/utils/is';

  export default defineComponent({
    components: {
      BasicForm,
      CollapseContainer,
      PageWrapper,
    },
    setup() {
      const { t } = useI18n();
      const recordId = ref('');
      const router = useRouter();
      const { query } = unref(router.currentRoute);
      const isUpdate = ref(false);
      if (isNotEmpty(query.id)) {
        recordId.value = query.id;
        isUpdate.value = true;
      }

      const { setTitle, closeCurrent } = useTabs();

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
          setTitle('活动场次-新增');
          return;
        }
        await resetFields();
        const data = await findOne(recordId.value);
        setTitle('活动场次-' + data.name);
        setFieldsValue(data);
      });

      async function handleSubmit() {
        const values = await validate();
        if (unref(isUpdate)) {
          values.id = unref(recordId);
          await updateBisActivityEvent(values);
        } else {
          await createBisActivityEvent(values);
        }
        await handleSuccess();
        await closeCurrent();
        router.back();
      }

      function handleSuccess() {
        return new Promise((resolve) => {
          const { createSuccessModal } = useMessage();
          createSuccessModal({
            title: t('sys.api.operationSuccess'),
            content: unref(isUpdate)
              ? t('sys.api.updateSuccessMsg', ['活动场次'])
              : t('sys.api.createSuccessMsg', ['活动场次']),
            closable: false,
            okText: t('common.back'),
            onOk: resolve,
          });
        });
      }

      return {
        register,
        handleSubmit,
      };
    },
  });
</script>
