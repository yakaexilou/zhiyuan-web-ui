<script setup lang="ts">
import {Page, useVbenDrawer, type VbenFormProps} from '@vben/common-ui';

import { Space} from 'ant-design-vue';

import {useVbenVxeGrid, type VxeGridProps} from '#/adapter/vxe-table';

import {
  valvedataExportRealTime,
  valvedataListRealTime,
} from '#/api/iot/valvedata';
import {commonDownloadExcel} from '#/utils/file/download';

import valvedataDrawer from './valvedata-drawer.vue';
import {columns, querySchemaRealTime} from './dataStat';

import type {ValvedataVO} from "#/api/iot/valvedata/model";

import ValueStatPage from "#/views/iot/valuedataRt/valueStat/index.vue";


import {ref} from "vue";

const formOptions: VbenFormProps = {
  commonConfig: {
    labelWidth: 80,
    componentProps: {
      allowClear: true,
    },
  },
  schema: querySchemaRealTime(),
  wrapperClass: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
};

const gridOptions: VxeGridProps = {
  checkboxConfig: {
    // 高亮
    highlight: true,
    // 翻页时保留选中状态
    reserve: true,
    // 点击行选中
    // trigger: 'row',
  },
  // 需要使用i18n注意这里要改成getter形式 否则切换语言不会刷新
  // columns: columns(),
  columns,
  width:'auto',
  height: 'auto',
  keepSource: true,
  pagerConfig: {},
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues = {}) => {
        return await valvedataListRealTime({
          pageNum: page.currentPage,
          pageSize: page.pageSize,
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

const curSn=ref()
const openSnInfo=ref(false)
const clickSnDisInfo = (sn:string) => {
  if(sn!=null&&sn.length>0){
    curSn.value = sn ;
    openSnInfo.value=true ;
  }
};

const [BasicTable, tableApi] = useVbenVxeGrid({
  formOptions,
  gridOptions,
  gridEvents: {
    cellClick: (e) => {
      const { row } = e;
      clickSnDisInfo(row.sn);
    },

  },
});

const [ValvedataDrawer, drawerApi] = useVbenDrawer({
  connectedComponent: valvedataDrawer,
});

function handleAddComandInfo(){
  const rows = tableApi.grid.getCheckboxRecords();
  const sns = rows.map((row: ValvedataVO) => row.sn);
  if(sns.length!=0){
    const  strSn = sns.join(',');
    drawerApi.setData({sn:strSn});
    drawerApi.open();
  }
}

function handleDownloadExcel() {
  commonDownloadExcel(valvedataExportRealTime, '阀门上报数据数据', tableApi.formApi.form.values, {
    fieldMappingTime: formOptions.fieldMappingTime,
  });
}


</script>

<template>
  <Page :auto-content-height="true">
    <BasicTable table-title="阀门上报数据列表">
      <template #toolbar-tools>
        <Space>
          <a-button
            v-access:code="['iot:valvedata:list']"
            @click="handleAddComandInfo"
          >
            批量下发指令
          </a-button>
          <a-button
            v-access:code="['iot:valvedata:export']"
            @click="handleDownloadExcel"
          >
            {{ $t('pages.common.export') }}
          </a-button>
        </Space>
      </template>
      <template #action="{ row }"></template>
    </BasicTable>
    <ValvedataDrawer @reload="tableApi.query()" />
    <a-drawer   v-model:open="openSnInfo" width="75%" >    <ValueStatPage  :sn="curSn"  />    </a-drawer>
  </Page>
</template>
