let Locator = {};
let flag = false;
Locator.vm = {};
Locator.map = null;
Locator.geocoder = null;
Locator.selectedMarker = null;

Locator.initMap = function (vm) {
  Locator.vm = vm;
  Locator.initData();
};

Locator.initData = function () {
  /* eslint-disable no-undef */
  Locator.map = new AMap.Map('locator_map_container', {
    resizeEnable: true,
    // mapStyle: 'amap://styles/grey' // 样式URL
  });
  Locator.geocoder = new AMap.Geocoder();

  Locator.map.on('click', function (map) {
    Locator.selectLocation(map.lnglat.lng, map.lnglat.lat);
  });

  if (
    Locator.vm.defaultLocation !== null &&
    Locator.vm.defaultLocation !== undefined &&
    Locator.vm.defaultLocation.length !== 0
  ) {
    Locator.selectLocation(Locator.vm.defaultLocation[0], Locator.vm.defaultLocation[1]);
    Locator.map.setCenter(Locator.vm.defaultLocation);
    Locator.map.setZoom(18);
  } else {
    Locator.map.setCenter(Locator.vm.defaultCenter);
    Locator.map.setZoom(10);
  }
  let autoOptions = {
    input: 'tipinput',
  };
  let auto = new AMap.Autocomplete(autoOptions);
  let placeSearch = new AMap.PlaceSearch({});
  // 构造地点查询类
  AMap.event.addListener(auto, 'select', select); // 注册监听，当选中某条记录时会触发
  function select(e) {
    placeSearch.setCity(e.poi.adcode);
    placeSearch.search(e.poi.name, Locator.onSearchResult); // 关键字查询查询
  }
};

Locator.selectLocation = function (lng, lat) {
  Locator.vm.selectedLocation = [lng, lat];
  // 初始化的时候，将标记锁定
  if (Locator.selectedMarker === null) {
    flag = false;
    Locator.selectedMarker = new AMap.Marker({
      position: new AMap.LngLat(lng, lat),
      content: '<div class="marker-poi marker marker-normal marker-select"></div>',
      zIndex: 200,
      map: Locator.map,
    });
  } else {
    // 点击的时候放开标记
    Locator.selectedMarker.setPosition([lng, lat]);
    flag = true;
  }
  Locator.lookupAddress(Locator.vm.selectedLocation);
};

Locator.onSearchResult = function (status, result) {
  if (status !== 'complete') {
    return;
  }
  let pois = result.poiList.pois;
  for (let index in Locator.vm.mapSearchResults) {
    Locator.vm.mapSearchResults[index].setMap(null);
  }
  Locator.vm.mapSearchResults = [];
  if (pois.length > 0) {
    pois.forEach((poi, index) => {
      let marker = Locator.createPoiMarker(poi, index);
      Locator.vm.mapSearchResults.push(marker);
    });
    Locator.map.setFitView();
  }
};

Locator.createPoiMarker = function (poi, index) {
  let marker = new AMap.Marker({
    position: new AMap.LngLat(poi.location.lng, poi.location.lat),
    address: poi.address,
    content: '<div class="marker-poi marker marker-normal marker-' + index + '"></div>',
    zIndex: 150,
    title: poi.name,
    map: Locator.map,
  });
  marker.on('click', function () {
    Locator.selectLocation(poi.location.lng, poi.location.lat);
  });
  return marker;
};

Locator.lookupAddress = function (location) {
  if (!Locator.geocoder) {
    return;
  }
  Locator.geocoder.getAddress(location, (status, result) => {
    if (status === 'complete' && result.info === 'OK') {
      Locator.vm.$nextTick(() => {
        // 返回地址描述
        Locator.vm.selectedAddress.addrAlias = result.regeocode.formattedAddress;
        let addressComponent = result.regeocode.addressComponent;
        Locator.vm.selectedAddress.addrProvince = addressComponent.province;
        Locator.vm.selectedAddress.addrCity = addressComponent.city;
        Locator.vm.selectedAddress.addrCityCode = addressComponent.cityCode;
        Locator.vm.selectedAddress.addrDistrict = addressComponent.district;
        Locator.vm.selectedAddress.addrAdCode = addressComponent.adcode;
        Locator.vm.selectedAddress.addrTownship = addressComponent.township;
        Locator.vm.selectedAddress.addrStreet = addressComponent.street;
        Locator.vm.selectedAddress.addrStreetNumber = addressComponent.streetNumber;
        Locator.vm.selectedAddress.addrNeighborhood = addressComponent.neighborhood;
        Locator.vm.selectedAddress.addrNeighborhoodType = addressComponent.neighborhoodType;
        Locator.vm.selectedAddress.addrBuilding = addressComponent.building;
        Locator.vm.selectedAddress.addrBuildingType = addressComponent.buildingType;

        // 当前传递code值
        let code = '';
        // 使用传递
        if (Locator.vm.cityCode.length !== 0) {
          code = Locator.vm.cityCode.at(-1);
        } else if (flag && Locator.vm.cityCode.length === 0) {
          code = addressComponent.adcode;
        } else if (Locator.vm._props.selectedCode) {
          code = Locator.vm._props.selectedCode;
        }
        let address = '';
        if (Locator.vm.detailAddress) {
          address = Locator.vm.detailAddress;
        } else if (flag && !Locator.vm.detailAddress) {
          address = result.regeocode.formattedAddress;
        } else if (Locator.vm._props.address) {
          address = Locator.vm._props.address;
        }
        // 数据整理完毕
        Locator.vm.finish(code, address);
      });
    }
  });
};
// 销毁地图
Locator.destroyMap = function () {
  Locator.map && Locator.map.destroy();
  Locator.map = null;
  Locator.geocoder = null;
  Locator.selectedMarker = null;
  Locator.vm = {};
  flag = false;
};

export default Locator;
