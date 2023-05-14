<script setup lang="ts">
  import { useDragLayer, XYCoord } from 'vue3-dnd';
  import { toRefs } from '@vueuse/core';
  import { TmpPaperElTypeEnum } from '@/enums/tmp/tmpPaperEnum';
  import { calcPaperPosition, calcPaperPositionInside } from '@/views/tmp/tmp-paper/tmpPaper';
  import Icon from '@/components/Icon/Icon.vue';

  const props = defineProps<{
    getPaperSize: () => { width: number; height: number };
  }>();

  function getItemStyles(delta: XYCoord | null) {
    if (!delta) {
      return {
        display: 'none',
      };
    }

    const { width, height } = props.getPaperSize();
    const { left, top } = calcPaperPosition(item.value?.elmLef, item.value?.elmTop, delta);
    // 防止移出边界
    const { x, y } = calcPaperPositionInside(
      left,
      top,
      item.value?.elmWidth,
      item.value?.elmHeight,
      width,
      height,
    );

    const transform = `translate(${x}px, ${y}px)`;
    return {
      transform,
    };
  }

  const collect = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    delta: monitor.getDifferenceFromInitialOffset(),
  }));
  const { item, delta } = toRefs(collect);
</script>

<template>
  <div class="layer">
    <div :style="getItemStyles(delta)">
      <div
        v-if="item?.elementType === TmpPaperElTypeEnum.ET_QRCod"
        ref="boxRef"
        class="box qrcode z-10"
        :style="{
          width: `${item?.elmWidth}px`,
          height: `${item?.elmHeight}px`,
        }"
      >
        <div class="resize-drag-point z-20"></div>
      </div>
      <!-- 文本 -->
      <div
        v-else
        ref="boxRef"
        class="box z-20"
        :style="{
          fontSize: `${item?.fontHeight}px`,
          fontWeight: `${item?.fontBold ? 'bolder' : 'normal'}`,
          fontFamily: `${item?.fontName}`,
        }"
      >
        <span>{{ item?.title }}</span>
        <Icon icon="ant-design:edit-outlined" class="icon-btn icon-btn-edit z-20" />
        <Icon icon="ant-design:close-circle-outlined" class="icon-btn icon-btn-close z-20" />
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
  @import 'tmp-paper-item';

  .layer {
    position: absolute;
    z-index: 100;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }
</style>
