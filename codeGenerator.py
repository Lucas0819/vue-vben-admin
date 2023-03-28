import configparser
import re
from template.api_generator import api_generator
from template.api_model_generator import api_model_generator
from template.mock_generator import mock_generator
from template.router_generator import router_generator
from template.router_i18n_generator import router_i18n_generator
from template.vue_data import vue_data_generator
from template.vue_drawer import vue_drawer_generator
from template.vue_index import vue_index_generator


def generator_code(biz_name, path_name, entity_name, entity_path):
    # 读取Java实体类文件
    java_file = open(entity_path, "r")
    # 注入基础字段
    java_code = 'private String id; // ID\n' \
                'private String remarks;    // 备注\n' \
                'private User createBy;    // 创建者\n' \
                'private Date createDate;    // 创建日期\n' \
                'private Date updateDate;    // 更新日期\n'
    java_code += java_file.read()
    java_file.close()

    # 读取字段类型、字段名、中文描述
    pattern = re.compile(r'private\s+(\S+)\s+(\S+)\s*;\s*//\s*(.*)')
    entity_properties = pattern.findall(java_code)

    api_model_generator(path_name, entity_name, biz_name, entity_properties)
    api_generator(path_name, entity_name, biz_name, entity_properties)
    mock_generator(path_name, entity_name, biz_name, entity_properties)
    vue_data_generator(path_name, entity_name, biz_name, entity_properties)
    vue_index_generator(path_name, entity_name, biz_name, entity_properties)
    vue_drawer_generator(path_name, entity_name, biz_name, entity_properties)

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

# 获取所有router
parent_routers = [section for section in config.sections() if section.startswith('router')]
for parent_router in parent_routers:
    path = config.get(parent_router, 'path_name')
    children = [config[parent_router][key] for key in config[parent_router] if key.startswith('children')]

    router_generator(path, children)
    router_i18n_generator(path, children)
