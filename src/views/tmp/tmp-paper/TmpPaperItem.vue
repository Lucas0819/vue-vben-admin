<template>
  <div>
    <div
      v-if="item.elementType === TmpPaperElTypeEnum.ET_QRCod"
      ref="previewRef"
      class="box qrcode z-10"
      :style="{
        width: `${item.elmWidth}px`,
        height: `${item.elmHeight}px`,
        left: `${item.elmLef}px`,
        top: `${item.elmTop}px`,
        opacity: isDragging ? 0 : 1,
      }"
    >
      <div ref="dragRef" class="drag-content z-10"></div>
      <div class="resize-drag-point z-20" @mousedown="resize"></div>
    </div>
    <!-- 文本 -->
    <div
      v-else
      ref="previewRef"
      class="box z-20"
      :style="{
        left: `${item.elmLef}px`,
        top: `${item.elmTop}px`,
        fontSize: `${item.fontHeight}px`,
        fontWeight: `${item.fontBold ? 'bolder' : 'normal'}`,
        fontFamily: `${item.fontName}`,
        opacity: isDragging ? 0 : 1,
      }"
    >
      <div ref="dragRef" class="drag-content z-10"></div>
      <span>{{ item.title }}</span>
      <Icon icon="ant-design:edit-outlined" class="icon-btn icon-btn-edit z-20" @click="editItem" />
      <Icon
        icon="ant-design:close-circle-outlined"
        class="icon-btn icon-btn-close z-20"
        @click="removeItem"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { useDrag } from 'vue3-dnd';
  import { getEmptyImage } from 'react-dnd-html5-backend';
  import { toRefs } from '@vueuse/core';
  import { TmpPaperElTypeEnum } from '@/enums/tmp/tmpPaperEnum';
  import { ref } from 'vue';
  import { onMountedOrActivated } from '@vben/hooks';
  import { TmpPaperElItem } from '@/api/tmp/model/tmpPaperModel';
  import Icon from '@/components/Icon/Icon.vue';

  const props = defineProps<{
    item: TmpPaperElItem;
    getPaperSize: () => { width: number; height: number };
  }>();
  const emit = defineEmits([
    'move:box',
    'on:qrWidthChange',
    'on:qrWidthChanged',
    'on:edit',
    'on:remove',
  ]);

  const previewRef = ref<HTMLDivElement | null>(null);
  const dragRef = ref<HTMLDivElement | null>(null);

  const [collect, dragConnector, previewConnector] = useDrag(() => ({
    type: 'BOX',
    item: {
      ...props.item,
      elmWidth: previewRef.value?.offsetWidth,
      elmHeight: previewRef.value?.offsetHeight,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      const { _id } = item;
      const didDrop = monitor.didDrop();
      if (!didDrop) {
        const delta = monitor.getDifferenceFromInitialOffset();
        let left = Math.round(item.elmLef + delta.x);
        let top = Math.round(item.elmTop + delta.y);
        // 防止移出边界
        left = Math.min(props.getPaperSize().width - (item.elmWidth ?? 0), Math.max(0, left));
        top = Math.min(props.getPaperSize().height - (item.elmHeight ?? 0), Math.max(0, top));
        emit('move:box', _id, left, top);
      }
    },
  }));
  const { isDragging } = toRefs(collect);

  onMountedOrActivated(() => {
    dragConnector(dragRef);
    previewConnector(getEmptyImage(), { captureDraggingState: true });
  });

  function resize(e) {
    if (props.item.elementType !== TmpPaperElTypeEnum.ET_QRCod) return;
    const disX = e.clientX;
    const disY = e.clientY;
    const previewEl = previewRef.value;
    if (!previewEl) return;
    const offsetWidth = previewEl.offsetWidth ?? 88;
    const offsetHeight = previewEl.offsetHeight ?? 88;

    document.onmousemove = function (e) {
      // 通过事件委托，计算移动的距离
      let left = e.clientX - disX;
      let top = e.clientY - disY;

      // 等比放大, 不超过画布
      const biggerData = Math.min(302, Math.max(60, offsetWidth + left, offsetHeight + top));

      emit('on:qrWidthChange', props.item._id, biggerData);
    };

    document.onmouseup = () => {
      document.onmousemove = null;
      document.onmouseup = null;
      emit('on:qrWidthChanged', props.item._id);
    };
  }

  function editItem() {
    emit('on:edit', props.item);
  }
  function removeItem() {
    emit('on:remove', props.item._id);
  }
</script>
<style lang="less" scoped>
  @import 'tmp-paper-item';
</style>
