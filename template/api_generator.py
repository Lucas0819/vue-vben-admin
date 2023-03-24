import os

# 生成前端代码
model_template = '''import {{ defHttp }} from '/@/utils/http/axios';
import {{
  {entity}Item,
  {entity}ListGetResultModel,
  {entity}PageParams,
  {entity}Params,
}} from './model/{entity}Model';

enum Api {{
  {entity}Page = '/{lowerEntity}/get{entity}Page',
  GetAll{entity}List = '/{lowerEntity}/getAll{entity}List',
  Create{entity} = '/{lowerEntity}/create{entity}',
  Update{entity} = '/{lowerEntity}/update{entity}',
  Delete{entity} = '/{lowerEntity}/delete{entity}/{{{lowerEntity}Id}}',
}}

export const get{entity}ListByPage = (params: {entity}PageParams) =>
  defHttp.get<{entity}ListGetResultModel>({{ url: Api.{entity}Page, params }});

export const getAll{entity}List = (params?: {entity}Params) =>
  defHttp.get<{entity}ListGetResultModel>({{ url: Api.GetAll{entity}List, params }});

export const create{entity} = (params?: {entity}Item) =>
  defHttp.post({{ url: Api.Create{entity}, params }});

export const update{entity} = (params?: {entity}Item) => defHttp.put({{ url: Api.Update{entity}, params }});

export const delete{entity} = ({lowerEntity}Id: string) =>
  defHttp.delete({{ url: Api.Delete{entity}.replace('{{{lowerEntity}Id}}', {lowerEntity}Id) }});
'''

def api_generator(path_name, entity_name, biz_name, entityProperties):
    params = [f'{field[1]}?: {field[0]};' for field in entityProperties]
    param_list = '\n  '.join(params)
    field_list = '\n  '.join([f'{field[1]}: {field[0]};' for field in entityProperties])

    model_code = model_template.format(entity=entity_name, lowerEntity=entity_name.lower(), param_list=param_list, field_list=field_list)

    api_model_file = f"src/api/{path_name}/{entity_name}.ts"

    api_model_dir = os.path.dirname(api_model_file)
    os.makedirs(api_model_dir, exist_ok=True)
    with open(api_model_file, "w") as f:
        f.write(model_code)
