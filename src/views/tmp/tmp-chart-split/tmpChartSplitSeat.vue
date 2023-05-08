<template>
  <canvas
    id="seatCvs"
    class="seat-cvs"
    style="position: relative; top: -6px; border: 1px #ccc solid"
  ></canvas>
  <div v-if="selectRule">{{ selectRule.html }}</div>
</template>
<script lang="ts">
  import { defineComponent, ref, unref } from 'vue';
  import { useRouter } from 'vue-router';
  import { isEmpty, isNotEmpty } from '/@/utils/is';
  import { useTabs } from '/@/hooks/web/useTabs';
  import { onMountedOrActivated } from '@vben/hooks';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { findOne } from '/@/api/tmp/tmpChartSplit';
  import { TmpChartSplitItem } from '/@/api/tmp/model/tmpChartSplitModel';
  import { initSeatAdd, selectRule } from '/@/utils/seat/seatAdd';

  export default defineComponent({
    components: {},
    setup() {
      const { createMessage } = useMessage();
      const { t } = useI18n();
      const recordId = ref('');
      const recordData = ref<TmpChartSplitItem>();
      const router = useRouter();
      const { query } = unref(router.currentRoute);
      if (isNotEmpty(query.id)) {
        recordId.value = query.id;
      }

      const { setTitle, closeCurrent } = useTabs();

      onMountedOrActivated(async () => {
        if (isEmpty(recordId.value)) {
          createMessage.error(t('sys.api.paramsErrorMessage'));
          await closeCurrent();
          router.back();
          return;
        }
        recordData.value = await findOne(recordId.value);
        setTitle('票图结构模板-' + recordData.value.name);
        initSeatAdd();
      });

      return {
        recordData,
        selectRule,
      };
    },
  });
</script>
<style lang="scss" scoped>
  .seat-cvs {
    position: relative;
    top: -6px;
    width: 100%;
    height: 100%;
    border: 1px #ccc solid;
  }
</style>
