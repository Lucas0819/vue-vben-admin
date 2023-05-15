<template>
  <div>
    <PageWrapper title="活动地址-有座列表" :contentStyle="{ margin: 0 }" />
    <BasicTable @register="registerTable">
      <template #tableTitle>
        <a-button
          type="primary"
          danger
          :disabled="canBatchDelete"
          class="mr-2"
          @click="batchDelete"
          preIcon="ant-design:delete-outlined"
          >删除</a-button
        >
        <a-button type="primary" @click="handleCreate" preIcon="ant-design:plus-outlined">
          创建活动地址-有座
        </a-button>
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
  import { computed, defineComponent } from 'vue';

  import { BasicTable, TableAction, useTable } from '/@/components/Table';

  import { columns, searchFormSchema } from './tmpPlace.data';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { batchDeleteTmpPlace, deleteTmpPlace, getTmpPlaceListByPage } from '/@/api/tmp/tmpPlace';
  import { useRouter } from 'vue-router';
  import { Typography } from 'ant-design-vue';
  import { PageWrapper } from '/@/components/Page';
  import { PageEnum } from '/@/enums/pageEnum';

  export default defineComponent({
    name: 'TmpPlaceManagement',
    components: { BasicTable, TableAction, Link: Typography.Link, PageWrapper },
    setup() {
      const { t } = useI18n();
      const router = useRouter();

      const [registerTable, { reload, setLoading: setTableLoading, getSelectRowKeys }] = useTable({
        api: getTmpPlaceListByPage,
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
        // actionColumn: {
        //   width: 80,
        //   title: '操作',
        //   dataIndex: 'action',
        //   // slots: { customRender: 'action' },
        //   fixed: undefined,
        // },
        rowSelection: {
          type: 'checkbox',
        },
        beforeFetch(info) {
          if (info.areaId) {
            info.areaId = info.areaId.join(',');
          }
        },
      });

      const canBatchDelete = computed(() => {
        return !(getSelectRowKeys() && getSelectRowKeys().length > 0);
      });

      function handleCreate() {
        router.push(PageEnum.TMP_TMP_PLACE_FORM);
      }

      function handleEdit(record: Recordable) {
        router.push({
          path: PageEnum.TMP_TMP_PLACE_FORM,
          query: { id: record.id },
        });
      }

      async function handleDelete(record: Recordable) {
        try {
          setTableLoading(true);
          await deleteTmpPlace(record.id);
          handleSuccess();
        } finally {
          setTableLoading(false);
        }
      }

      function batchDelete() {
        const { createConfirm } = useMessage();
        createConfirm({
          iconType: 'warning',
          title: '操作确认',
          content: '确定进行批量删除操作吗？',
          okText: '删除',
          onOk: async () => {
            try {
              setTableLoading(true);
              const ids = getSelectRowKeys();
              await batchDeleteTmpPlace(ids);
              handleSuccess();
            } finally {
              setTableLoading(false);
            }
          },
        });
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
        batchDelete,
      };
    },
  });
</script>
