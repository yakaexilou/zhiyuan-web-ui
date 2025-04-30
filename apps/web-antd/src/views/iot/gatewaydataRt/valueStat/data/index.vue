<script setup lang="ts">
import {Page, useVbenDrawer, type VbenFormProps} from '@vben/common-ui';

import {Modal, Space} from 'ant-design-vue';

import {useVbenVxeGrid, vxeCheckboxChecked, type VxeGridProps} from '#/adapter/vxe-table';

import {gatewaydataExport, gatewaydataList, gatewaydataRemove,} from '#/api/iot/gatewaydata';
import type {GatewaydataForm} from '#/api/iot/gatewaydata/model';
import {commonDownloadExcel} from '#/utils/file/download';

import gatewaydataDrawer from './gatewaydata-drawer.vue';
import {columns, querySchema} from './data';
import {defineProps, watch} from "vue";

const props = defineProps({
  sn: {
    type: String,
    default: '',
  }
})

watch(() => props.sn, (val) => {
  tableApi.query( {"sn" : val } );
});

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
        return await gatewaydataList({
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
  id: 'iot-gatewaydata-index'
};

const [BasicTable, tableApi] = useVbenVxeGrid({
  formOptions,
  gridOptions,
});

const [GatewaydataDrawer, drawerApi] = useVbenDrawer({
  connectedComponent: gatewaydataDrawer,
});

</script>

<template>
  <Page :auto-content-height="true" class="custom-page">
    <BasicTable table-title="网关历史数据列表" class="custom-page">
      <template #toolbar-tools>
      </template>
      <template #action="{ row }">
      </template>
    </BasicTable>
    <GatewaydataDrawer @reload="tableApi.query()" />
  </Page>
</template>
<style lang="scss" scoped>
.custom-page {
  height: calc(100vh - 300px);
}
</style>
