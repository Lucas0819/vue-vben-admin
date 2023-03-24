import os

# 生成前端代码
model_template = '''import {{ MockMethod }} from 'vite-plugin-mock';
import {{ resultPageSuccess, resultSuccess }} from '../../_util';

const {lowerEntity}List = (() => {{
  const result: any[] = [];
  for (let index = 0; index < 20; index++) {{
    result.push({{
      {field_list}
    }});
  }}
  return result;
}})();

export default [
  {{
    url: '/basic-api/{lowerEntity}/get{entity}Page',
    timeout: 100,
    method: 'get',
    response: ({{ query }}) => {{
      const {{ page = 1, pageSize = 20 }} = query;
      return resultPageSuccess(page, pageSize, {lowerEntity}List);
    }},
  }},
  {{
    url: '/basic-api/{lowerEntity}/getAll{entity}List',
    timeout: 100,
    method: 'get',
    response: () => {{
      return resultSuccess({lowerEntity}List);
    }},
  }},
  {{
    url: '/basic-api/{lowerEntity}/create{entity}',
    timeout: 500,
    method: 'post',
    response: () => {{
      return resultSuccess({{ id: (Math.random() * 100).toFixed(0) + '' }});
    }},
  }},
  {{
    url: '/basic-api/{lowerEntity}/update{entity}',
    timeout: 100,
    method: 'put',
    response: ({{ item }}) => {{
      const {{ id }} = item;
      return resultSuccess({{ id }});
    }},
  }},
  {{
    url: '/basic-api/{lowerEntity}/delete{entity}',
    timeout: 100,
    method: 'delete',
    response: ({{ item }}) => {{
      const {{ id }} = item;
      return resultSuccess({{ id }});
    }},
  }},
] as MockMethod[];
'''

def mock_generator(path_name, entity_name, biz_name, entityProperties):
    params = [f'{field[1]}?: {field[0]};' for field in entityProperties]
    param_list = '\n  '.join(params)
    field_list = '\n      '.join([f'{field[1]}: \'@{{{field[1]}}}()\',' for field in entityProperties])

    model_code = model_template.format(entity=entity_name, lowerEntity=entity_name.lower(), param_list=param_list, field_list=field_list)

    api_model_file = f"mock/{path_name}/{entity_name.lower()}/{entity_name.lower()}.ts"

    api_model_dir = os.path.dirname(api_model_file)
    os.makedirs(api_model_dir, exist_ok=True)
    with open(api_model_file, "w") as f:
        f.write(model_code)
