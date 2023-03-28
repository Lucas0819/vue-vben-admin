# 基础代码生成 Python 脚本

> 读取[config.ini](config.ini)配置文件，生成基础代码
>
> path: 一级功能菜单， entity: 二级功能菜单，对应实际的实体类

## 生成模块

### 1.API 模块

> 包含 API 接口的参数、返回值类型定义，以及接口方法

#### API 接口数据类型定义

路径：`src/api/{path_name}/model/{entity_name}Model.ts`

python 代码: [api_model_generator.py](api_model_generator.py)

#### API 接口方法

路径：`src/api/{path_name}/{entity_name}.ts`

python 代码: [api_generator.py](api_generator.py)

### 2.Mock 模块

> 实体类基础 CRUD 的 Mock 数据

路径：`mock/{path_name}/{entity_name}/{entity_name}.ts`

python 代码: [mock_generator.py](mock_generator.py)

### 3.Vue 模块

#### 基础表格和表单的数据类型定义

路径：`src/views/{path_name}/{entity_name}/{entity_name}.data.ts`

python 代码: [vue_data.py](vue_data.py)

#### Vue 基础页面文件

路径：`src/views/{path_name}/{entity_name}/index.vue`

python 代码: [vue_index.py](vue_index.py)

#### Vue 编辑组件(默认为侧拉抽屉 Drawer)

路径：`src/views/{path_name}/{entity_name}/{entity_name}Drawer.vue`

python 代码: [vue_drawer.py](vue_drawer.py)

### 4.Router 配置

#### 路由路径配置

路径：`src/router/routes/modules/{path}/{path}.ts`

python 代码: [router_generator.py](router_generator.py)

#### 路由国际化配置

路径(中文)：`src/locales/lang/zh-CN/routes/{path}.ts`

路径(英文)：`src/locales/lang/en/routes/{path}.ts`

python 代码: [router_i18n_generator.py](router_i18n_generator.py)

---

## 执行方式&配置说明

> 依据现阶段开发背景，第一版代码生成的核心逻辑为读取 Java 的实体类代码，按照实体类的属性生成单表数据的基础 CRUD 代码。

### 1.执行方式

> 安装 Python 后，直接运行[codeGenerator.py](../codeGenerator.py)即可

```python
python codeGenerator.py
```

### 2.配置说明

> 每组配置分为两部分，包括每个实体类对应的二级功能菜单代码，以及一级菜单的路由配置

#### `[entity-{entity}]`为实体类配置

| {entity}    | 实体类标识                                             |
| ----------- | ------------------------------------------------------ |
| biz_name    | 业务的中文名称                                         |
| path_name   | 一级功能菜单名称(实体类上级路径)                       |
| entity_name | 实体类名称                                             |
| entity_path | 实体类对应的 Java 代码的绝对路径，用于扫描实体类的属性 |

#### `[router-{path}]`为一级菜单的路由配置

| {path}      | 一级菜单标识                                                                |
| ----------- | --------------------------------------------------------------------------- |
| path_name   | `:`分割的一级菜单中英文名称，用于路由的国际化配置，形如:`merchant:商户管理` |
| children[0] | `:`分割的二级菜单中英文名称，用于路由的国际化配置，形如:`office:主办单位`   |
| children[n] | 多个二级菜单配置                                                            |
| ...         | ...                                                                         |
