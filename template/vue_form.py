import os

# 生成前端代码
from util import to_lower_camel_case, to_dash_case

model_template = '''<template>
  <PageWrapper title="{biz}">
    <CollapseContainer title="添加{biz}">
      <BasicForm @register="register" @submit="handleSubmit" />
    </CollapseContainer>
  </PageWrapper>
</template>

<script lang="ts">
  import {{ defineComponent, ref, unref }} from 'vue';
  import {{ BasicForm, useForm }} from '/@/components/Form';
  import {{ CollapseContainer }} from '/@/components/Container';
  import {{ PageWrapper }} from '/@/components/Page';
  import {{ formSchema }} from '/@/views/{path}/{dash_case_entity}/{lower_camel_entity}.data';
  import {{ useI18n }} from '/@/hooks/web/useI18n';
  import {{ create{entity}, findOne, update{entity} }} from '/@/api/{path}/{lower_camel_entity}';
  import {{ useRouter }} from 'vue-router';
  import {{ onMountedOrActivated }} from '/@/hooks/core/onMountedOrActivated';
  import {{ useMessage }} from '/@/hooks/web/useMessage';
  import {{ isEmpty }} from '/@/utils/is';
  import {{ useTabs }} from '/@/hooks/web/useTabs';

  export default defineComponent({{
    components: {{
      BasicForm,
      CollapseContainer,
      PageWrapper,
    }},
    setup() {{
      const {{ t }} = useI18n();
      const recordId = ref('');
      const router = useRouter();
      const {{ query }} = unref(router.currentRoute);
      const isUpdate = ref(false);
      if (!isEmpty(query.id)) {{
        recordId.value = query.id;
        isUpdate.value = true;
      }}

      const {{ setTitle, closeCurrent }} = useTabs();

      const [register, {{ resetFields, setFieldsValue, validate }}] = useForm({{
        autoFocusFirstItem: true,
        labelWidth: 200,
        baseColProps: {{
          span: 24,
        }},
        wrapperCol: {{
          span: 12,
        }},
        actionColOptions: {{
          span: 24,
          style: 'text-align: left; margin-left: 200px;',
        }},
        resetButtonOptions: {{
          text: t('common.resetText'),
        }},
        submitButtonOptions: {{
          text: t('common.saveText'),
        }},
        schemas: formSchema,
      }});

      onMountedOrActivated(async () => {{
        if (!unref(isUpdate)) {{
          setTitle('{biz}-新增');
          return;
        }}
        await resetFields();
        const data = await findOne(recordId.value);
        setTitle('{biz}-' + data.name);
        setFieldsValue(data);
      }});

      async function handleSubmit() {{
        const values = await validate();
        if (unref(isUpdate)) {{
          values.id = unref(recordId);
          await update{entity}(values);
        }} else {{
          await create{entity}(values);
        }}
        await handleSuccess();
        await closeCurrent();
        router.back();
      }}

      function handleSuccess() {{
        return new Promise((resolve) => {{
          const {{ createSuccessModal }} = useMessage();
          createSuccessModal({{
            title: t('sys.api.operationSuccess'),
            content: unref(isUpdate)
              ? t('sys.api.updateSuccessMsg', ['{biz}'])
              : t('sys.api.createSuccessMsg', ['{biz}']),
            closable: false,
            okText: t('common.back'),
            onOk: resolve,
          }});
        }});
      }}

      return {{
        register,
        handleSubmit,
      }};
    }},
  }});
</script>
'''

def vue_form_generator(path_name, entity_name, biz_name, entity_properties):
    params = [f'{field[1]}?: {field[0]};' for field in entity_properties]

    model_code = model_template.format(path=to_dash_case(path_name), entity=entity_name, lower_camel_entity=to_lower_camel_case(entity_name), dash_case_entity=to_dash_case(entity_name), biz=biz_name)

    api_model_file = f"src/views/{to_dash_case(path_name)}/{to_dash_case(entity_name)}/{to_lower_camel_case(entity_name)}Form.vue"

    api_model_dir = os.path.dirname(api_model_file)
    os.makedirs(api_model_dir, exist_ok=True)
    with open(api_model_file, "w") as f:
        f.write(model_code)
