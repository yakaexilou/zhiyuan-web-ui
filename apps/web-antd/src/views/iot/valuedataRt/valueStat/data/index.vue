<script setup lang="ts">
import {Page, type VbenFormProps} from '@vben/common-ui';

import {useVbenVxeGrid, type VxeGridProps} from '#/adapter/vxe-table';

import {valvedataList,} from '#/api/iot/valvedata';
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
