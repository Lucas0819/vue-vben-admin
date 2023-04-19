import os

# 生成前端代码
from util import to_lower_camel_case, to_dash_case

model_template = '''import {{ BasicColumn, FormSchema }} from '/@/components/Table';
import {{ useI18n }} from '/@/hooks/web/useI18n';

const {{ t }} = useI18n();

const placeholderText = t('common.fuzzySearchText');

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
    hidden_filed_list = ['id', 'remarks', 'createBy', 'createDate', 'updateDate']

    # 几个基础列在表格内默认不展示
    def default_hidden(field):
        return '    defaultHidden: true,\n' if field[1] in hidden_filed_list else ''

    field_list = '\n  '.join([f'{{'
                              f'\n    title: \'{field[2]}\','
                              f'\n    dataIndex: \'{field[1]}\','
                              f'\n    width: 120,'
                              f'\n{default_hidden(field)}'
                              f'  }},' for field in entity_properties])

    # 查询&表单去除基础列
    entity_properties = list(filter(lambda x: not x[1] in hidden_filed_list, entity_properties))

    search_form_field_list = '\n  '.join([f'{{'
                                          f'\n    field: \'{field[1]}\','
                                          f'\n    label: \'{field[2]}\','
                                          f'\n    component: \'Input\','
                                          f'\n    componentProps: {{ placeholder: placeholderText }},'
                                          f'\n  }},' for field in entity_properties])
    form_field_list = '\n  '.join([f'{{'
                                   f'\n    field: \'{field[1]}\','
                                   f'\n    label: \'{field[2]}\','
                                   f'\n    required: false,'
                                   f'\n    component: \'Input\','
                                   f'\n  }},' for field in entity_properties])

    model_code = model_template.format(entity=entity_name, lowerCamelEntity=to_lower_camel_case(entity_name), field_list=field_list, search_form_field_list=search_form_field_list, form_field_list=form_field_list)

    api_model_file = f"src/views/{to_dash_case(path_name)}/{to_dash_case(entity_name)}/{to_lower_camel_case(entity_name)}.data.ts"

    api_model_dir = os.path.dirname(api_model_file)
    os.makedirs(api_model_dir, exist_ok=True)
    with open(api_model_file, "w") as f:
        f.write(model_code)
