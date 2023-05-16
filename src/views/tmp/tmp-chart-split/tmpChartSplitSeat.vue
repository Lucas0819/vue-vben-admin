<template>
  <div>
    <PageWrapper>
      <PageToolbox class="mb-5">
        <a-button
          type="primary"
          size="small"
          class="mr-2"
          preIcon="ant-design:qrcode-outlined"
          :loading="btnLoading"
          @click="openResizeCanvasModal"
        >
          修改画布
        </a-button>
        <a-button
          type="primary"
          size="small"
          class="mr-2"
          preIcon="ant-design:plus-outlined"
          :loading="btnLoading"
          @click="moveStage"
        >
          移动舞台
        </a-button>
        <a-button
          type="primary"
          size="small"
          class="mr-2"
          preIcon="ant-design:printer-outlined"
          :loading="btnLoading"
          @click="resizeProportion"
        >
          重置比例
        </a-button>
        <Dropdown>
          <a-button
            type="primary"
            size="small"
            class="mr-2"
            preIcon="ant-design:save-outlined"
            :loading="btnLoading"
          >
            {{ selectType === SelectTypeEnum.SQUARE ? '矩形选择' : '轨迹选择' }}
            <DownOutlined />
          </a-button>
          <template #overlay>
            <Menu>
              <Menu.Item>
                <a-button
                  type="primary"
                  size="small"
                  class="mr-2"
                  preIcon="ant-design:save-outlined"
                  :loading="btnLoading"
                  @click="changeSelectType(SelectTypeEnum.SQUARE)"
                >
                  矩形选择
                  <DownOutlined />
                </a-button>
              </Menu.Item>
              <Menu.Item>
                <a-button
                  type="primary"
                  size="small"
                  class="mr-2"
                  preIcon="ant-design:save-outlined"
                  :loading="btnLoading"
                  @click="changeSelectType(SelectTypeEnum.TRAJECTORY)"
                >
                  轨迹选择
                  <DownOutlined />
                </a-button>
              </Menu.Item>
            </Menu>
          </template>
        </Dropdown>
        <a-button
          type="primary"
          size="small"
          class="mr-2"
          preIcon="ant-design:printer-outlined"
          :loading="btnLoading"
          @click="revocation"
        >
          撤销
        </a-button>
        <a-button
          type="primary"
          size="small"
          class="mr-2"
          preIcon="ant-design:printer-outlined"
          :loading="btnLoading"
          @click="saveRecordData"
        >
          保存
        </a-button>
        <Alert :message="tips" type="info" show-icon v-if="showTips" />
      </PageToolbox>

      <canvas
        id="seatCvs"
        class="seat-cvs"
        style="position: relative; top: -6px; border: 1px #ccc solid"
      ></canvas>
      <!--      <div v-if="selectRule">{{ selectRule.html }}</div>-->
    </PageWrapper>
    <BasicModal @register="modalRegister" @ok="handleResizeCanvas">
      <BaseForm @register="formRegister" />
    </BasicModal>
  </div>
