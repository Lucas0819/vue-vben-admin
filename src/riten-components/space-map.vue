<!--<template>-->
<!--  <a-modal-->
<!--    v-model="showMap"-->
<!--    :title="'地图定位'"-->
<!--    width="800px"-->
<!--    @ok="emitItemData"-->
<!--    @cancel="closeModal"-->
<!--  >-->
<!--    <div class="map-container">-->
<!--      <div class="locator-container">-->
<!--        <div id="locator_map_container" style="width: 100%; height: 300px"></div>-->
<!--        <a-input-->
<!--          placeholder="输入检索位置"-->
<!--          class="u-input re-position"-->
<!--          autocomplete="off"-->
<!--          id="tipinput"-->
<!--          spellcheck="false"-->
<!--          type="text"-->
<!--        />-->
<!--      </div>-->
<!--    </div>-->
<!--  </a-modal>-->
<!--</template>-->

<!--<script lang="ts">-->
<!--  import { mapState } from 'vuex';-->
<!--  import LOC_GAODE from '../libs/gis/locator-gaode.js';-->

<!--  const handleAddressData = (addressData, hasChildren = false) => {-->
<!--    return addressData.map((data) => {-->
<!--      let result = {-->
<!--        value: data.areaId,-->
<!--        label: data.areaName,-->
<!--        areaLevel: data.areaLevel,-->
<!--        children: data.items || [],-->
<!--      };-->
<!--      hasChildren && (result.loading = false);-->
<!--      return result;-->
<!--    });-->
<!--  };-->
<!--  export default {-->
<!--    name: 'MapLocator2',-->
<!--    components: {},-->
<!--    props: ['defaultCenter', 'defaultLocation', 'address', 'selectedCode'],-->
<!--    data() {-->
<!--      return {-->
<!--        Locator: LOC_GAODE,-->
<!--        showMap: false,-->
<!--        // 详细地址-->
<!--        detailAddress: '',-->
<!--        // 城市编码-->
<!--        cityCode: [],-->
<!--        selectedMarker: null,-->
<!--        // 选择的地址-->
<!--        selectedAddress: {-->
<!--          addrAlias: '',-->
<!--          addrAdCode: '',-->
<!--        },-->
<!--        mapSearchResults: [],-->
<!--        geocoder: undefined,-->
<!--        options: [],-->
<!--      };-->
<!--    },-->
<!--    watch: {-->
<!--      // 如果modal打开,那么地图初始化-->
<!--      showMap(newValue) {-->
<!--        if (newValue) {-->
<!--          this.Locator.selectedMarker = null;-->
<!--          this.selectedLocation = null;-->
<!--          this.selectedAddress = { addrAlias: '' };-->
<!--          this.$nextTick(() => {-->
<!--            document.querySelector('#tipinput').value = '';-->
<!--            this.Locator.initMap(this);-->
<!--          });-->
<!--        } else {-->
<!--          this.Locator.destroyMap();-->
<!--        }-->
<!--      },-->
<!--    },-->
<!--    computed: {-->
<!--      ...mapState({-->
<!--        provinceList: (state) => handleAddressData(state.provinceList, true),-->
<!--      }),-->
<!--    },-->
<!--    mounted() {-->
<!--      // 如果没有传递经纬度，那么省市区的数据先不获取-->
<!--      if (this.defaultCenter.length !== 0) {-->
<!--        this.setProvinceList();-->
<!--      }-->
<!--    },-->
<!--    methods: {-->
<!--      // 设置省份-->
<!--      setProvinceList() {-->
<!--        this.options = this.provinceList.map((item) => {-->
<!--          return {-->
<!--            label: item.label,-->
<!--            value: item.value + '',-->
<!--            isLeaf: false,-->
<!--            areaLevel: item.areaLevel,-->
<!--            loading: item.loading,-->
<!--          };-->
<!--        });-->
<!--      },-->
<!--      // 做反选-->
<!--      finish(code, value) {-->
<!--        this.detailAddress = value;-->
<!--        if (!code) return;-->
<!--        if (this.options.length === 0) {-->
<!--          this.setProvinceList();-->
<!--        }-->
<!--        // 分割城市code-->
<!--        const cityCode = [code.slice(0, 2) + '0000', code.slice(0, 4) + '00', code + ''];-->
<!--        // 找到省-->
<!--        let item = this.options.find((item) => item.value === cityCode[0]);-->
<!--        // 获取市-->
<!--        this.initData(item).then((data) => {-->
<!--          // 找到市-->
<!--          // 当前省-->
<!--          let cityValue = this.options.find((item) => item.value === cityCode[0]);-->
<!--          let result = cityValue.children.find((item) => item.value === cityCode[1]);-->
<!--          // 如果找到市-->
<!--          if (result) {-->
<!--            // 获取区域-->
<!--            this.initData(result).then((res) => {-->
<!--              if (res) {-->
<!--                this.cityCode = [...cityCode];-->
<!--              }-->
<!--            });-->
<!--          }-->
<!--        });-->
<!--      },-->
<!--      // 动态加载-->
<!--      loadData(item) {-->
<!--        this.initData(item.at(-1));-->
<!--      },-->
<!--      // 初始化省市区-->
<!--      initData(item) {-->
<!--        return new Promise((resolve) => {-->
<!--          let url = server.api.canton.getCantons;-->
<!--          if (item.areaLevel === '1') {-->
<!--            url += '?areaLevel=2&belongtoProvinceId=' + item.value;-->
<!--          } else {-->
<!--            url += '?areaLevel=3&belongtoCityId=' + item.value;-->
<!--          }-->
<!--          this.$http.get(url).then((res) => {-->
<!--            const data = res.body.data;-->
<!--            item.children = data.map((item) => {-->
<!--              return {-->
<!--                ...item,-->
<!--                isLeaf: item.areaLevel !== '2',-->
<!--                value: item.areaId + '',-->
<!--                label: item.areaName,-->
<!--              };-->
<!--            });-->
<!--            resolve(data);-->
<!--            this.options = [...this.options];-->
<!--          });-->
<!--        });-->
<!--      },-->
<!--      // 显示组件-->
<!--      showMapModal() {-->
<!--        this.showMap = true;-->
<!--      },-->
<!--      // 返回地图内部的数据-->
<!--      submitLocation() {-->
<!--        this.selectedAddress.location = this.selectedLocation;-->
<!--        this.handlerPrev();-->
<!--      },-->
<!--      handlerPrev() {-->
<!--        // code的值需要和选择同步-->
<!--        this.selectedAddress.cityCode = this.cityCode.at(-1) ? this.cityCode.at(-1) : '';-->
<!--        this.selectedAddress.detailAddress = this.detailAddress;-->
<!--        this.$emit('UpdateLocation', this.selectedAddress);-->
<!--      },-->
<!--      // 将外界需要的值返回-->
<!--      emitItemData() {-->
<!--        // 如果是点击定位的时候-->
<!--        this.submitLocation();-->
<!--        this.showMap = false;-->
<!--      },-->
<!--      closeModal() {-->
<!--        this.cityCode = [];-->
<!--        this.detailAddress = '';-->
<!--      },-->
<!--    },-->
<!--  };-->
<!--</script>-->

