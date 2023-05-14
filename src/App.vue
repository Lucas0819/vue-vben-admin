<template>
  <ConfigProvider :locale="getAntdLocale">
    <AppProvider>
      <DndProvider :backend="HTML5Backend">
        <RouterView />
      </DndProvider>
    </AppProvider>
  </ConfigProvider>
</template>

<script lang="ts" setup>
  import { ConfigProvider } from 'ant-design-vue';
  import { AppProvider } from '@/components/Application';
  import { useTitle } from '@/hooks/web/useTitle';
  import { useLocale } from '@/locales/useLocale';
  import { DndProvider } from 'vue3-dnd';
  import { HTML5Backend } from 'react-dnd-html5-backend';
  import 'dayjs/locale/zh-cn';

  // support Multi-language
  const { getAntdLocale } = useLocale();

  // Listening to page changes and dynamically changing site titles
  useTitle();
</script>
