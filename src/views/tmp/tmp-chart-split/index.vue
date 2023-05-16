<template>
  <BasicTable @register="registerTable" style="padding: 3px" class="mt-4">
    <template #tableTitle>
      <a-button type="primary" danger :disabled="canBatchDelete" class="mr-2">删除</a-button>
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
</template>
<script lang="ts">
  import { computed, defineComponent } from 'vue';

  import { BasicTable, TableAction, useTable } from '/@/components/Table';

  import { columns } from './tmpChartSplit.data';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { deleteTmpChartSplit, getTmpChartSplitListByPage } from '/@/api/tmp/tmpChartSplit';
  import { Typography } from 'ant-design-vue';
  import { PageEnum } from '/@/enums/pageEnum';
  import { useGo } from '@/hooks/web/usePage';

  export default defineComponent({
    name: 'TmpChartSplitManagement',
    components: {
      BasicTable,
      TableAction,
      Link: Typography.Link,
    },
    props: {
      defaultName: String,
    },
    setup(props) {
      const { t } = useI18n();
      const go = useGo();

      const [registerTable, { reload, setLoading: setTableLoading, getSelectRowKeys }] = useTable({
        api: getTmpChartSplitListByPage,
        columns,
        useSearchForm: false,
        showTableSetting: false,
        bordered: true,
        showIndexColumn: false,
        // actionColumn: {
        //   width: 80,
        //   title: '操作',
        //   dataIndex: 'action',
        //   // slots: { customRender: 'action' },
        //   fixed: undefined,
        // },
        canResize: false,
        pagination: false,
        rowSelection: {
          type: 'checkbox',
        },
      });

      const canBatchDelete = computed(() => {
        return !(getSelectRowKeys() && getSelectRowKeys().length > 0);
      });

      function handleCreate() {
        go({
          path: PageEnum.TMP_TMP_CHART_SPLIT_SEAT,
          query: { name: props.defaultName },
        });
      }

      function handleEdit(record: Recordable) {
        go({
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
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
        canBatchDelete,
      };
    },
  });
</script>
