<template>
  <div>
    <PageWrapper title="票纸设计列表" :contentStyle="{ margin: 0 }" />
    <BasicTable @register="registerTable">
      <template #tableTitle>
        <a-button type="primary" danger :disabled="canBatchDelete" class="mr-2">删除</a-button>
        <a-button type="primary" @click="handleCreate"> 创建票纸设计 </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'ticketFaceData'">
          <Link @click="() => handleEdit(record)">{{ record.ticketFaceData }}</Link>
        </template>
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                label: '复制到活动',
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
  </div>
</template>
<script lang="ts">
  import { computed, defineComponent } from 'vue';

  import { BasicTable, TableAction, useTable } from '/@/components/Table';

  import { columns, searchFormSchema } from './tmpPaper.data';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { deleteTmpPaper, getTmpPaperListByPage } from '/@/api/tmp/tmpPaper';
  import { useRouter } from 'vue-router';
  import { Typography } from 'ant-design-vue';
  import { PageWrapper } from '/@/components/Page';
  import { PageEnum } from '/@/enums/pageEnum';

  export default defineComponent({
    name: 'TmpPaperManagement',
    components: { BasicTable, TableAction, Link: Typography.Link, PageWrapper },
    setup() {
      const { t } = useI18n();
      const router = useRouter();

      const [registerTable, { reload, setLoading: setTableLoading, getSelectRowKeys }] = useTable({
        api: getTmpPaperListByPage,
        columns,
        defSort: {
          field: 'createDate',
          order: 'descend',
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
          width: 100,
          title: '操作',
          dataIndex: 'action',
          // slots: { customRender: 'action' },
          fixed: undefined,
        },
        rowSelection: {
          type: 'checkbox',
        },
      });

      const canBatchDelete = computed(() => {
        return !(getSelectRowKeys() && getSelectRowKeys().length > 0);
      });

      function handleCreate() {
        router.push(PageEnum.TMP_TMP_PAPER_FORM);
      }

      function handleEdit(record: Recordable) {
        router.push({
          path: PageEnum.TMP_TMP_PAPER_FORM,
          query: { id: record.id },
        });
      }

      async function handleDelete(record: Recordable) {
        try {
          setTableLoading(true);
          await deleteTmpPaper(record.id);
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
