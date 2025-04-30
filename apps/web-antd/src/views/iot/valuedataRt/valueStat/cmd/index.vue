<script setup lang="ts">
import {Page, type VbenFormProps} from '@vben/common-ui';

import {useVbenVxeGrid, type VxeGridProps} from '#/adapter/vxe-table';

import {cmddevinfoList,} from '#/api/iot/cmddevinfo';
import {columns} from './data';
import {defineProps, ref, watch} from "vue";

const props = defineProps({
  sn: {
    type: String,
    default: '',
  }
})

watch(() => props.sn, (val) => {
  tableApi.query( {"sn" : val } );
})

const formOptions: VbenFormProps = {
  commonConfig: {
    labelWidth: 80,
    componentProps: {
      allowClear: true,
    },
  },
  wrapperClass: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
};

const gridOptions: VxeGridProps = {
  checkboxConfig: {
    highlight: true,
    reserve: true,
  },
  columns,
  height: 'auto',
  keepSource: true,
  pagerConfig: {},
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues = {}) => {
        return await cmddevinfoList({
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
  id: 'iot-cmddevinfo-index'
};

const [BasicTable, tableApi] = useVbenVxeGrid({
  formOptions,
  gridOptions,
});

// :contentHeight="calc('100vh - 200px')"
</script>
<template>
  <Page :auto-content-height="true" class="custom-page">
    <BasicTable table-title="指令信息列表" class="custom-page">
      <template #action="{ row }"> </template>
    </BasicTable>
  </Page>
</template>
<style lang="scss" scoped>
.custom-page {
  height: calc(100vh - 300px);
}
</style>
