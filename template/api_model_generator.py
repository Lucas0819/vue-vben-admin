import os

# 生成前端代码
model_template = '''import {{ BasicFetchResult, BasicPageParams }} from '/@/api/model/baseModel';

export type {entity}Params = {{
  {param_list}
}};

export type {entity}PageParams = BasicPageParams & {entity}Params;

export interface {entity}Item {{
  id: string;
  {field_list}
}}

export type {entity}ListGetResultModel = BasicFetchResult<{entity}Item>;
'''

needLower = ['String']
def getCurrentFiled(filed):
    if filed in needLower:
        return filed.lower()
    else:
        return filed

noAnnotation = ['String', 'Date', 'Integer', 'Float', 'BigDicmal'];
def getNeedAnnotation(filed):
    if filed in noAnnotation:
        return ''
    else:
        return '// '

def api_model_generator(path_name, entity_name, biz_name, entityProperties):

    params = [f'{getNeedAnnotation(field[0])}{field[1]}?: {getCurrentFiled(field[0])};' for field in entityProperties]
    param_list = '\n  '.join(params)
    field_list = '\n  '.join([f'{getNeedAnnotation(field[0])}{field[1]}: {getCurrentFiled(field[0])};' for field in entityProperties])

    model_code = model_template.format(entity=entity_name, param_list=param_list, field_list=field_list)

    api_model_file = f"src/api/{path_name}/model/{entity_name.lower()}Model.ts"

    api_model_dir = os.path.dirname(api_model_file)
    os.makedirs(api_model_dir, exist_ok=True)
    with open(api_model_file, "w") as f:
        f.write(model_code)