<!--<style lang="less">-->
<!--  .re-position {-->
<!--    position: absolute;-->
<!--    top: 0;-->
<!--    left: 0;-->
<!--    width: 25%;-->
<!--  }-->
<!--  .locator-container {-->
<!--    position: relative;-->
<!--    //.u-input {-->
<!--    //  position: absolute;-->
<!--    //  left: 0;-->
<!--    //  top: 0;-->
<!--    //  width: 30%;-->
<!--    //  z-index: 666;-->
<!--    //}-->

<!--    //div.info-top {-->
<!--    //  position: relative;-->
<!--    //  background: none repeat scroll 0 0 #F9F9F9;-->
<!--    //  border-bottom: 1px solid #CCC;-->
<!--    //  border-radius: 5px 5px 0 0;-->
<!--    //}-->
<!--    //-->
<!--    //div.info-top div {-->
<!--    //  display: inline-block;-->
<!--    //  color: #333333;-->
<!--    //  font-size: 14px;-->
<!--    //  font-weight: bold;-->
<!--    //  line-height: 31px;-->
<!--    //  padding: 0 10px;-->
<!--    //}-->
<!--    //-->
<!--    //div.info-top img {-->
<!--    //  position: absolute;-->
<!--    //  top: 10px;-->
<!--    //  right: 10px;-->
<!--    //  transition-duration: 0.25s;-->
<!--    //}-->
<!--    //-->
<!--    //div.info-top img:hover {-->
<!--    //  box-shadow: 0px 0px 5px #000;-->
<!--    //}-->
<!--    //-->
<!--    //div.info-middle {-->
<!--    //  font-size: 12px;-->
<!--    //  padding: 10px 6px;-->
<!--    //  line-height: 20px;-->
<!--    //}-->
<!--    //-->
<!--    //div.info-bottom {-->
<!--    //  height: 0px;-->
<!--    //  width: 100%;-->
<!--    //  clear: both;-->
<!--    //  text-align: center;-->
<!--    //}-->
<!--    //-->
<!--    //div.info-bottom img {-->
<!--    //  position: relative;-->
<!--    //  z-index: 104;-->
<!--    //}-->
<!--    //-->
<!--    //span {-->
<!--    //  margin-left: 5px;-->
<!--    //  font-size: 11px;-->
<!--    //}-->
<!--  }-->
<!--  //.content-window-card {-->
<!--  //  position: relative;-->
<!--  //  box-shadow: none;-->
<!--  //  bottom: 0;-->
<!--  //  left: 0;-->
<!--  //  width: auto;-->
<!--  //  padding: 0;-->
<!--  //}-->
<!--  //-->
<!--  //.content-window-card p {-->
<!--  //  height: 2rem;-->
<!--  //}-->
<!--  //-->
<!--  //.custom-info {-->
<!--  //  border: solid 1px silver;-->
<!--  //}-->
<!--  //-->
<!--  //.info-middle img {-->
<!--  //  float: left;-->
<!--  //  margin-right: 6px;-->
<!--  //}-->
<!--  .amap-marker .marker-geo,-->
<!--  .amap-marker .marker-geo.amap-marker .marker-fav-single,-->
<!--  .amap-marker .marker-marker-plan-poi,-->
<!--  .amap-marker .marker-marker-station,-->
<!--  .amap-marker .marker-normal,-->
<!--  .amap-marker .marker-place,-->
<!--  .amap-marker .marker-route,-->
<!--  .amap-marker .marker-single {-->
<!--    background: rgba(0, 0, 0, 0) url('../../assets/mark_b.png') no-repeat;-->
<!--    cursor: pointer;-->
<!--    height: 40px;-->
<!--    position: absolute;-->
<!--    width: 25px;-->
<!--  }-->

