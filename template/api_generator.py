import os

# 生成前端代码
from util import to_lower_camel_case, to_dash_case

model_template = '''import {{ defHttp }} from '/@/utils/http/axios';
import {{ {entity}Item, {entity}ListGetResultModel, {entity}PageParams, {entity}Params }} from './model/{lowerCamelEntity}Model';

enum Api {{
  {entity}Page = '/{lowerCamelEntity}/get{entity}Page',
  GetAll{entity}List = '/{lowerCamelEntity}/getAll{entity}List',
  FindOne = '/{lowerCamelEntity}/findOne/{{id}}',
  Create{entity} = '/{lowerCamelEntity}/create{entity}',
  Update{entity} = '/{lowerCamelEntity}/update{entity}',
  Delete{entity} = '/{lowerCamelEntity}/delete{entity}/{{id}}',
}}

export const get{entity}ListByPage = (params: {entity}PageParams) =>
  defHttp.get<{entity}ListGetResultModel>({{ url: Api.{entity}Page, params }});

export const getAll{entity}List = (params?: {entity}Params) =>
  defHttp.get<{entity}Item[]>({{ url: Api.GetAll{entity}List, params }});

export const findOne = (id) => defHttp.get<{entity}Item>({{ url: Api.FindOne.replace('{{id}}', id) }});

export const create{entity} = (params?: {entity}Item) => defHttp.post({{ url: Api.Create{entity}, params }});

export const update{entity} = (params?: {entity}Item) => defHttp.put({{ url: Api.Update{entity}, params }});

export const delete{entity} = (id: string) =>
  defHttp.delete({{ url: Api.Delete{entity}.replace('{{id}}', id) }});
'''


def api_generator(path_name, entity_name, biz_name, entity_properties):
    params = [f'{field[1]}?: {field[0]};' for field in entity_properties]
    param_list = '\n  '.join(params)
    field_list = '\n  '.join([f'{field[1]}: {field[0]};' for field in entity_properties])

    model_code = model_template.format(entity=entity_name,
                                       lowerCamelEntity=to_lower_camel_case(entity_name),
                                       param_list=param_list, field_list=field_list)

    api_model_file = f"src/api/{to_dash_case(path_name)}/{to_lower_camel_case(entity_name)}.ts"

    api_model_dir = os.path.dirname(api_model_file)
    os.makedirs(api_model_dir, exist_ok=True)
    with open(api_model_file, "w") as f:
        f.write(model_code)
