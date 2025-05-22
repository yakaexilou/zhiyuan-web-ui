<script setup lang="ts">
import {Page, useVbenDrawer, type VbenFormProps} from '@vben/common-ui';

import {Space} from 'ant-design-vue';

import {useVbenVxeGrid, type VxeGridProps} from '#/adapter/vxe-table';

import {cmddevinfoExportLs, cmddevinfoListLs,} from '#/api/iot/cmddevinfo';
import {commonDownloadExcel} from '#/utils/file/download';

import cmddevinfoDrawer from './cmddevinfo-drawer.vue';
import {columns, querySchema} from './dataLs';

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
        return await cmddevinfoListLs({
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
  id: 'iot-cmddevinfo-index'
};

const [BasicTable, tableApi] = useVbenVxeGrid({
  formOptions,
  gridOptions,
});

const [CmddevinfoDrawer] = useVbenDrawer({
  connectedComponent: cmddevinfoDrawer,
});


function handleDownloadExcel() {
  commonDownloadExcel(cmddevinfoExportLs, '指令信息数据', tableApi.formApi.form.values, {
    fieldMappingTime: formOptions.fieldMappingTime,
  });
}
</script>

<template>
  <Page :auto-content-height="true">
    <BasicTable table-title="历史指令信息">
      <template #toolbar-tools>
        <Space>
          <a-button v-access:code="['iot:cmddevinfo:export']"  @click="handleDownloadExcel" > {{ $t('pages.common.export') }} </a-button>
        </Space>
      </template>
      <template >
      </template>
    </BasicTable>
    <CmddevinfoDrawer @reload="tableApi.query()" />
  </Page>
</template>
