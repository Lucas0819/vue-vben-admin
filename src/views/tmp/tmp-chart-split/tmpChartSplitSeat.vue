<template>
  <canvas
    id="seatCvs"
    class="seat-cvs"
    style="border: 1px #cccccc solid; position: relative; top: -6px"
  ></canvas>
  <div v-if="selectRule" v-html="selectRule.html"></div>
</template>
<script lang="ts">
  import { defineComponent, ref, unref } from 'vue';
  import { useRouter } from 'vue-router';
  import { isEmpty } from '/@/utils/is';
  import { useTabs } from '/@/hooks/web/useTabs';
  import { onMountedOrActivated } from '/@/hooks/core/onMountedOrActivated';
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
      if (!isEmpty(query.id)) {
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
    border: 1px #cccccc solid;
    position: relative;
    top: -6px;
    width: 100%;
    height: 100%;
  }
</style>
