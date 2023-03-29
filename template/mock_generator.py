import os

# 生成前端代码
from util import to_dash_case, to_lower_camel_case

model_template = '''import {{ MockMethod }} from 'vite-plugin-mock';
import {{ resultPageSuccess, resultSuccess }} from '../../_util';

const {lowerCamelEntity}Item = {{
  {field_list}
}};

const {lowerCamelEntity}List = (() => {{
  const result: any[] = [];
  for (let index = 0; index < 20; index++) {{
    result.push({lowerCamelEntity}Item);
  }}
  return result;
}})();

export default [
  {{
    url: '/basic-api/{lowerCamelEntity}/get{entity}Page',
    timeout: 100,
    method: 'get',
    response: ({{ query }}) => {{
      const {{ page = 1, pageSize = 20 }} = query;
      return resultPageSuccess(page, pageSize, {lowerCamelEntity}List);
    }},
  }},
  {{
    url: '/basic-api/{lowerCamelEntity}/getAll{entity}List',
    timeout: 100,
    method: 'get',
    response: () => {{
      return resultSuccess({lowerCamelEntity}List);
    }},
  }},
  {{
    url: '/basic-api/{lowerCamelEntity}/findOne/:id',
    timeout: 100,
    method: 'get',
    response: () => {{
      return resultSuccess({lowerCamelEntity}Item);
    }},
  }},
  {{
    url: '/basic-api/{lowerCamelEntity}/create{entity}',
    timeout: 500,
    method: 'post',
    response: () => {{
      return resultSuccess({{ id: (Math.random() * 100).toFixed(0) + '' }});
    }},
  }},
  {{
    url: '/basic-api/{lowerCamelEntity}/update{entity}',
    timeout: 100,
    method: 'put',
    response: ({{ id }}) => {{
      return resultSuccess({{ id }});
    }},
  }},
  {{
    url: '/basic-api/{lowerCamelEntity}/delete{entity}/:id',
    timeout: 100,
    method: 'delete',
    response: ({{ id }}) => {{
      return resultSuccess({{ id }});
    }},
  }},
] as MockMethod[];
'''


def mock_generator(path_name, entity_name, biz_name, entity_properties):
    params = [f'{field[1]}?: {field[0]};' for field in entity_properties]
    param_list = '\n  '.join(params)
    field_list = '\n  '.join([f'{field[1]}: \'@{field[1]}()\',' for field in entity_properties])

    model_code = model_template.format(entity=entity_name,
                                       lowerCamelEntity=to_lower_camel_case(entity_name),
                                       param_list=param_list, field_list=field_list)

    api_model_file = f"mock/{path_name}/{to_dash_case(entity_name)}/{to_lower_camel_case(entity_name)}.ts"

    api_model_dir = os.path.dirname(api_model_file)
    os.makedirs(api_model_dir, exist_ok=True)
    with open(api_model_file, "w") as f:
        f.write(model_code)
