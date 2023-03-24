import argparse
import configparser
import re
# from template/api_model_generator import api_model_generator
from template.api_generator import api_generator
from template.api_model_generator import api_model_generator
from template.mock_generator import mock_generator
from template.vue_data import vue_data_generator
from template.vue_drawer import vue_drawer_generator
from template.vue_index import vue_index_generator


def generator_code(biz_name, path_name, entity_name, entity_path):
    # 读取Java实体类文件
    java_file = open(entity_path, "r")
    java_code = java_file.read()
    java_file.close()

    # 读取字段类型、字段名、中文描述
    pattern = re.compile(r'private\s+(\S+)\s+(\S+)\s*;\s*//\s*(.*)')
    entityProperties = pattern.findall(java_code)

    api_model_generator(path_name, entity_name, biz_name, entityProperties)
    api_generator(path_name, entity_name, biz_name, entityProperties)
    mock_generator(path_name, entity_name, biz_name, entityProperties)
    vue_data_generator(path_name, entity_name, biz_name, entityProperties)
    vue_index_generator(path_name, entity_name, biz_name, entityProperties)
    vue_drawer_generator(path_name, entity_name, biz_name, entityProperties)


config = configparser.ConfigParser()

# 读取配置文件
config.read('template/config.ini')

# 获取所有database配置的section名
database_sections = [section for section in config.sections() if section.startswith('entity')]

# 循环遍历每个database配置
for section_name in database_sections:
    # 获取数据库配置的值
    biz_name = config.get(section_name, 'biz_name')
    path_name = config.get(section_name, 'path_name')
    entity_name = config.get(section_name, 'entity_name')
    entity_path = config.get(section_name, 'entity_path')

    generator_code(biz_name, path_name, entity_name, entity_path)



