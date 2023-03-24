import os

# 生成前端代码
model_template = '''<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增{biz} </a-button>
      </template>
      <template #bodyCell="{{ column, record }}">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {{
                icon: 'clarity:note-edit-line',
                onClick: handleEdit.bind(null, record),
              }},
              {{
                icon: 'ant-design:delete-outlined',
                color: 'error',
                popConfirm: {{
                  title: '是否确认删除',
                  placement: 'left',
                  confirm: handleDelete.bind(null, record),
                }},
              }},
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <{entity}Drawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import {{ defineComponent }} from 'vue';

  import {{ BasicTable, TableAction, useTable }} from '/@/components/Table';

  import {{ useDrawer }} from '/@/components/Drawer';

  import {{ columns, searchFormSchema }} from './{lowerEntity}.data';
  import {{ useMessage }} from '/@/hooks/web/useMessage';
  import {{ useI18n }} from '/@/hooks/web/useI18n';
  import {{ delete{entity}, get{entity}ListByPage }} from '/@/api/{path}/{lowerEntity}';
  import {entity}Drawer from './{entity}Drawer.vue';

  export default defineComponent({{
    name: '{entity}Management',
    components: {{ BasicTable, {entity}Drawer, TableAction }},
    setup() {{
      const {{ t }} = useI18n();

      const [registerDrawer, {{ openDrawer }}] = useDrawer();
      const [registerTable, {{ reload, setLoading: setTableLoading }}] = useTable({{
        title: '{biz}列表',
        api: get{entity}ListByPage,
        columns,
        formConfig: {{
          labelWidth: 120,
          schemas: searchFormSchema,
        }},
        useSearchForm: true,
        showTableSetting: true,
        bordered: true,
        showIndexColumn: false,
        actionColumn: {{
          width: 80,
          title: '操作',
          dataIndex: 'action',
          // slots: {{ customRender: 'action' }},
          fixed: undefined,
        }},
      }});

      function handleCreate() {{
        openDrawer(true, {{
          isUpdate: false,
        }});
      }}

      function handleEdit(record: Recordable) {{
        openDrawer(true, {{
          record,
          isUpdate: true,
        }});
      }}

      async function handleDelete(record: Recordable) {{
        try {{
          setTableLoading(true);
          await delete{entity}(record.id);
          handleSuccess();
        }} finally {{
          setTableLoading(false);
        }}
      }}

      function handleSuccess() {{
        const {{ createMessage }} = useMessage();
        createMessage.success(t('sys.api.operationSuccess'));
        reload();
      }}

      return {{
        registerTable,
        registerDrawer,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
      }};
    }},
  }});
</script>
'''

def vue_index_generator(path_name, entity_name, biz_name, entityProperties):
    params = [f'{field[1]}?: {field[0]};' for field in entityProperties]

    model_code = model_template.format(path=path_name, entity=entity_name, lowerEntity=entity_name.lower(), biz=biz_name)

    api_model_file = f"src/views/{path_name}/{entity_name.lower()}/index.vue"

    api_model_dir = os.path.dirname(api_model_file)
    os.makedirs(api_model_dir, exist_ok=True)
    with open(api_model_file, "w") as f:
        f.write(model_code)
