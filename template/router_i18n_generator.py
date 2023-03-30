import os

# 生成前端代码
from util import to_lower_camel_case

model_template = '''export default {{
  {children_list}
}};
'''


def router_i18n_generator(pathInfo, children):
    path = pathInfo

    # 国际化-中文
    children_list = '\n  '.join([f'{to_lower_camel_case(item.split(":")[0])}: {{'\
                                 f'\n    moduleName: \'{item.split(":")[1]}\','\
                                 f'\n    form: \'{item.split(":")[1]}-维护\','\
                                 f'\n  }},' for item in children])
    model_code = model_template.format(path=path, children_list=children_list)

    api_model_file = f"src/locales/lang/zh-CN/routes/{to_lower_camel_case(path)}.ts"

    api_model_dir = os.path.dirname(api_model_file)
    os.makedirs(api_model_dir, exist_ok=True)
    with open(api_model_file, "w") as f:
        f.write(model_code)

    # 国际化-英文
    children_list = '\n  '.join([f'{to_lower_camel_case(item.split(":")[0])}: {{' \
                                 f'\n    moduleName: \'{item.split(":")[0]}\',' \
                                 f'\n    form: \'{item.split(":")[0]}-maintain\',' \
                                 f'\n  }},' for item in children])
    model_code = model_template.format(path=path, children_list=children_list)

    api_model_file = f"src/locales/lang/en/routes/{path}.ts"

    api_model_dir = os.path.dirname(api_model_file)
    os.makedirs(api_model_dir, exist_ok=True)
    with open(api_model_file, "w") as f:
        f.write(model_code)
