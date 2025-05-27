<script setup lang="ts">
import {Page, useVbenDrawer, type VbenFormProps} from '@vben/common-ui';

import {Space} from 'ant-design-vue';

import {useVbenVxeGrid, type VxeGridProps} from '#/adapter/vxe-table';

import {valvedataExport, valvedataListOrGw} from '#/api/iot/valvedata';

import valvedataDrawer from './valvedata-drawer.vue';
import {  columns,  columns1,  columns2,  columns3,  columns4,  columns5,  columns6,  querySchema} from './data';

import {ref} from "vue";
import DevTypeTree from "../valuedataRt/devType-tree.vue";
import {gatewaydataList} from "#/api/iot/gatewaydata";
import {commonDownloadExcel} from "#/utils/file/download";

const selectDevTypeId = ref<number[]>([]);

let devType = 3;

function getColumns(){
  if(devType==-1)return columns;
  if(devType==1)return columns1;
  if(devType==2)return columns2;
  if(devType==3)return columns3;
  if(devType==4)return columns4;
  if(devType==5)return columns5;
  if(devType==6)return columns6;
}

function setColumns( selDevType: number){
  devType = selDevType;
  gridOptions.columns=getColumns()
  tableApi.setGridOptions(gridOptions)
  tableApi.formApi.form.setFieldValue("devType", devType );
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
  columns: getColumns(),
  height: 'auto',
  keepSource: true,
  pagerConfig: {},
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues = {}) => {
        if (selectDevTypeId.value.length === 1) {
          setColumns( selectDevTypeId.value[0] );
          devType = selectDevTypeId.value[0];
        }
        if(devType==6){
          return await valvedataListOrGw({
            pageNum: page.currentPage,
            pageSize: page.pageSize,
            devType:devType,
            ...formValues,
          });
        }else{
          return await valvedataListOrGw({
            pageNum: page.currentPage,
            pageSize: page.pageSize,
            devType:devType,
            ...formValues,
          });
        }

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

const [ValvedataDrawer, drawerApi] = useVbenDrawer({
  connectedComponent: valvedataDrawer,
});

function handleDownloadExcel() {
  //tableApi.formApi.form.setFieldValue("devType", devType );
  //var params = {devType:devType};
  commonDownloadExcel(valvedataExport, '设备上报数据导出', tableApi.formApi.form.values, {fieldMappingTime: formOptions.fieldMappingTime,});

}

</script>

<template>
  <Page :auto-content-height="true" content-class="flex gap-[8px] w-full">
    <DevTypeTree
      v-model:select-dev-type-id="selectDevTypeId"
      class="w-[260px]"
      @reload="() => tableApi.reload()"
      @select="() => tableApi.reload()"
    />
    <BasicTable table-title="设备上报数据列表">
      <template #toolbar-tools>
        <Space><a-button v-access:code="['iot:valvedata:export']"  @click="handleDownloadExcel" > {{ $t('pages.common.export') }} </a-button></Space>
      </template>
      <template #action="{ row }">
        <Space></Space>
      </template>
    </BasicTable>
    <ValvedataDrawer @reload="tableApi.query()" />
  </Page>
</template>
