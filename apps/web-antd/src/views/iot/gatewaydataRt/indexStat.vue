<script setup lang="ts">
import {ref} from 'vue';

import {Page, useVbenDrawer, type VbenFormProps} from '@vben/common-ui';

import {Space} from 'ant-design-vue';

import GatewayStatPage from "#/views/iot/gatewaydataRt/valueStat/index.vue";

import {useVbenVxeGrid, type VxeGridProps} from '#/adapter/vxe-table';

import {gatewaydataExportRealTime, gatewaydataListRealTime,} from '#/api/iot/gatewaydata';
import {commonDownloadExcel} from '#/utils/file/download';

import gatewaydataDrawer from './gatewaydata-drawer.vue';
import {columns, querySchema} from './data';
import type {GatewaydataVO} from "#/api/iot/gatewaydata/model";

const formOptions: VbenFormProps = {
  commonConfig: {
    labelWidth: 80,
    componentProps: {
      allowClear: true,
    },
  },
  schema: querySchema(),
  wrapperClass: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  // 处理区间选择器RangePicker时间格式 将一个字段映射为两个字段 搜索/导出会用到
  // 不需要直接删除
  // fieldMappingTime: [
  //  [
  //    'createTime',
  //    ['params[beginTime]', 'params[endTime]'],
  //    ['YYYY-MM-DD 00:00:00', 'YYYY-MM-DD 23:59:59'],
  //  ],
  // ],
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
  height: 'auto',
  keepSource: true,
  pagerConfig: {},
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues = {}) => {
        return await gatewaydataListRealTime({
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
  id: 'iot-gatewaydata-index'
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

const [GatewaydataDrawer, drawerApi] = useVbenDrawer({
  connectedComponent: gatewaydataDrawer,
});

function handleAddComandInfo(){
  const rows = tableApi.grid.getCheckboxRecords();
  const sns = rows.map((row: GatewaydataVO) => row.sn);
  if(sns.length>0){
    const  strSn = sns.join(',');
    drawerApi.setData({sn:strSn});
    drawerApi.open();
  }
}

function handleDownloadExcel() {
  commonDownloadExcel(gatewaydataExportRealTime, '网关状态数据', tableApi.formApi.form.values, {
    fieldMappingTime: formOptions.fieldMappingTime,
  });
}
</script>

<template>
  <Page :auto-content-height="true">
    <BasicTable table-title="网关状态列表">
      <template #toolbar-tools>
        <Space>
          <a-button
            v-access:code="['iot:gatewaydata:list']"
            @click="handleAddComandInfo"
          >
            批量下发指令
          </a-button>
          <a-button
            v-access:code="['iot:gatewaydata:export']"
            @click="handleDownloadExcel"
          >
            {{ $t('pages.common.export') }}
          </a-button>
        </Space>
      </template>
      <template #action="{ row }">
      </template>
    </BasicTable>
    <GatewaydataDrawer @reload="tableApi.query()" />
    <a-drawer   v-model:open="openSnInfo" width="75%" >    <GatewayStatPage  :sn="curSn"  />    </a-drawer>
  </Page>
</template>
