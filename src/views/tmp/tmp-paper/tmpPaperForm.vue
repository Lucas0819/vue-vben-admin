<template>
  <div>
    <a-card title="票纸设计" class="!m-5" :bordered="false">
      <PageToolbox class="mb-5">
        <a-button
          type="primary"
          size="small"
          class="mr-2"
          preIcon="ant-design:qrcode-outlined"
          :loading="btnLoading"
          @click="addItemQr"
        >
          添加二维码
        </a-button>
        <a-button
          type="primary"
          size="small"
          class="mr-2"
          preIcon="ant-design:plus-outlined"
          :loading="btnLoading"
          @click="addItemText"
        >
          添加信息
        </a-button>
        <a-button
          type="primary"
          size="small"
          class="mr-2"
          preIcon="ant-design:save-outlined"
          :loading="btnLoading"
          @click="submitTmpPaper"
        >
          保存
        </a-button>
        <a-button
          type="primary"
          size="small"
          class="mr-2"
          preIcon="ant-design:printer-outlined"
          :loading="btnLoading"
        >
          打印测试
        </a-button>
      </PageToolbox>
      <div
        ref="dropRef"
        class="container"
        :style="{ backgroundImage: `url('${defaultTicketBgData}')` }"
      >
        <TmpPaperItem
          v-for="item in elementList"
          :key="item._key"
          :item="item"
          :get-paper-size="getPaperSize"
          @move:box="moveBox"
          @on:qr-width-change="qrWidthResizeHandler"
          @on:qr-width-changed="updateItemKey"
          @on:edit="editItem"
          @on:remove="removeItem"
        />
        <TmpPaperDragLayer :get-paper-size="getPaperSize" />
      </div>
    </a-card>
    <a-card title="描述" class="!m-5" :bordered="false">
      <a-textarea v-model:value="remarks" />
    </a-card>
    <BasicModal @register="modalRegister" @ok="submit" title="自定义信息显示配置">
      <BasicForm @register="formRegister" />
    </BasicModal>
  </div>
</template>

