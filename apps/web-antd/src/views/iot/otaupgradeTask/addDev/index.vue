<script setup lang="ts">
import {Page, type VbenFormProps} from '@vben/common-ui';

import {useVbenVxeGrid, type VxeGridProps} from '#/adapter/vxe-table';

import {deviceListByAdd,} from '#/api/iot/device';
import type {DeviceVO} from '#/api/iot/device/model';
import {columns, querySchema} from './data';
import {defineProps, watch} from "vue";
import type {OtaupgradeTaskForm} from "#/api/iot/otaupgradeTask/model";
import {otaupgradeTaskSaveSns} from "#/api/iot/otaupgradeTask";


const props = defineProps({
  taskId: {
    type: String,
    default: '',
  }
});

watch(
  () => props.taskId,
  (val) => {
    tableApi.query({ taskId: val });
  },
);



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
  columns,
  height: 'auto',
  keepSource: true,
  pagerConfig: {},
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues = {}) => {
        return await deviceListByAdd({
          pageNum: page.currentPage,
          pageSize: page.pageSize,
          taskId:props.taskId,
          ...formValues,
        });
      },
    },
  },
  rowConfig: {
    keyField: 'id',
  },
  // 表格全局唯一表示 保存列配置需要用到
  id: 'iot-device-index'
};

const [BasicTable, tableApi] = useVbenVxeGrid({
  formOptions,
  gridOptions,
});


async function saveSelDevSn( ){
  const rows = tableApi.grid.getCheckboxRecords();
  const sns = rows.map((row: DeviceVO) => row.code);
  let strSn = "";
  if (sns.length > 0) {
    strSn = sns.join(',');
    await otaupgradeTaskSaveSns( { "sns":strSn,"id":props.taskId });
  }
  await tableApi.query();
}
</script>

<template>
  <Page :auto-content-height="true">
    <BasicTable table-title="设备信息列表">
      <template #toolbar-tools>
        <ghost-button  @click="saveSelDevSn( )" >新增升级设备</ghost-button>
      </template>
      <template #action="{ row }">
      </template>
    </BasicTable>
  </Page>
</template>