</template>
<script lang="ts" setup>
  import { nextTick, ref, unref } from 'vue';
  import { useRouter } from 'vue-router';
  import { isNotEmpty } from '/@/utils/is';
  import { useTabs } from '/@/hooks/web/useTabs';
  import { onMountedOrActivated } from '@vben/hooks';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { createTmpChartSplit, findOne } from '/@/api/tmp/tmpChartSplit';
  import { TmpChartSplitItem } from '/@/api/tmp/model/tmpChartSplitModel';
  import BasicModal from '@/components/Modal/src/BasicModal.vue';
  import { useModal } from '@/components/Modal';
  import BaseForm from '@/views/form-design/examples/baseForm.vue';
  import { useForm } from '@/components/Form';
  import { formSchema } from './tmpChartSplit.data';
  import { PageToolbox, PageWrapper } from '/@/components/Page';
  import { hasHistory } from '@/utils/seat/seatUtil';
  import {
    changeSelectType,
    getSeatDetail,
    getStagePosition,
    initSeatAdd,
    moveStage,
    reInitSeatAdd,
    resizeProportion,
    revocation,
    selectType,
  } from '@/utils/seat/seatAdd';
  import { Alert, Dropdown, Menu } from 'ant-design-vue';
  import { DownOutlined } from '@ant-design/icons-vue';
  import { SelectTypeEnum } from '@/utils/seat/typing';
  import { useLoading } from '@/components/Loading';
  import { t } from '@/hooks/web/useI18n';

  const { createConfirm } = useMessage();
  const recordId = ref('');
  const recordData = ref<TmpChartSplitItem>({});
  const router = useRouter();
  const { query } = unref(router.currentRoute);
  const isUpdate = ref(false);
  const btnLoading = ref(false);

  if (isNotEmpty(query.id)) {
    recordId.value = query.id;
    isUpdate.value = true;
  } else {
    if (isNotEmpty(query.name)) {
      recordData.value.name = query.name;
    }
    if (isNotEmpty(query.tempChartId)) {
      recordData.value.tempChartId = query.tempChartId;
    }
  }

  const { setTitle } = useTabs();

  const [modalRegister, { setModalProps, openModal }] = useModal();

  const openResizeCanvasModal = () => {
    setModalProps({ title: '生成画布' });
    openModal(true);
    nextTick(() => {
      setFieldsValue({
        tmpChartName: recordData.value?.name,
        initRow: recordData.value?.initRow ?? 10,
        initColumn: recordData.value?.initColumn ?? 10,
      });
      clearValidate();
    });
  };

  const handleResizeCanvas = async () => {
    const value = await validateFields();
    if (!hasHistory()) {
      resizeCanvas(value);
      return;
    }
    createConfirm({
      iconType: 'warning',
      title: '操作确认',
      content:
        '重新生成将清空已绘制的座位，确定这样做吗？（如果只修改结构名称，请关闭此页面，进入修改页面修改！）',
      onOk: () => {
        resizeCanvas(value);
      },
    });
  };

  const resizeCanvas = (value) => {
    openModal(false);
    recordData.value.name = value.name;
    recordData.value.initRow = value.initRow;
    recordData.value.initColumn = value.initColumn;
    reInitSeatAdd(value.initRow, value.initColumn);
  };

  const [formRegister, { setFieldsValue, clearValidate, validateFields }] = useForm({
    schemas: formSchema,
    baseColProps: {
      span: 24,
    },
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
    showActionButtonGroup: false,
  });

  const tips = ref('');
  const showTips = ref(false);
  let showTipsTimeout;
  const setTips = (_tips: string, delay: number) => {
    showTipsTimeout && clearTimeout(showTipsTimeout);
    showTipsTimeout = null;
    showTips.value = true;
    tips.value = _tips;
    showTipsTimeout = setTimeout(() => {
      showTips.value = false;
    }, delay * 1000);
  };

  onMountedOrActivated(async () => {
    initSeatAdd({
      setTips: setTips,
      setRuleVisible: () => {},
      setBtnAvailable: () => {},
    });
    if (!unref(isUpdate)) {
      openResizeCanvasModal();
      return;
    }
    recordData.value = await findOne(recordId.value);
    setTitle('票图结构模板-' + recordData.value?.name);
  });

  const [openFullLoading, closeFullLoading] = useLoading({
    tip: '加载中...',
  });
  const { createMessage } = useMessage();
  const saveRecordData = async () => {
    openFullLoading();
    btnLoading.value = true;
    const stagePosition = getStagePosition();
    const seatDetail = getSeatDetail();
    if (seatDetail.length === 0) {
      closeFullLoading();
      btnLoading.value = false;
      createMessage.error('没有已选定座位');
      return;
    }
    recordData.value.stagePosition = stagePosition;
    recordData.value.desJson = JSON.stringify({ seatDetail });
    try {
      await createTmpChartSplit(unref(recordData));
      createMessage.success(t('sys.api.operationSuccess'));
    } finally {
      closeFullLoading();
      btnLoading.value = false;
    }
  };
</script>
<style lang="scss" scoped>
  .seat-cvs {
    position: relative;
    top: -6px;
    width: 100%;
    height: 100%;
    border: 1px #ccc solid;
  }
</style>
