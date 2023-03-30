<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 创建主办账户 </a-button>
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
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  import { BasicTable, TableAction, useTable } from '/@/components/Table';

  import { columns, searchFormSchema } from './user.data';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { deleteUser, getUserListByPage } from '/@/api/merchant/user';
  import { useRouter } from 'vue-router';
  import { Typography } from 'ant-design-vue';
  import { PageEnum } from '/@/enums/pageEnum';

  export default defineComponent({
    name: 'UserManagement',
    components: { BasicTable, TableAction, Link: Typography.Link },
    setup() {
      const { t } = useI18n();
      const router = useRouter();

      const [registerTable, { reload, setLoading: setTableLoading }] = useTable({
        title: '主办账户列表',
        api: getUserListByPage,
        columns,
        formConfig: {
          schemas: searchFormSchema,
          baseColProps: {
            span: 6,
            style: { padding: '0 15px' },
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
        router.push(PageEnum.MERCHANT_USER_FORM);
      }

      function handleEdit(record: Recordable) {
        router.push({
          path: PageEnum.MERCHANT_USER_FORM,
          query: { id: record.id },
        });
      }

      async function handleDelete(record: Recordable) {
        try {
          setTableLoading(true);
          await deleteUser(record.id);
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
