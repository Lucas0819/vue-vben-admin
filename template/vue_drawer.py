import os

# 生成前端代码
model_template = '''<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="500px"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicDrawer>
</template>
<script lang="ts">
  import {{ computed, defineComponent, ref, unref }} from 'vue';
  import {{ BasicForm, useForm }} from '/@/components/Form/index';
  import {{ formSchema }} from './{lowerEntity}.data';
  import {{ BasicDrawer, useDrawerInner }} from '/@/components/Drawer';
  import {{ create{entity}, update{entity} }} from '/@/api/{path}/{lowerEntity}';

  export default defineComponent({{
    name: '{entity}Drawer',
    components: {{ BasicDrawer, BasicForm }},
    emits: ['success', 'register'],
    setup(_, {{ emit }}) {{
      const isUpdate = ref(true);
      const rowId = ref('');

      const [registerForm, {{ resetFields, setFieldsValue, validate }}] = useForm({{
        labelWidth: 90,
        baseColProps: {{ span: 24 }},
        schemas: formSchema,
        showActionButtonGroup: false,
      }});

      const [registerDrawer, {{ setDrawerProps, closeDrawer }}] = useDrawerInner(async (data) => {{
        resetFields();
        setDrawerProps({{ confirmLoading: false }});
        isUpdate.value = !!data?.isUpdate;

        if (unref(isUpdate)) {{
          rowId.value = data.record.id;
          setFieldsValue({{
            ...data.record,
          }});
        }}
      }});

      const getTitle = computed(() => (!unref(isUpdate) ? '新增{biz}' : '编辑{biz}'));

      async function handleSubmit() {{
        try {{
          const values = await validate();
          setDrawerProps({{ confirmLoading: true }});
          if (unref(isUpdate)) {{
            values.id = unref(rowId);
            await update{entity}(values);
          }} else {{
            await create{entity}(values);
          }}
          closeDrawer();
          emit('success');
        }} finally {{
          setDrawerProps({{ confirmLoading: false }});
        }}
      }}

      return {{
        registerDrawer,
        registerForm,
        getTitle,
        handleSubmit,
      }};
    }},
  }});
</script>
'''

def vue_drawer_generator(path_name, entity_name, biz_name, entityProperties):
    params = [f'{field[1]}?: {field[0]};' for field in entityProperties]

    model_code = model_template.format(path=path_name, entity=entity_name, lowerEntity=entity_name.lower(), biz=biz_name)

    api_model_file = f"src/views/{path_name}/{entity_name.lower()}/{entity_name}Drawer.vue"

    api_model_dir = os.path.dirname(api_model_file)
    os.makedirs(api_model_dir, exist_ok=True)
    with open(api_model_file, "w") as f:
        f.write(model_code)
