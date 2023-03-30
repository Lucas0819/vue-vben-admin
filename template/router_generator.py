import os

# 生成前端代码
from util import camel_to_pascal, to_dash_case, to_lower_camel_case

model_template = '''import type {{ AppRouteModule }} from '/@/router/types';
import {{ LAYOUT }} from '/@/router/constant';
import {{ t }} from '/@/hooks/web/useI18n';

const charts: AppRouteModule = {{
  path: '/{path}',
  name: '{pathName}',
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
    # 去除path自身
    children = list(filter(lambda x: x.split(":")[0] != path, children))
    children_list = '\n    '\
        .join([f'{{' \
               f'\n      path: \'{to_dash_case(item.split(":")[0])}\',' \
               f'\n      name: \'{camel_to_pascal(item.split(":")[0])}Management\',' \
               f'\n      meta: {{' \
               f'\n        title: t(\'routes.{to_lower_camel_case(path)}.{to_lower_camel_case(item.split(":")[0])}.moduleName\'),' \
               f'\n      }},' \
               f'\n      component: () => import(\'/@/views/{to_dash_case(path)}/{to_dash_case(item.split(":")[0])}/index.vue\'),' \
               f'\n      children: [' \
               f'\n        {{' \
               f'\n          path: \'form\',' \
               f'\n          name: \'{camel_to_pascal(item.split(":")[0])}Form\',' \
               f'\n          meta: {{' \
               f'\n            title: t(\'routes.{to_lower_camel_case(path)}.{to_lower_camel_case(item.split(":")[0])}.form\'),' \
               f'\n            hideMenu: true,' \
               f'\n            dynamicLevel: 3,' \
               f'\n            realPath: \'/{to_dash_case(path)}/{to_dash_case(item.split(":")[0])}\',' \
               f'\n            currentActiveMenu: \'/{to_dash_case(path)}/{to_dash_case(item.split(":")[0])}\',' \
               f'\n          }},' \
               f'\n          component: () => import(\'/@/views/{to_dash_case(path)}/{to_dash_case(item.split(":")[0])}/{to_lower_camel_case(item.split(":")[0])}Form.vue\'),' \
               f'\n        }},' \
               f'\n      ],' \
               f'\n    }},' for item in children])
    redirect_url = f'/{to_dash_case(path)}/{to_dash_case(children[0].split(":")[0])}'
    model_code = model_template.format(path=to_dash_case(path), pathName=camel_to_pascal(path), redirect_url=redirect_url, children_list=children_list)

    api_model_file = f"src/router/routes/modules/{path}/{path}.ts"

    api_model_dir = os.path.dirname(api_model_file)
    os.makedirs(api_model_dir, exist_ok=True)
    with open(api_model_file, "w") as f:
        f.write(model_code)
