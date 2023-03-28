import os

# 生成前端代码
from util import camel_to_pascal, to_dash_case

model_template = '''import type {{ AppRouteModule }} from '/@/router/types';
import {{ LAYOUT }} from '/@/router/constant';
import {{ t }} from '/@/hooks/web/useI18n';

const charts: AppRouteModule = {{
  path: '/{path}',
  name: '{capitalizePath}',
  component: LAYOUT,
  redirect: '{redirect_url}',
  meta: {{
    icon: 'ion:bar-chart-outline',
    title: t('routes.{path}.{path}.moduleName'),
  }},
  children: [
    {children_list}
  ],
}};

export default charts;
'''


def router_generator(pathInfo, children):
    path = pathInfo.split(':')[0]
    children_list = '\n    '.join([f'{{\n      path: \'{to_dash_case(item.split(":")[0])}\',\n      name: \'{camel_to_pascal(item.split(":")[0])}Management\',\n      meta: {{\n        title: t(\'routes.{path}.{path}.{item.split(":")[0]}\'),\n      }},\n      component: () => import(\'/@/views/{to_dash_case(path)}/{to_dash_case(item.split(":")[0])}/index.vue\'),\n    }},' for item in children])
    redirect_url = f'/{path}/{children[0].split(":")[0]}'
    model_code = model_template.format(path=path, capitalizePath=path.capitalize(), redirect_url=redirect_url, children=children, children_list=children_list)

    api_model_file = f"src/router/routes/modules/{path}/{path}.ts"

    api_model_dir = os.path.dirname(api_model_file)
    os.makedirs(api_model_dir, exist_ok=True)
    with open(api_model_file, "w") as f:
        f.write(model_code)
