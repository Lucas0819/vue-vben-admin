<template>
  <div>
    <PageWrapper title="票纸设计列表" :contentStyle="{ margin: 0 }" />
    <BasicTable @register="registerTable">
      <template #tableTitle>
        <a-button type="primary" danger :disabled="canBatchDelete" class="mr-2">删除</a-button>
        <a-dropdown>
          <a-button type="primary" preIcon="ant-design:plus-outlined">
            创建票纸设计
            <DownOutlined />
          </a-button>
          <template #overlay>
            <a-menu>
              <a-menu-item>
                <a href="javascript:;" @click="handleCreate('tsc')">TSC系列打印机 </a>
              </a-menu-item>
              <a-menu-item>
                <a href="javascript:;" @click="handleCreate('boca')">BOCA系列打印机</a>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'remarks'">
          <Link @click="() => handleEdit(record)">{{ record.remarks || '暂未填写' }}</Link>
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
  import { Dropdown, Menu, Typography } from 'ant-design-vue';
  import { PageWrapper } from '/@/components/Page';
  import { PageEnum } from '/@/enums/pageEnum';
  import { DownOutlined } from '@ant-design/icons-vue';
  import { useGo } from '@/hooks/web/usePage';

  export default defineComponent({
    name: 'TmpPaperManagement',
    components: {
      BasicTable,
      TableAction,
      Link: Typography.Link,
      PageWrapper,
      ADropdown: Dropdown,
      AMenu: Menu,
      AMenuItem: Menu.Item,
      DownOutlined,
    },
    setup() {
      const { t } = useI18n();

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

      const go = useGo();

      function handleCreate(type: string) {
        go({
          path: PageEnum.TMP_TMP_PAPER_FORM,
          query: { type, remarks: `测试:${type}${new Date().getTime()}` },
        });
      }

      function handleEdit(record: Recordable) {
        go({
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
