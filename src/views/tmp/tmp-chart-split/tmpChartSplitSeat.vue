<template>
  <div>
    <PageWrapper
      :title="tmpChart?.name"
      :sub-title="recordData?.name"
      contentBackground
      contentClass="flex flex-col"
      contentFullHeight
      fixedHeight
    >
      <template #extra v-if="isUpdate">
        <RadioGroup v-model:value="step" @click="handleChangeStep">
          <RadioButton value="1">1.修改结构</RadioButton>
          <RadioButton value="2">2.定义座位号<span class="text-red-500">(必填)</span></RadioButton>
          <RadioButton value="3"
            >3.定义区域<span class="text-red-500">(多结构必填)</span></RadioButton
          >
        </RadioGroup>
      </template>
      <div class="p-5 flex-1 flex flex-col overflow-hidden">
        <PageToolbox class="mb-5">
          <div class="h-10 flex flex-row items-center">
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
            <Alert :message="tips" type="info" class="flex-1 !ml-2" show-icon v-if="showTips" />
          </div>
        </PageToolbox>

        <canvas id="seatCvs" class="seat-cvs flex-1 overflow-hidden">
          <div class="absolute" v-show="selectRule?.visible" :style="selectRule?.style">
            {{ selectRule?.html }}
          </div>
        </canvas>
      </div>
    </PageWrapper>
    <BasicModal @register="modalRegister" @ok="handleResizeCanvas">
      <BaseForm @register="formRegister" />
    </BasicModal>
  </div>
</template>
<script lang="ts" setup>
  import { nextTick, ref, unref } from 'vue';
  import { useRouter } from 'vue-router';
  import { isNotEmpty, isUnDef } from '/@/utils/is';
  import { useTabs } from '/@/hooks/web/useTabs';
  import { onMountedOrActivated } from '@vben/hooks';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { createTmpChartSplit, findOne } from '/@/api/tmp/tmpChartSplit';
  import { findOne as findTmpChart } from '/@/api/tmp/tmpChart';
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
    selectRule,
    selectType,
  } from '@/utils/seat/seatAdd';
  import { Alert, Dropdown, Menu, RadioButton, RadioGroup } from 'ant-design-vue';
  import { DownOutlined } from '@ant-design/icons-vue';
  import { useLoading } from '@/components/Loading';
  import { t } from '@/hooks/web/useI18n';
  import { TmpChartItem } from '@/api/tmp/model/tmpChartModel';
  import { propTypes } from '@/utils/propTypes';
  import { SelectTypeEnum } from '@/utils/seat/seat';

  const { createConfirm, createInfoModal } = useMessage();
  const recordId = ref('');
  const recordData = ref<TmpChartSplitItem>();
  const router = useRouter();
  const { query } = unref(router.currentRoute);
  const isUpdate = ref(false);
  const btnLoading = ref(false);

  const { setTitle, closeCurrent } = useTabs();

  const initData = async () => {
    if (!isNotEmpty(query.id) && !isNotEmpty(query.tempChartId)) {
      createInfoModal({
        title: '提示',
        content: '缺少必要参数',
        onOk: async () => {
          await closeCurrent();
          router.back();
        },
      });
      return;
    }
    if (isNotEmpty(query.id)) {
      // 编辑
      isUpdate.value = true;
      recordData.value = await findOne(recordId.value);
      // await doFindTmpChart(recordData.value?.tempChartId);
    } else {
      // 根据票图模板新增
      // await doFindTmpChart(query.tempChartId);
      // recordData.value.name = tmpChart.value?.name;
    }
    initSeatAdd({
      setTips: setTips,
      setRuleVisible: () => {},
      setBtnAvailable: () => {},
    });
    if (!unref(isUpdate)) {
      openResizeCanvasModal();
      return;
    }
    if (isNotEmpty(recordData.value?.tempChartId)) {
      await doFindTmpChart(recordData.value?.tempChartId);
    }
    setTitle('票图结构模板-' + recordData.value?.name);
  };

  onMountedOrActivated(initData);

  const tmpChart = ref<TmpChartItem | null>(null);
  const doFindTmpChart = async (id: string | undefined) => {
    return new Promise((resolve) => {
      if (isUnDef(id)) {
        resolve();
        return;
      }
      findTmpChart(id).then((res) => {
        tmpChart.value = res;
        resolve(res);
      });
    });
  };

  // 步骤切换
  const step = ref<propTypes.string>('1');
  const handleChangeStep = () => {};
  // 座位结构

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
    if (isNotEmpty(recordData.value)) {
      recordData.value.name = value.name;
      recordData.value.initRow = value.initRow;
      recordData.value.initColumn = value.initColumn;
    }
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

  // 定义座位号

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
    if (isNotEmpty(recordData.value)) {
      recordData.value.stagePosition = stagePosition;
      recordData.value.desJson = JSON.stringify({ seatDetail });
    }
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
    border: 1px #ccc solid;
  }
</style>
