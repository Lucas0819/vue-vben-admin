import os

# 生成前端代码
model_template = '''import {{ BasicColumn, FormSchema }} from '/@/components/Table';
import {{ h }} from 'vue';

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
    params = [f'{field[1]}?: {field[0]};' for field in entityProperties]
    param_list = '\n  '.join(params)
    field_list = '\n  '.join([f'{{title: \'{field[2]}\', dataIndex: \'{field[1]}\', width: 120, }},' for field in entityProperties])
    search_form_field_list = '\n  '.join([f'{{field: \'{field[1]}\',label: \'{field[2]}\',component: \'Input\',colProps: {{ span: 8 }},}},' for field in entityProperties])
    form_field_list = '\n  '.join([f'{{field: \'{field[1]}\',label: \'{field[2]}\',required: true,component: \'Input\',}},' for field in entityProperties])

    model_code = model_template.format(entity=entity_name, lowerEntity=entity_name.lower(), param_list=param_list, field_list=field_list, search_form_field_list=search_form_field_list, form_field_list=form_field_list)

    api_model_file = f"src/views/{path_name}/{entity_name.lower()}.data.ts"

    api_model_dir = os.path.dirname(api_model_file)
    os.makedirs(api_model_dir, exist_ok=True)
    with open(api_model_file, "w") as f:
        f.write(model_code)
