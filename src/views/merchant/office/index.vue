<template>
  <div class="office-list-page">
    <PageWrapper title="主办单位列表" :contentStyle="{ margin: 0 }" />
    <BasicTable @register="registerTable">
      <template #tableTitle>
        <a-button type="primary" @click="handleCreate"> 创建商户 </a-button>
      </template>
      <template #bodyCell="{ column, record, text }">
        <template v-if="column.key === 'zipCode'">
          <img :src="text" class="zip-code" @click="() => handlePreviewCode(text)" />
        </template>
        <template v-if="column.key === 'settlementRatio'">
          <Link @click="() => openTargetModal(record)">{{ ((1 - text) * 100).toFixed(1) }}%</Link>
        </template>
        <template v-if="column.key === 'name'">
          <Link @click="() => handleEdit(record)">{{ record.name }}</Link>
        </template>
        <template v-if="column.key === 'settleAccountStatus'">
          <Tag color="#87d068">{{ translateDictData('log_type', text) }}</Tag>
        </template>
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                label: '删除',
                color: 'error',
                popConfirm: {
                  title: '是否确认删除该项吗？',
                  placement: 'left',
                  confirm: handleDelete.bind(null, record),
                },
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <BasicModal
      v-bind="$attrs"
      destroyOnClose
      @register="registerModal"
      title="信息"
      @visible-change="handleShow"
      @ok="handleOk"
      :minHeight="50"
      :centered="true"
    >
      <p>您确定要设置结算比例吗？请务必谨慎操作！</p>
      <RadioButtonGroup
        :value="settlementRatioValue"
        :options="settlementRatioOption"
        @change="changeRadioValue"
      />
    </BasicModal>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, unref } from 'vue';

  import { BasicTable, TableAction, useTable } from '/@/components/Table';

  import { columns, searchFormSchema } from './office.data';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { deleteOffice, getOfficeListByPage } from '/@/api/merchant/office';
  import { Tag, Typography } from 'ant-design-vue';
  import { PageWrapper } from '/@/components/Page';
  import { translateDictData } from '/@/utils/dict';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { RadioButtonGroup } from '/@/components/Form';
  import { OfficeItem } from '/@/api/merchant/model/officeModel';
  import { PageEnum } from '/@/enums/pageEnum';
  import { useRouter } from 'vue-router';

  export default defineComponent({
    name: 'OfficeManagement',
    components: {
      BasicTable,
      TableAction,
      Link: Typography.Link,
      PageWrapper,
      Tag,
      BasicModal,
      RadioButtonGroup,
    },
    setup() {
      const { t } = useI18n();
      const router = useRouter();
      const dataSource = ref<OfficeItem[]>([]);
      const [registerTable, { reload, setLoading: setTableLoading, setTableData }] = useTable({
        api: getOfficeListByPage,
        columns,
        beforeFetch(info) {
          if (info.settlementRatio === 'all') {
            info.settlementRatio = undefined;
          }
          return info;
        },
        afterFetch(record) {
          dataSource.value = record;
        },
        formConfig: {
          schemas: searchFormSchema,
          baseColProps: {
            span: 6,
            style: { paddingLeft: '5px', paddingRight: '25px' },
          },
        },
        useSearchForm: true,
        showTableSetting: true,
        bordered: true,
        showIndexColumn: false,
        actionColumn: {
          width: 80,
          title: '操作',
          dataIndex: 'action',
          // slots: { customRender: 'action' },
          fixed: undefined,
        },
      });

      function handleCreate() {
        router.push(PageEnum.MERCHANT_OFFICE_FORM);
      }

      function handleEdit(record: Recordable) {
        router.push({
          path: PageEnum.MERCHANT_OFFICE_FORM,
          query: { id: record.id },
        });
      }

      async function handleDelete(record: Recordable) {
        try {
          setTableLoading(true);
          await deleteOffice(record.id);
          handleSuccess();
        } finally {
          setTableLoading(false);
        }
      }

      function handleSuccess() {
        const { createMessage } = useMessage();
        createMessage.success(t('sys.api.operationSuccess'));
        reload();
      }

      function handlePreviewCode(src: string) {
        window.open(src);
      }

      const [registerModal, { setModalProps }] = useModalInner();

      const settlementRatioValue = ref('');
      const currentRecordId = ref('');
      const settlementRatioOption = [
        { label: '0.6%', value: '0.6' },
        { label: '0.7%', value: '0.7' },
        { label: '1%', value: '1' },
        { label: '2.6%', value: '2.6' },
        { label: '2.7%', value: '2.7' },
      ];
      function openTargetModal(record: { settlementRatio: string; id: string }) {
        currentRecordId.value = record.id;
        let settlementRatio: number = parseFloat(record.settlementRatio);
        settlementRatioValue.value = ((1 - settlementRatio) * 100).toFixed(1);
        setModalProps({ visible: true });
      }

      function handleShow(visible: boolean) {
        if (visible) {
          /* empty */
        }
      }

      function handleOk() {
        let recordIndex: number = unref(dataSource).findIndex(
          (item) => item.id === unref(currentRecordId),
        );
        let value: number = parseFloat(unref(settlementRatioValue));
        unref(dataSource)[recordIndex].settlementRatio = (1 - value / 100).toFixed(3);
        setModalProps({ visible: false });
        setTableData(unref(dataSource));
        // reload();
      }
      function changeRadioValue(value: string) {
        settlementRatioValue.value = value;
      }

      return {
        translateDictData,
        registerTable,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
        handlePreviewCode,
        registerModal,
        handleShow,
        openTargetModal,
        settlementRatioValue,
        settlementRatioOption,
        handleOk,
        changeRadioValue,
      };
    },
  });
</script>
<style lang="less">
  .office-list-page {
    .zip-code {
      width: 25px;
      height: auto;
    }
  }
</style>
