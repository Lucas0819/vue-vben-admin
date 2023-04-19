import os

# 生成前端代码
from util import to_dash_case, to_lower_camel_case

model_template = '''import {{ BasicFetchResult, BasicPageParams }} from '/@/api/model/baseModel';

export type {entity}Params = {{
  {param_list}
}};

export type {entity}PageParams = BasicPageParams & {entity}Params;

export interface {entity}Item {{
  {field_list}
}}

export type {entity}ListGetResultModel = BasicFetchResult<{entity}Item>;
'''

needLower = ['String']
mathFiled = ['Integer', 'Float', 'BigDecimal']
def getCurrentFiled(filed):
    if filed in needLower:
        return filed.lower()
    if filed in mathFiled:
      return 'number'
    else:
        return filed

noAnnotation = ['String', 'Date', 'Integer', 'Float', 'BigDecimal'];
def getNeedAnnotation(filed):
    if filed in noAnnotation:
        return ''
    else:
        return '// '

def api_model_generator(path_name, entity_name, biz_name, entity_properties):

    params = [f'{getNeedAnnotation(field[0])}{field[1]}?: {getCurrentFiled(field[0])};' for field in entity_properties]
    param_list = '\n  '.join(params)
    field_list = '\n  '.join([f'{getNeedAnnotation(field[0])}{field[1]}: {getCurrentFiled(field[0])};' for field in entity_properties])

    model_code = model_template.format(entity=entity_name, param_list=param_list, field_list=field_list)

    api_model_file = f"src/api/{to_dash_case(path_name)}/model/{to_lower_camel_case(entity_name)}Model.ts"

    api_model_dir = os.path.dirname(api_model_file)
    os.makedirs(api_model_dir, exist_ok=True)
    with open(api_model_file, "w") as f:
        f.write(model_code)
