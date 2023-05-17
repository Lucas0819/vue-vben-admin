<template>
  <div>
    <PageWrapper
      :title="recordData?.tmpChartName ?? '票图'"
      :sub-title="recordData?.name ?? '票图结构'"
      contentBackground
      contentClass="flex flex-col"
      contentFullHeight
      fixedHeight
    >
      <template #headerContent v-if="isUpdate">
        <RadioGroup v-model:value="step" @change="getAndSetSeatDataByStep">
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
      <BasicForm @register="formRegister">
        <template #appendRow="{ model, field }">
          <ARow class="items-center">
            <ACol span="4" class="text-center">{{ model.originRow }} + </ACol>
            <ACol span="20"><AInputNumber v-model:value="model[field]" /></ACol>
          </ARow>
        </template>
        <template #appendColumn="{ model, field }">
          <ARow class="items-center">
            <ACol span="4" class="text-center">{{ model.originColumn }} + </ACol>
            <ACol span="20"><AInputNumber v-model:value="model[field]" /></ACol>
          </ARow>
        </template>
      </BasicForm>
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
  import { createTmpChartSplit, findOne, updateTmpChartSplit } from '/@/api/tmp/tmpChartSplit';
  import { findOne as findTmpChart } from '/@/api/tmp/tmpChart';
  import { TmpChartSplitItem } from '/@/api/tmp/model/tmpChartSplitModel';
  import BasicModal from '@/components/Modal/src/BasicModal.vue';
  import { useModal } from '@/components/Modal';
  import { useForm } from '@/components/Form';
  import { formSchema } from './tmpChartSplit.data';
  import { PageToolbox, PageWrapper } from '/@/components/Page';
  import { clearHistory, hasHistory } from '@/utils/seat/seatUtil';
  import {
    changeSelectType,
    destroySeatByStruct,
    getSeatDetail,
    initSeatByStruct,
    selectRule,
    selectType,
  } from '@/utils/seat/seatStruct';
  import {
    getStagePosition,
    initSeat,
    moveStage,
    reInitSeat,
    resizeProportion,
    revocation,
    setSeatData,
  } from '@/utils/seat/seatInit';
  import {
    Alert,
    Col as ACol,
    Dropdown,
    InputNumber as AInputNumber,
    Menu,
    RadioButton,
    RadioGroup,
    Row as ARow,
  } from 'ant-design-vue';
  import { DownOutlined } from '@ant-design/icons-vue';
  import { useLoading } from '@/components/Loading';
  import { TmpChartItem } from '@/api/tmp/model/tmpChartModel';
  import { propTypes } from '@/utils/propTypes';
  import { SelectTypeEnum } from '@/utils/seat/typing';
  import { initSeatByNo } from '@/utils/seat/seatNo';
  import { useI18n } from '@/hooks/web/useI18n';
  import { useGo } from '@/hooks/web/usePage';
  import BasicForm from '@/components/Form/src/BasicForm.vue';

  const { createConfirm, createInfoModal, createMessage } = useMessage();
  const recordId = ref('');
  const recordData = ref<TmpChartSplitItem>({});
  const router = useRouter();
  const { query } = unref(router.currentRoute);
  const isUpdate = ref(false);
  const btnLoading = ref(false);
  let seatCtx, seatCvs;

  const { t } = useI18n();
  const go = useGo();
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
      recordId.value = query.id;
      recordData.value = await findOne(recordId.value);
      await doFindTmpChart(recordData.value.tempChartId);
    } else {
      // 根据票图模板新增
      await doFindTmpChart(query.tempChartId);
      // 结构模板的默认名称
      recordData.value.name = tmpChart.value?.name;
      recordData.value.tempChartId = query.tempChartId;
      recordData.value.tmpChartName = tmpChart.value?.name;
    }

    // 座位图结构初始化
    const { seatCtx: _seatCtx, seatCvs: _seatCvs } = initSeat({
      rowsNum: recordData.value.initRow ?? 10,
      colsNum: recordData.value.initColumn ?? 10,
      stagePosition: recordData.value.stagePosition,
      setTips: setTips,
      setRuleVisible: () => {},
      setBtnAvailable: () => {},
    });
    seatCtx = _seatCtx;
    seatCvs = _seatCvs;
    // 根据具体的步骤，获取座位信息并绘制
    getAndSetSeatDataByStep();

    if (!unref(isUpdate)) {
      openResizeCanvasModal();
      return;
    }
    setTitle('票图结构模板-' + recordData.value.name);
  };

  onMountedOrActivated(initData);

  // 所属票图查询
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
  const step = ref<propTypes.string>(StepEnum.STEP_ONE);
  const enum StepEnum {
    STEP_ONE = '1',
    STEP_TWO = '2',
    STEP_THREE = '3',
  }
  const getAndSetSeatDataByStep = () => {
    switch (unref(step)) {
      case StepEnum.STEP_ONE:
        // 初始化座位结构JS
        initSeatByStruct({
          seatCtx,
          seatCvs,
          rowsNum: recordData.value.initRow ?? 10,
          colsNum: recordData.value.initColumn ?? 10,
          seatDetail: JSON.parse(recordData.value.desJson ?? '{}').seatDetail ?? [],
          setSeatData: setSeatData,
          setTips: setTips,
          setRuleVisible: () => {},
          setBtnAvailable: () => {},
        });
        break;
      case StepEnum.STEP_TWO:
        destroySeatByStruct();
        initSeatByNo({
          seatCtx,
          seatCvs,
          rowsNum: recordData.value.initRow ?? 10,
          colsNum: recordData.value.initColumn ?? 10,
          seatDetail: JSON.parse(recordData.value.desJson ?? '{}').seatDetail ?? [],
          setSeatData: setSeatData,
          setTips: setTips,
          setRuleVisible: () => {},
          setBtnAvailable: () => {},
        });
        break;
      case StepEnum.STEP_THREE:
        destroySeatByStruct();
        break;
    }
  };

  // 座位结构
  const [modalRegister, { setModalProps, openModal }] = useModal();

  const openResizeCanvasModal = () => {
    setModalProps({ title: '生成画布' });
    openModal(true);
    nextTick(() => {
      if (unref(isUpdate)) {
        // 不允许修改原有行列数
        updateSchema([
          {
            field: 'initRow',
            label: '排数',
            slot: 'appendRow',
            helpMessage: '排数不可修改',
            required: false,
            component: 'InputNumber',
            defaultValue: 0,
          },
          {
            field: 'initColumn',
            label: '列数',
            slot: 'appendColumn',
            helpMessage: '列数不可修改',
            required: false,
            component: 'InputNumber',
            defaultValue: 0,
          },
        ]);
        setFieldsValue({
          name: recordData.value.name,
          originRow: recordData.value.initRow ?? 10,
          originColumn: recordData.value.initColumn ?? 10,
          initRow: 0,
          initColumn: 0,
        });
      } else {
        setFieldsValue({
          name: recordData.value.name,
          initRow: recordData.value.initRow ?? 10,
          initColumn: recordData.value.initColumn ?? 10,
        });
      }
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
    if (unref(isUpdate)) {
      // 追加行、列，更新座位数据
      const rowsNum = recordData.value.initRow ?? 10;
      const colsNum = recordData.value.initColumn ?? 10;
      const appendRowsNum = value.initRow ?? 0;
      const appendColsNum = value.initColumn ?? 0;
      const newRowsNum = rowsNum + appendRowsNum;
      const newColsNum = colsNum + appendColsNum;
      recordData.value.initRow = newRowsNum;
      recordData.value.initColumn = newColsNum;
      reInitSeat(newRowsNum, newColsNum);
      //追加列时修改原有座位下标
      if (appendRowsNum > 0) {
        let seatDetail = getSeatDetail();
        seatDetail = seatDetail.map((seat) => {
          const index = seat.split('|')[0];
          const oldRow = Math.floor(index / colsNum);
          const oldCol = index % colsNum;
          const newSeatIndex = oldRow * newColsNum + oldCol;
          seat = newSeatIndex + seat.substring(seat.indexOf('|'));
          return seat;
        });
        const desJson = JSON.parse(recordData.value.desJson ?? '{}');
        desJson.seatDetail = seatDetail;
        recordData.value.desJson = JSON.stringify(desJson);
      }
    } else {
      recordData.value.initRow = value.initRow;
      recordData.value.initColumn = value.initColumn;
      reInitSeat(value.initRow, value.initColumn);
    }
    getAndSetSeatDataByStep();
  };

  const [formRegister, { updateSchema, setFieldsValue, clearValidate, validateFields }] = useForm({
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

  // 新增|更新数据
  // TODO @Lucas 1.更新数据 2.新增数据后页面重定向
  const [openFullLoading, closeFullLoading] = useLoading({
    tip: '加载中...',
  });
  const saveRecordData = async () => {
    openFullLoading();
    btnLoading.value = true;
    try {
      if (unref(isUpdate)) {
        await updateRecordData();
      } else {
        await createRecordData();
      }
    } finally {
      closeFullLoading();
      btnLoading.value = false;
    }
  };
  const createRecordData = async () => {
    const stagePosition = getStagePosition();
    const seatDetail = getSeatDetail();
    if (seatDetail.length === 0) {
      createMessage.error('没有已选定座位');
      return;
    }
    recordData.value.stagePosition = stagePosition;
    recordData.value.desJson = JSON.stringify({
      name: recordData.value.name,
      tempChartId: recordData.value.tempChartId,
      rowsNum: recordData.value.initRow,
      colsNum: recordData.value.initColumn,
      stageShow: 1, // 默认展示舞台
      stagePosition,
      seatDetail,
    });
    const id = await createTmpChartSplit(unref(recordData));
    createInfoModal({
      title: t('sys.api.operationSuccess'),
      content: t('sys.api.createSuccessMsg', ['票图结构']),
      onOk: () => {
        go({ query: { id } });
        return Promise.resolve();
      },
    });
  };
  const updateRecordData = async () => {
    const stagePosition = getStagePosition();
    const seatDetail = getSeatDetail();
    if (seatDetail.length === 0) {
      closeFullLoading();
      btnLoading.value = false;
      createMessage.error('没有已选定座位');
      return;
    }
    recordData.value.stagePosition = stagePosition;
    recordData.value.desJson = JSON.stringify({
      name: recordData.value.name,
      tempChartId: recordData.value.tempChartId,
      rowsNum: recordData.value.initRow,
      colsNum: recordData.value.initColumn,
      stageShow: 1, // 默认展示舞台
      stagePosition,
      seatDetail,
    });
    await updateTmpChartSplit(unref(recordData));
    createMessage.success(t('sys.api.operationSuccess'));
    // 保存成功，移除操作历史
    clearHistory();
  };
</script>
<style lang="scss" scoped>
  .seat-cvs {
    position: relative;
    border: 1px #ccc solid;
  }
</style>
