<script setup lang="ts">
import {Page, type VbenFormProps} from '@vben/common-ui';

import {useVbenVxeGrid, type VxeGridProps} from '#/adapter/vxe-table';

import {valvedataList,} from '#/api/iot/valvedata';
import {columns,columns1,columns2,columns3,columns4,columns5, querySchema} from './data';
import {defineProps, watch} from "vue";

const props = defineProps({
  sn: {
    type: String,
    default: '',
  }
})
var devType = -1;

function setDevType( sn: String ){
  if(sn==null||sn=="")devType = -1 ;
  if(sn.length>10){
    let tt = sn.substring(8,10);
    if(tt=="01")devType=1;
    if(tt=="02")devType=2;
    if(tt=="03")devType=3;
    if(tt=="04")devType=4;
    if(tt=="05")devType=5;
  }else{
    devType=-1;
  }

}

function getColumns(){
  if(devType==-1){
    setDevType( props.sn );
  }
  if(devType==-1)return columns;
  if(devType==1)return columns1;
  if(devType==2)return columns2;
  if(devType==3)return columns3;
  if(devType==4)return columns4;
  if(devType==5)return columns5;
}

const formOptions: VbenFormProps = {
  commonConfig: {
    labelWidth: 80,
    componentProps: {
      allowClear: true,
    },
  },
  schema: querySchema(),
  wrapperClass: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
};

const gridOptions: VxeGridProps = {
  checkboxConfig: {
    highlight: true,
    reserve: true,
  },
  columns: getColumns() ,
  height: 'auto',
  keepSource: true,
  pagerConfig: {},
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues = {}) => {
        return await valvedataList({
          pageNum: page.currentPage,
          pageSize: page.pageSize,
          sn:props.sn,
          ...formValues,
        });
      },
    },
  },
  rowConfig: {
    keyField: 'id',
  },
  // 表格全局唯一表示 保存列配置需要用到
  id: 'iot-valvedata-index'
};

const [BasicTable, tableApi] = useVbenVxeGrid({
  formOptions,
  gridOptions,
});

watch(() => props.sn, (val) => {
  tableApi.query( {"sn" : val } );
  setDevType( val );
  gridOptions.columns=getColumns()
  tableApi.setGridOptions(gridOptions)
});
</script>
<template>
  <Page :auto-content-height="true" class="custom-page">
    <BasicTable table-title="阀门上报数据列表"  class="custom-page">
      <template #action="{ row }" :scroll="{ y: 'calc(100vh - 180px)' }">
      </template>
    </BasicTable>
  </Page>
</template>
<style lang="scss" scoped>
.custom-page {
  height: calc(100vh - 300px);
}
</style>
