import os

# 生成前端代码
from util import to_lower_camel_case, to_dash_case, camel_to_snake

model_template = '''<template>
  <div>
    <PageWrapper title="{biz}列表" :contentStyle="{{ margin: 0 }}" />
    <BasicTable @register="registerTable">
      <template #tableTitle>
        <a-button type="primary" @click="handleCreate"> 创建{biz} </a-button>
      </template>
      <template #bodyCell="{{ column, record }}">
        <template v-if="column.key === 'name'">
          <Link @click="() => handleEdit(record)">{{{{ record.name }}}}</Link>
        </template>
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {{
                label: '删除',
                color: 'error',
                popConfirm: {{
                  title: '是否确认删除该项吗？',
                  placement: 'left',
                  confirm: handleDelete.bind(null, record),
                }},
              }},
            ]"
          />
        </template>
      </template>
    </BasicTable>
  </div>
</template>
<script lang="ts">
  import {{ defineComponent }} from 'vue';

  import {{ BasicTable, TableAction, useTable }} from '/@/components/Table';

  import {{ columns, searchFormSchema }} from './{lowerCamelEntity}.data';
  import {{ useMessage }} from '/@/hooks/web/useMessage';
  import {{ useI18n }} from '/@/hooks/web/useI18n';
  import {{ delete{entity}, get{entity}ListByPage }} from '/@/api/{path}/{lowerCamelEntity}';
  import {{ useRouter }} from 'vue-router';
  import {{ Typography }} from 'ant-design-vue';
  import {{ PageWrapper }} from '/@/components/Page';
  import {{ PageEnum }} from '/@/enums/pageEnum';

  export default defineComponent({{
    name: '{entity}Management',
    components: {{ BasicTable, TableAction, Link: Typography.Link, PageWrapper }},
    setup() {{
      const {{ t }} = useI18n();
      const router = useRouter();

      const [registerTable, {{ reload, setLoading: setTableLoading }}] = useTable({{
        api: get{entity}ListByPage,
        columns,
        formConfig: {{
          schemas: searchFormSchema,
          baseColProps: {{
            span: 6,
            style: {{ paddingLeft: '5px', paddingRight: '25px' }},
          }},
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
        router.push(PageEnum.{form_path});
      }}

      function handleEdit(record: Recordable) {{
        router.push({{
          path: PageEnum.{form_path},
          query: {{ id: record.id }},
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
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
      }};
    }},
  }});
</script>
'''

def vue_index_generator(path_name, entity_name, biz_name, entity_properties):
    form_path = f'{camel_to_snake(path_name)}_{camel_to_snake(entity_name)}_FORM'
    model_code = model_template.format(path=to_dash_case(path_name), entity=entity_name, lowerCamelEntity=to_lower_camel_case(entity_name), biz=biz_name, form_path=form_path)

    api_model_file = f"src/views/{to_dash_case(path_name)}/{to_dash_case(entity_name)}/index.vue"

    api_model_dir = os.path.dirname(api_model_file)
    os.makedirs(api_model_dir, exist_ok=True)
    with open(api_model_file, "w") as f:
        f.write(model_code)
