<script setup lang="ts">
import type { VbenFormProps } from '@vben/common-ui';

import type { VxeGridProps } from '#/adapter/vxe-table';

import { defineProps, watch } from 'vue';

import { Page } from '@vben/common-ui';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { valvedataListOrGw } from '#/api/iot/valvedata';

import {
  columns,
  columns1,
  columns2,
  columns3,
  columns4,
  columns5,
} from '../../../valvedata/data';
import { querySchema } from './data';

const props = defineProps({
  sn: {
    type: String,
    default: '',
  },
  devType: {
    type: String,
    default: '',
  },
});

let iDevType = 0;

function getColumns() {
  iDevType = Number.parseInt(props.devType);
  if (iDevType == 0) return columns;
  if (iDevType == 1) return columns1;
  if (iDevType == 2) return columns2;
  if (iDevType == 3) return columns3;
  if (iDevType == 4) return columns4;
  if (iDevType == 5) return columns5;
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
        return await valvedataListOrGw({
          pageNum: page.currentPage,
          pageSize: page.pageSize,
          sn: props.sn,
          devType: iDevType,
          ...formValues,
        });
      },
    },
  },
  rowConfig: {
    keyField: 'id',
  },
  // 表格全局唯一表示 保存列配置需要用到
  id: 'iot-valvedata-index',
};

const [BasicTable, tableApi] = useVbenVxeGrid({
  formOptions,
  gridOptions,
});

watch([() => props.sn, () => props.devType], ([sn, dt]) => {
  iDevType = Number.parseInt(dt);
  gridOptions.columns = getColumns();
  tableApi.setGridOptions(gridOptions);
  tableApi.query({ sn, devType: iDevType });
});
</script>
<template>
  <Page :auto-content-height="true" class="custom-page">
    <BasicTable table-title="上报数据列表" class="custom-page">
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
