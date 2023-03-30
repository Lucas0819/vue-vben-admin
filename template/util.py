import os
import re


# 将大驼峰转换为中划线分割
def to_dash_case(s):
    s = re.sub('(.)([A-Z][a-z]+)', r'\1-\2', s)
    s = re.sub('([a-z0-9])([A-Z])', r'\1-\2', s)
    return s.lower()


# 将大驼峰转换为小驼峰
def to_lower_camel_case(s):
    s = re.sub('(.)([A-Z][a-z]+)', r'\1_\2', s)
    s = re.sub('([a-z0-9])([A-Z])', r'\1_\2', s)
    s = s.lower().split('_')
    return s[0] + ''.join(word.capitalize() for word in s[1:])

# 将小驼峰转换为大驼峰
def camel_to_pascal(name):
    return re.sub(r'(?<!^)(?=[A-Z])', '_', name).title().replace('_', '')

# 将大驼峰转换为下划线分割的大写
def camel_to_snake(camel_case_str):
    # 使用正则表达式将大驼峰格式转换为下划线分割的全大写格式
    snake_case_str = re.sub(r'(?<!^)(?=[A-Z])', '_', camel_case_str).upper()

    return snake_case_str

def parse_variable_definitions(text):
    # 构造匹配数据类型和变量名的正则表达式
    pattern1 = re.compile(r'private\s+(\S+)\s+(\S+)\s*;')

    # 构造匹配注释的正则表达式
    comment_pattern = r'\s*(?:\/\/|\*)\s*(.*?)\s*(?:\n|\*/|$)'

    # 将匹配注释的正则表达式插入到数据类型和变量名的正则表达式中
    pattern2 = re.compile(
        rf'{pattern1.pattern}\s*(?:{comment_pattern})?',
        flags=pattern1.flags
    )

    # 使用 findall 方法解析所有变量定义
    variable_definitions = []
    for match in pattern2.findall(text):
        data_type = match[0].strip()
        variable_name = match[1].strip()
        comment = match[2].strip() if match[2] else match[1]
        variable_definitions.append((data_type, variable_name, comment))

    return variable_definitions
