<script setup lang="ts">
import {Page, type VbenFormProps} from '@vben/common-ui';

import {Space} from 'ant-design-vue';

import {useVbenVxeGrid, type VxeGridProps} from '#/adapter/vxe-table';

import {deviceListByTask,} from '#/api/iot/device';
import type {DeviceVO} from '#/api/iot/device/model';
import {columns, querySchema} from './data';
import {defineProps, ref, watch} from "vue";

import SelDevSnPage from '#/views/iot/otaupgradeTask/addDev/index.vue';
import {otaupgradeTaskDelSns} from "#/api/iot/otaupgradeTask";


const openSnInfo = ref(false);
const curTaskId = ref();


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

async function closeSnInfo(){
  await tableApi.query();
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
  columns,
  height: 'auto',
  keepSource: true,
  pagerConfig: {},
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues = {}) => {
        return await deviceListByTask({
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


function addSelDevSn( ){
  curTaskId.value = props.taskId ;
  openSnInfo.value = true;
}



async function cancerUpgradeDevice(row){
  let sn = row.code ;
  await otaupgradeTaskDelSns({ "sns":sn,"id":props.taskId });
  await tableApi.query();
}

async function deleteSelDevSn( ){
  const rows = tableApi.grid.getCheckboxRecords();
  const sns = rows.map((row: DeviceVO) => row.code);
  let strSn = "";
  if (sns.length > 0) {
    strSn = sns.join(',');
    await otaupgradeTaskDelSns( { "sns":strSn,"id":props.taskId });
  }
  await tableApi.query();
}

</script>

<template>
  <Page :auto-content-height="true">
    <BasicTable table-title="升级设备信息列表">
      <template #toolbar-tools>
        <Space>
        <ghost-button @click.stop="addSelDevSn( )" >新增升级设备</ghost-button>
        <ghost-button  @click="deleteSelDevSn( )" >删除升级设备</ghost-button>
          </Space>
      </template>
      <template #action="{ row }">
        <Space>
          <ghost-button @click.stop="cancerUpgradeDevice(row)" >删除升级</ghost-button>
        </Space>
      </template>
    </BasicTable>
    <a-drawer v-model:open="openSnInfo" width="75%" @close="closeSnInfo"  >
      <SelDevSnPage :taskId="curTaskId" />
    </a-drawer>
  </Page>
</template>