<!--  .amap-sug-result {-->
<!--    z-index: 1300;-->
<!--  }-->

<!--  .amap-marker .marker-0 {-->
<!--    background-position: -8px -138px;-->
<!--  }-->

<!--  .amap-marker .marker-1 {-->
<!--    background-position: -52px -138px;-->
<!--  }-->

<!--  .amap-marker .marker-2 {-->
<!--    background-position: -96px -138px;-->
<!--  }-->

<!--  .amap-marker .marker-3 {-->
<!--    background-position: -140px -138px;-->
<!--  }-->

<!--  .amap-marker .marker-4 {-->
<!--    background-position: -184px -138px;-->
<!--  }-->

<!--  .amap-marker .marker-5 {-->
<!--    background-position: -228px -138px;-->
<!--  }-->

<!--  .amap-marker .marker-6 {-->
<!--    background-position: -272px -138px;-->
<!--  }-->

<!--  .amap-marker .marker-7 {-->
<!--    background-position: -316px -138px;-->
<!--  }-->

<!--  .amap-marker .marker-8 {-->
<!--    background-position: -360px -138px;-->
<!--  }-->

<!--  .amap-marker .marker-9 {-->
<!--    background-position: -404px -138px;-->
<!--  }-->

<!--  .amap-marker .marker-10 {-->
<!--    background-position: -8px -182px;-->
<!--  }-->

<!--  .amap-marker .marker-11 {-->
<!--    background-position: -52px -182px;-->
<!--  }-->

<!--  .amap-marker .marker-12 {-->
<!--    background-position: -96px -182px;-->
<!--  }-->

<!--  .amap-marker .marker-13 {-->
<!--    background-position: -140px -182px;-->
<!--  }-->

<!--  .amap-marker .marker-14 {-->
<!--    background-position: -184px -182px;-->
<!--  }-->

<!--  .amap-marker .marker-15 {-->
<!--    background-position: -228px -182px;-->
<!--  }-->

<!--  .amap-marker .marker-16 {-->
<!--    background-position: -272px -182px;-->
<!--  }-->

<!--  .amap-marker .marker-17 {-->
<!--    background-position: -316px -182px;-->
<!--  }-->

<!--  .amap-marker .marker-18 {-->
<!--    background-position: -360px -182px;-->
<!--  }-->

<!--  .amap-marker .marker-19 {-->
<!--    background-position: -404px -182px;-->
<!--  }-->
<!--</style>-->
