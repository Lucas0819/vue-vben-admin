<template>
  <div>
    <PageWrapper title="活动地址-有座">
      <CollapseContainer title="添加活动地址-有座">
        <BasicForm @register="register" @submit="handleSubmit">
          <template #locatorAction>
            <Button @click="startLocate">选择位置</Button>
          </template>
        </BasicForm>
      </CollapseContainer>
    </PageWrapper>
    <BasicModal @register="modalRegister" @ok="modalSubmit">
      <AMapLocator @register="locateRegister" height="400px" />
    </BasicModal>
  </div>
</template>

<script lang="ts">
  import { defineComponent, nextTick, ref, unref } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form';
  import { CollapseContainer } from '/@/components/Container';
  import { PageWrapper } from '/@/components/Page';
  import { formSchema } from '/@/views/tmp/tmp-place/tmpPlace.data';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { createTmpPlace, findOne, updateTmpPlace } from '/@/api/tmp/tmpPlace';
  import { useRouter } from 'vue-router';
  import { onMountedOrActivated } from '@vben/hooks';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useTabs } from '/@/hooks/web/useTabs';
  import { isNotEmpty } from '@/utils/is';
  import { BasicModal, useModal } from '@/components/Modal';
  import { AMapLocator, useAMapLocator } from '@/components/AMapLocator';
  import { TmpPlaceItem } from '@/api/tmp/model/tmpPlaceModel';
  import { Button } from '/@/components/Button';

  export default defineComponent({
    components: {
      AMapLocator,
      BasicModal,
      BasicForm,
      Button,
      CollapseContainer,
      PageWrapper,
    },
    setup() {
      const { t } = useI18n();
      const recordId = ref('');
      const router = useRouter();
      const data = ref<TmpPlaceItem | null>(null);
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
          setTitle('活动地址-有座-新增');
          return;
        }
        await resetFields();
        data.value = await findOne(recordId.value);
        setTitle('活动地址-有座-' + data.value?.remarks);
        setFieldsValue(data.value);
      });

      const [modalRegister, { setModalProps, openModal }] = useModal();

      onMountedOrActivated(() => {
        setModalProps({
          title: '选择位置',
        });
      });

      const [locateRegister, { setLocation, getLocation }] = useAMapLocator();

      const startLocate = () => {
        openModal(true);
        nextTick(() => {
          const unrefData = unref(data);
          if (unref(isUpdate) && isNotEmpty(unrefData)) {
            setLocation({
              longitude: unrefData.longitude,
              latitude: unrefData.latitude,
            });
          }
        });
      };

      const modalSubmit = () => {
        openModal(false);
        const location = getLocation();
        if (isNotEmpty(location)) {
          // ... do something
        }
      };

      async function handleSubmit() {
        const values = await validate();
        if (unref(isUpdate)) {
          values.id = unref(recordId);
          await updateTmpPlace(values);
        } else {
          await createTmpPlace(values);
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
              ? t('sys.api.updateSuccessMsg', ['活动地址-有座'])
              : t('sys.api.createSuccessMsg', ['活动地址-有座']),
            closable: false,
            okText: t('common.back'),
            onOk: resolve,
          });
        });
      }

      return {
        register,
        modalRegister,
        locateRegister,
        startLocate,
        modalSubmit,
        handleSubmit,
      };
    },
  });
</script>
