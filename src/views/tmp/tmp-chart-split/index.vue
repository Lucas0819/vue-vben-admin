<template>
  <div>
    <PageWrapper title="票图结构模板列表" :contentStyle="{ margin: 0 }" />
    <BasicTable @register="registerTable">
      <template #tableTitle>
        <a-button type="primary" @click="handleCreate"> 创建票图结构模板 </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'name'">
          <Link @click="() => handleEdit(record)">{{ record.name }}</Link>
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
    <TmpChartSplitDrawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  import { BasicTable, TableAction, useTable } from '/@/components/Table';

  import { columns, searchFormSchema } from './tmpChartSplit.data';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { deleteTmpChartSplit, getTmpChartSplitListByPage } from '/@/api/tmp/tmpChartSplit';
  import { useRouter } from 'vue-router';
  import { Typography } from 'ant-design-vue';
  import { PageWrapper } from '/@/components/Page';
  import { PageEnum } from '/@/enums/pageEnum';
  import TmpChartSplitDrawer from '/@/views/tmp/tmp-chart-split/TmpChartSplitDrawer.vue';
  import { useDrawer } from '/@/components/Drawer';

  export default defineComponent({
    name: 'TmpChartSplitManagement',
    components: {
      TmpChartSplitDrawer,
      BasicTable,
      TableAction,
      Link: Typography.Link,
      PageWrapper,
    },
    setup() {
      const { t } = useI18n();
      const router = useRouter();

      const [registerTable, { reload, setLoading: setTableLoading }] = useTable({
        api: getTmpChartSplitListByPage,
        columns,
        formConfig: {
          schemas: searchFormSchema,
          baseColProps: {
            span: 6,
            style: { paddingLeft: '5px', paddingRight: '25px' },
          },
        },
        useSearchForm: false,
        showTableSetting: false,
        bordered: true,
        showIndexColumn: false,
        actionColumn: {
          width: 80,
          title: '操作',
          dataIndex: 'action',
          // slots: { customRender: 'action' },
          fixed: undefined,
        },
        canResize: false,
        pagination: false,
      });

      const [registerDrawer, { openDrawer }] = useDrawer();

      function handleCreate() {
        openDrawer(true);
        // router.push(PageEnum.TMP_TMP_CHART_SPLIT_FORM);
      }

      function handleEdit(record: Recordable) {
        router.push({
          path: PageEnum.TMP_TMP_CHART_SPLIT_SEAT,
          query: { id: record.id },
        });
      }

      async function handleDelete(record: Recordable) {
        try {
          setTableLoading(true);
          await deleteTmpChartSplit(record.id);
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

      return {
        registerTable,
        registerDrawer,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
      };
    },
  });
</script>
