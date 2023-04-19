<template>
  <div>
    <PageWrapper title="活动列表" :contentStyle="{ margin: 0 }" />
    <BasicTable @register="registerTable">
      <template #tableTitle>
        <a-button type="primary" @click="handleCreate"> 创建活动 </a-button>
      </template>
      <template #bodyCell="{ text, column, record }">
        <template v-if="column.key === 'name'">
          <Link @click="() => handleEdit(record)">{{ record.name }}</Link>
        </template>
        <template v-if="column.key === 'status'">
          <Tag color="#87d068">{{ text }}</Tag>
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
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  import { BasicTable, TableAction, useTable } from '/@/components/Table';

  import { columns, searchFormSchema } from './bisActivity.data';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { deleteBisActivity, getBisActivityListByPage } from '/@/api/bis/bisActivity';
  import { useRouter } from 'vue-router';
  import { Tag, Typography } from 'ant-design-vue';
  import { PageWrapper } from '/@/components/Page';
  import { PageEnum } from '/@/enums/pageEnum';

  export default defineComponent({
    name: 'BisActivityManagement',
    components: { BasicTable, TableAction, Link: Typography.Link, PageWrapper, Tag },
    setup() {
      const { t } = useI18n();
      const router = useRouter();

      const [registerTable, { reload, setLoading: setTableLoading }] = useTable({
        api: getBisActivityListByPage,
        columns,
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
        router.push(PageEnum.BIS_BIS_ACTIVITY_FORM);
      }

      function handleEdit(record: Recordable) {
        router.push({
          path: PageEnum.BIS_BIS_ACTIVITY_FORM,
          query: { id: record.id },
        });
      }

      async function handleDelete(record: Recordable) {
        try {
          setTableLoading(true);
          await deleteBisActivity(record.id);
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
      };
    },
  });
</script>
