<template>
  <PageWrapper title="创建商户">
    <CollapseContainer title="商户基本信息">
      <BasicForm @register="register" @submit="handleSubmit" />
    </CollapseContainer>
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent, ref, unref } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form';
  import { CollapseContainer } from '/@/components/Container';
  import { PageWrapper } from '/@/components/Page';
  import { formSchema } from '/@/views/merchant/office/office.data';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { createOffice, findOne, updateOffice } from '/@/api/merchant/office';
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
        baseColProps: {
          span: 24,
        },
        labelCol: {
          span: 4,
        },
        wrapperCol: {
          span: 8,
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
        if (!unref(isUpdate)) return;
        await resetFields();
        const data = await findOne(recordId.value);
        setTitle('主办单位-' + data.name);
        setFieldsValue(data);
      });

      async function handleSubmit() {
        const values = await validate();
        const office = { ...values };
        if (office.cityId && office.cityId.length > 0) {
          office.cityId = office.cityId[office.cityId.length - 1];
        }
        if (unref(isUpdate)) {
          office.id = unref(recordId);
          await updateOffice(office);
        } else {
          await createOffice(office);
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
              ? t('sys.api.updateSuccessMsg', ['主办单位'])
              : t('sys.api.createSuccessMsg', ['主办单位']),
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
