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
