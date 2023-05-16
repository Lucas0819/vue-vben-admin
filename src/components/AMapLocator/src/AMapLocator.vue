<template>
  <div ref="wrapRef" :style="{ height, width }"></div>
  <!--  <div class="locator-container">-->
  <!--    <div id="locator_map_container" style="width: 100%; height: 300px"></div>-->
  <!--    <a-input-->
  <!--      placeholder="输入检索位置"-->
  <!--      class="u-input"-->
  <!--      autocomplete="off"-->
  <!--      id="tipinput"-->
  <!--      spellcheck="false"-->
  <!--      type="text"-->
  <!--    />-->
  <!--  </div>-->
</template>
<script lang="ts">
  import { defineComponent, getCurrentInstance, nextTick, onMounted, ref, unref } from 'vue';

  import { useScript } from '/@/hooks/web/useScript';
  import { basicProps } from '@/components/AMapLocator/src/props';
  import { LocationItem } from '@/components/AMapLocator/src/typing';

  const A_MAP_URL =
    'https://webapi.amap.com/maps?v=1.4.15&key=a08424c259a9756b9b2e6d910420ffc7&plugin=AMap.Autocomplete,AMap.PlaceSearch,AMap.Geocoder';

  export default defineComponent({
    name: 'AMap',
    props: basicProps,
    emits: ['register'],
    setup(props, { emit }) {
      const wrapRef = ref<HTMLDivElement | null>(null);
      const { toPromise } = useScript({ src: A_MAP_URL });
      const defaultLocation = ref<LocationItem | null>(null);

      async function initMap() {
        await toPromise();
        await nextTick();
        const wrapEl = unref(wrapRef);
        if (!wrapEl) return;
        const AMap = (window as any).AMap;
        new AMap.Map(wrapEl, {
          zoom: 11,
          center: [116.397428, 39.90923],
          viewMode: '3D',
        });
      }

      onMounted(() => {
        initMap();
      });

      const setLocation = (location: LocationItem) => {
        defaultLocation.value = location;
      };
      const getLocation = () => {
        return defaultLocation.value;
      };

      const instance = getCurrentInstance();
      const locatorMethods = {
        setLocation,
        getLocation,
      };
      if (instance) {
        emit('register', locatorMethods);
      }

      return { wrapRef };
    },
  });
</script>
