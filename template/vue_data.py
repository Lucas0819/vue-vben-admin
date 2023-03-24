import os

# 生成前端代码
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

def vue_data_generator(path_name, entity_name, biz_name, entityProperties):
    field_list = '\n  '.join([f'{{\n    title: \'{field[2]}\',\n    dataIndex: \'{field[1]}\',\n    width: 120,\n  }},' for field in entityProperties])
    search_form_field_list = '\n  '.join([f'{{\n    field: \'{field[1]}\',\n    label: \'{field[2]}\',\n    component: \'Input\',\n    colProps: {{ span: 8 }},\n  }},' for field in entityProperties])
    form_field_list = '\n  '.join([f'{{\n    field: \'{field[1]}\',\n    label: \'{field[2]}\',\n    required: true,\n    component: \'Input\',\n  }},' for field in entityProperties])

    model_code = model_template.format(entity=entity_name, lowerEntity=entity_name.lower(), field_list=field_list, search_form_field_list=search_form_field_list, form_field_list=form_field_list)

    api_model_file = f"src/views/{path_name}/{entity_name.lower()}/{entity_name.lower()}.data.ts"

    api_model_dir = os.path.dirname(api_model_file)
    os.makedirs(api_model_dir, exist_ok=True)
    with open(api_model_file, "w") as f:
        f.write(model_code)