<script lang="ts">
  import { defineComponent, nextTick, ref, unref } from 'vue';
  import { PageToolbox } from '/@/components/Page';
  import { createTmpPaper, findOne, updateTmpPaper } from '/@/api/tmp/tmpPaper';
  import { useRouter } from 'vue-router';
  import { onMountedOrActivated } from '@vben/hooks';
  import { useTabs } from '/@/hooks/web/useTabs';
  import { isNotEmpty } from '@/utils/is';
  import { useDrop } from 'vue3-dnd';
  import TmpPaperItem from './TmpPaperItem.vue';
  import { Card } from 'ant-design-vue';
  import { buildUUID } from '@/utils/uuid';
  import TmpPaperDragLayer from '@/views/tmp/tmp-paper/TmpPaperDragLayer.vue';
  import {
    calcPaperPosition,
    calcPaperPositionInside,
    defaultQrCodeItem,
    defaultTextItem,
    defaultTickFaceDataForBOCA,
    defaultTickFaceDataForTSC,
    defaultTmpPaperItem,
    translatePaperTemplate,
  } from '@/views/tmp/tmp-paper/tmpPaper';
  import { TmpPaperElItem } from '@/api/tmp/model/tmpPaperModel';
  import { BasicModal, useModal } from '@/components/Modal';
  import { BasicForm, FormSchema, useForm } from '@/components/Form';
  import { TmpPaperElTemplateEnum } from '@/enums/tmp/tmpPaperEnum';
  import { useMessage } from '@/hooks/web/useMessage';
  import { useI18n } from '@/hooks/web/useI18n';
  import projectSetting from '@/settings/projectSetting';
  import { downloadFileUrl } from '@/api/sys/file';

  export default defineComponent({
    components: {
      BasicForm,
      BasicModal,
      TmpPaperDragLayer,
      ACard: Card,
      PageToolbox,
      TmpPaperItem,
    },
    setup() {
      const recordId = ref('');
      const printType = ref('');
      const remarks = ref('');
      const { currentRoute } = useRouter();
      const { query } = unref(currentRoute);
      const isUpdate = ref(false);
      const isUpdateItem = ref(false);
      const dropRef = ref<HTMLDivElement | null>(null);
      const defaultTicketBg = projectSetting.fileBucket + 'bg_ticket.jpg';
      const defaultTicketBgData = ref(downloadFileUrl(defaultTicketBg));

      if (isNotEmpty(query.id)) {
        recordId.value = query.id;
        isUpdate.value = true;
      } else {
        printType.value = query.type;
        remarks.value = query.remarks;
      }

      const elementList = ref<TmpPaperElItem[]>([]);

      const data = ref<TmpPaperItem>({});
      onMountedOrActivated(async () => {
        if (!unref(isUpdate)) {
          setTitle('票纸设计-新增');
          generateDefaultData();
        } else {
          setTitle('票纸设计-编辑');
          data.value = await findOne(recordId.value);
          remarks.value = data.value.remarks ?? '';
          if (isNotEmpty(remarks.value)) {
            setTitle(`票纸设计-${remarks.value}`);
          }
          try {
            data.value.ticketFaceDataParse = JSON.parse(data.value.ticketFaceData);
          } catch (e) {
            console.log(e);
          }
        }
        if (isNotEmpty(data.value.ticketFaceDataParse?.ticketElementList)) {
          elementList.value =
            data.value.ticketFaceDataParse?.ticketElementList.map((item) => ({
              ...item,
              _id: buildUUID(),
              _key: buildUUID(),
              title: translatePaperTemplate(item.caption),
            })) ?? [];
        }
      });

      const generateDefaultData = () => {
        const tmpPaperItem = defaultTmpPaperItem;
        tmpPaperItem.remarks = unref(remarks);
        tmpPaperItem.ticketFaceDataParse =
          printType.value === 'tsc' ? defaultTickFaceDataForTSC : defaultTickFaceDataForBOCA;
        tmpPaperItem.ticketFaceData = JSON.stringify(tmpPaperItem.ticketFaceDataParse);
        data.value = tmpPaperItem;
      };

      const moveBox = (id: string, elmLef: number, elmTop: number) => {
        // 每次移动，重新调整key，防止无法拖拽
        const item = elementList.value.find((item) => item._id === id);
        isNotEmpty(item) && Object.assign(item, { _key: buildUUID(), elmLef, elmTop });
        updateItemKey(id);
      };

      const qrWidthResizeHandler = (id: string, elmWidth: number) => {
        const item = elementList.value.find((item) => item._id === id);
        isNotEmpty(item) && Object.assign(item, { elmWidth, elmHeight: elmWidth });
      };

      const updateItemKey = (id) => {
        const item = elementList.value.find((item) => item._id === id);
        isNotEmpty(item) && Object.assign(item, { _key: buildUUID() });
      };

      const [collectedProps, dropConnector] = useDrop(() => ({
        accept: 'BOX',
        collect(monitor) {
          return {
            item: monitor.getItem(),
            elementType: monitor.getItem()?.elementType,
          };
        },
        drop(item: TmpPaperElItem, monitor) {
          const dropEl = dropRef.value;
          if (!dropEl) return;
          const { left, top } = calcPaperPosition(
            item.elmLef,
            item.elmTop,
            monitor.getDifferenceFromInitialOffset(),
          );
          // 防止移出边界
          const { x, y } = calcPaperPositionInside(
            left,
            top,
            item.elmWidth ?? 0,
            item.elmHeight ?? 0,
            dropEl.offsetWidth,
            dropEl.offsetHeight,
          );
          moveBox(item._id ?? '', x, y);
          return {};
        },
      }));

      onMountedOrActivated(() => {
        dropConnector(dropRef);
      });

      const { setTitle } = useTabs();

      const getPaperSize = (): { width: number; height: number } => {
        return {
          width: dropRef.value?.offsetWidth ?? 0,
          height: dropRef.value?.offsetHeight ?? 0,
        };
      };

      const elementTextTypeList = Object.keys(TmpPaperElTemplateEnum).map((key) => {
        return {
          label: TmpPaperElTemplateEnum[key],
          value: key,
          key,
        };
      });

      const fontSizeList = Array.from({ length: 29 }, (x, i) => ({
        label: i + 12 + 'px',
        value: i + 12,
        key: 'font_size_' + i,
      }));

      const schemas: FormSchema[] = [
        {
          field: 'captionType',
          component: 'Select',
          label: '信息类型',
          defaultValue: '${customMsg}',
          componentProps: {
            options: elementTextTypeList,
            onChange: (value) => {
              if (value === '${customMsg}') {
                const { caption } = getFieldsValue();
                if (Object.keys(TmpPaperElTemplateEnum).includes(caption)) {
                  setFieldsValue({ caption: '' });
                  clearValidate();
                }
              } else {
                setFieldsValue({ caption: value });
              }
            },
          },
        },
        {
          field: 'caption',
          component: 'Input',
          label: '自定义信息内容',
          rules: [
            {
              required: true,
              message: '请输入自定义信息内容',
            },
          ],
          show: () => {
            return getFieldsValue()?.captionType === '${customMsg}';
          },
        },
        {
          field: 'fontName',
          component: 'Select',
          label: '字体',
          defaultValue: 'SIMHEI',
          componentProps: {
            options: [
              {
                label: '黑体',
                value: 'SIMHEI',
                key: 'SIMHEI',
              },
              {
                label: '宋体',
                value: 'STZHONGS',
                key: 'STZHONGS',
              },
              {
                label: '仿宋',
                value: 'LISHU',
                key: 'LISHU',
              },
            ],
          },
        },
        {
          field: 'fontHeight',
          component: 'Select',
          label: '字号',
          defaultValue: 12,
          componentProps: {
            options: fontSizeList,
          },
        },
        {
          field: 'fontBold',
          component: 'Select',
          label: '字重',
          defaultValue: 'true',
          componentProps: {
            options: [
              {
                label: '加粗',
                value: 'true',
                key: 'font_bold_bolder',
              },
              {
                label: '正常',
                value: 'false',
                key: 'font_bold_normal',
              },
            ],
          },
        },
      ];
      const [
        formRegister,
        { submit, validate, clearValidate, setFieldsValue, getFieldsValue, resetFields },
      ] = useForm({
        layout: 'vertical',
        baseColProps: {
          span: 24,
        },
        schemas: schemas,
        showActionButtonGroup: false,
        submitFunc: customSubmitFunc,
      });

      const [modalRegister, { openModal, closeModal }] = useModal();

      const currentItem = ref<TmpPaperElItem | null>(null);
      async function customSubmitFunc() {
        try {
          const values = await validate();
          values.title = translatePaperTemplate(values.caption);
          values.fontBold = values.fontBold === 'true';
          if (unref(isUpdateItem)) {
            currentItem.value && Object.assign(currentItem.value, values);
            updateItemKey(currentItem.value?._id);
            resetFields();
          } else {
            Object.assign(
              values,
              {
                _id: buildUUID(),
                _key: buildUUID(),
              },
              defaultTextItem,
            );
            elementList.value.push(values);
          }
          closeModal();
        } catch (error) {
          //
        }
      }

      const editItem = (item: TmpPaperElItem) => {
        currentItem.value = item;
        isUpdateItem.value = true;
        openModal(true);
        nextTick(() =>
          setFieldsValue({
            ...item,
            captionType: Object.keys(TmpPaperElTemplateEnum).includes(item.caption)
              ? item.caption
              : '${customMsg}',
            fontBold: item.fontBold ? 'true' : 'false',
          }),
        );
      };
      const removeItem = (id: string) => {
        const index = elementList.value.findIndex((item) => item._id === id);
        if (index === -1) return;
        elementList.value.splice(index, 1);
      };

      const addItemQr = () => {
        const item = Object.assign(
          {
            _id: buildUUID(),
            _key: buildUUID(),
          },
          defaultQrCodeItem,
        );
        elementList.value.push(item);
      };
      const addItemText = () => {
        isUpdateItem.value = false;
        openModal(true);
      };

      const btnLoading = ref(false);

      const submitTmpPaper = async () => {
        data.value.remarks = remarks.value;
        data.value.ticketFaceDataParse.ticketElementList = elementList.value;
        data.value.ticketFaceData = JSON.stringify(data.value.ticketFaceDataParse);
        data.value.bgImg = defaultTicketBgData;
        btnLoading.value = true;
        unref(isUpdate) ? await doUpdateTmpPaper() : await doSaveTmpPaper();
        btnLoading.value = false;
        handleSuccess();
      };
      const doSaveTmpPaper = async () => {
        data.value.id = await createTmpPaper(data.value);
        isUpdate.value = true;
      };
      const doUpdateTmpPaper = async () => {
        await updateTmpPaper(data.value);
      };

      const { t } = useI18n();
      function handleSuccess() {
        const { createSuccessModal } = useMessage();
        createSuccessModal({
          title: t('sys.api.operationSuccess'),
          content: unref(isUpdate)
            ? t('sys.api.updateSuccessMsg', ['票纸设计'])
            : t('sys.api.createSuccessMsg', ['票纸设计']),
          closable: false,
          okText: t('common.okText'),
        });
      }

      return {
        elementList,
        dropRef,
        collectedProps,
        getPaperSize,
        moveBox,
        qrWidthResizeHandler,
        updateItemKey,
        modalRegister,
        formRegister,
        submit,
        submitTmpPaper,
        editItem,
        addItemQr,
        addItemText,
        removeItem,
        remarks,
        btnLoading,
        defaultTicketBgData,
      };
    },
  });
</script>
<style scoped lang="less">
  .tmp-paper-form {
    background: @component-background;
  }

  .container {
    position: relative;
    width: 756px;
    height: 302px;
    border: 1px solid black;
    //background: url('../../../assets/images/tmp-paper/bg-ticket.jpg') no-repeat;
    background-repeat: no-repeat;
    background-size: cover;
    user-select: none;
  }
</style>
