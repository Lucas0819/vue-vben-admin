import os

# 生成前端代码
model_template = '''export default {{
  merchant: {{
    moduleName: '{pathName}',
    {children_list}
  }},
}};
'''


def router_i18n_generator(pathInfo, children):
    path = pathInfo.split(':')[0]
    pathName = pathInfo.split(':')[1]
    children_list = '\n    '.join([f'{item.split(":")[0]}: \'{item.split(":")[1]}\',' for item in children])
    model_code = model_template.format(pathName=pathName, children_list=children_list)

    api_model_file = f"src/locales/lang/zh-CN/routes/{path}.ts"

    api_model_dir = os.path.dirname(api_model_file)
    os.makedirs(api_model_dir, exist_ok=True)
    with open(api_model_file, "w") as f:
        f.write(model_code)