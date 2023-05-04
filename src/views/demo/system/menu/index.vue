<template>
  <div>
    <PageWrapper title="菜单管理" :contentStyle="{ margin: 0 }" />
    <BasicTable @register="registerTable" @fetch-success="onFetchSuccess">
      <template #tableTitle>
        <a-button type="primary" @click="handleCreate"> 创建菜单 </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'clarity:note-edit-line',
                onClick: handleEdit.bind(null, record),
              },
              {
                icon: 'ant-design:delete-outlined',
                color: 'error',
                popConfirm: {
                  title: '是否确认删除',
                  placement: 'left',
                  confirm: handleDelete.bind(null, record),
                },
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <MenuDrawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  import { BasicTable, TableAction, useTable } from '/@/components/Table';
  import { getMenuList } from '/@/api/demo/system';

  import { useDrawer } from '/@/components/Drawer';
  import MenuDrawer from './MenuDrawer.vue';

  import { columns, searchFormSchema } from './menu.data';
  import { PageWrapper } from '/@/components/Page';

  export default defineComponent({
    name: 'MenuManagement',
    components: { BasicTable, MenuDrawer, TableAction, PageWrapper },
    setup() {
      const [registerDrawer, { openDrawer }] = useDrawer();
      const [registerTable, { reload }] = useTable({
        title: '菜单列表',
        api: getMenuList,
        columns,
        formConfig: {
          baseColProps: {
            span: 6,
            style: { paddingLeft: '5px', paddingRight: '25px' },
          },
          schemas: searchFormSchema,
        },
        isTreeTable: true,
        pagination: false,
        striped: false,
        useSearchForm: true,
        showTableSetting: true,
        bordered: true,
        showIndexColumn: false,
        // canResize: false,
        actionColumn: {
          width: 80,
          title: '操作',
          dataIndex: 'action',
          // slots: { customRender: 'action' },
          fixed: undefined,
        },
      });

      function handleCreate() {
        openDrawer(true, {
          isUpdate: false,
        });
      }

      function handleEdit(record: Recordable) {
        openDrawer(true, {
          record,
          isUpdate: true,
        });
      }

      function handleDelete(record: Recordable) {
        console.log(record);
      }

      function handleSuccess() {
        reload();
      }

      function onFetchSuccess() {
        // 演示默认展开所有表项
        // nextTick(expandAll);
      }

      return {
        registerTable,
        registerDrawer,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
        onFetchSuccess,
      };
    },
  });
</script>
