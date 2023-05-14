<template>
  <div :class="`${prefixCls}-page-toolbox`" ref="toolboxRef">
    <slot></slot>
  </div>
</template>
<script lang="ts" setup>
  import { useDesign } from '/@/hooks/web/useDesign';

  // const props = defineProps({});
  const { prefixCls } = useDesign('page-toolbox');
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-page-toolbox';

  .@{prefix-cls} {
    position: relative;

    .@{prefix-cls}-content {
      margin: 16px;
    }

    .ant-page-header {
      &:empty {
        padding: 0;
      }
    }

    &-content-bg {
      background-color: @component-background;
    }

    &--dense {
      .@{prefix-cls}-content {
        margin: 0;
      }
    }
  }
</style>
