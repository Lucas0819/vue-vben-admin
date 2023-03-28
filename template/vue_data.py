import os

# 生成前端代码
from util import to_lower_camel_case, to_dash_case

model_template = '''import {{ BasicColumn, FormSchema }} from '/@/components/Table';

export const columns: BasicColumn[] = [
  {field_list}
];

export const searchFormSchema: FormSchema[] = [
  {search_form_field_list}
];

export const formSchema: FormSchema[] = [
  {form_field_list}
];
'''


def vue_data_generator(path_name, entity_name, biz_name, entity_properties):
    # 其他默认字段不参与展示和编辑
    disable_filed_list = ['remarks', 'createBy', 'createDate', 'updateDate']
    entity_properties = list(filter(lambda x: not x[1] in disable_filed_list, entity_properties))

    # ID列在表格内默认不展示
    def default_hidden(field):
        return '    defaultHidden: true,\n' if field[1] == 'id' else ''

    field_list = '\n  '.join([f'{{\n    title: \'{field[2]}\',\n    dataIndex: \'{field[1]}\',\n    width: 120,\n{default_hidden(field)}  }},' for field in entity_properties])

    # 查询&表单去除ID列
    entity_properties = list(filter(lambda x: x[1] != 'id', entity_properties))
    search_form_field_list = '\n  '.join([f'{{\n    field: \'{field[1]}\',\n    label: \'{field[2]}\',\n    component: \'Input\',\n    colProps: {{ span: 8 }},\n  }},' for field in entity_properties])
    form_field_list = '\n  '.join([f'{{\n    field: \'{field[1]}\',\n    label: \'{field[2]}\',\n    required: true,\n    component: \'Input\',\n  }},' for field in entity_properties])

    model_code = model_template.format(entity=entity_name, lowerCamelEntity=to_lower_camel_case(entity_name), field_list=field_list, search_form_field_list=search_form_field_list, form_field_list=form_field_list)

    api_model_file = f"src/views/{to_dash_case(path_name)}/{to_dash_case(entity_name)}/{to_lower_camel_case(entity_name)}.data.ts"

    api_model_dir = os.path.dirname(api_model_file)
    os.makedirs(api_model_dir, exist_ok=True)
    with open(api_model_file, "w") as f:
        f.write(model_code)
