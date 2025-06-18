<script setup lang="ts">
import {Page, useVbenDrawer, type VbenFormProps} from '@vben/common-ui';
import {getVxePopupContainer} from '@vben/utils';

import {Popconfirm, Space} from 'ant-design-vue';

import {useVbenVxeGrid, type VxeGridProps} from '#/adapter/vxe-table';

import {
  otaupgradeTaskList,
  otaupgradeTaskRemove,
  startUpgradeTask,
  stopUpgradeTask,
} from '#/api/iot/otaupgradeTask';
import type {OtaupgradeTaskForm} from '#/api/iot/otaupgradeTask/model';

import otaupgradeTaskDrawer from './otaupgradeTask-drawer.vue';
import {columns, querySchema} from './data';

import SelDevSnPage from '#/views/iot/otaupgradeTask/selDev/index.vue';

import {ref} from "vue";


const openSnInfo = ref(false);
const curTaskId = ref();


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
        return await otaupgradeTaskList({
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
  id: 'iot-otaupgradeTask-index'
};

const [BasicTable, tableApi] = useVbenVxeGrid({
  formOptions,
  gridOptions,
});

const [OtaupgradeTaskDrawer, drawerApi] = useVbenDrawer({
  connectedComponent: otaupgradeTaskDrawer,
});

async function closeSnInfo(){
  await tableApi.query();
}

function handleAdd() {
  drawerApi.setData({});
  drawerApi.open();
}

async function handleEdit(row: Required<OtaupgradeTaskForm>) {
  const stat = row.taskstatus;
  if(stat==0){
    drawerApi.setData({ id: row.id });
    drawerApi.open();
  }else{
    if(stat==1){
      alert("已经启动不可以编辑!");
      return ;
    }else{
      alert("已经结束不可编辑!!");
      return ;
    }
  }
}

async function handleDelete(row: Required<OtaupgradeTaskForm>) {
  const stat = row.taskstatus;
  if(stat==0){
    await otaupgradeTaskRemove(row.id);
    await tableApi.query();
  }else{
    alert("已经启动不可以删除!");
    return ;
  }
}

async function runUpgradeTask(row: Required<OtaupgradeTaskForm>){
  const stat = row.taskstatus;
  if(stat==0){
    await startUpgradeTask( row.id );
  }else{
    if(stat==1){
      alert("任务正在执行!");
      return ;
    }else{
      alert("任务已经结束!");
      return ;
    }
  }
  await tableApi.query();
}
async function stopMyUpgradeTask(row: Required<OtaupgradeTaskForm>){
  const stat = row.taskstatus;
  if(stat==0||stat==1){
    alert(row.id);
    const vid = row.id ;
    await stopUpgradeTask( vid );
    await tableApi.query();
  }else{
    alert("任务已经结束!");
    return ;
  }
}
function selectUpgradeDev(row: Required<OtaupgradeTaskForm>){
  const stat = row.taskstatus;
  if(stat==0){
    curTaskId.value = row.id ;
    openSnInfo.value = true;
  }else{
    if(stat==1){
      alert("任务正在执行!");
      return ;
    }else{
      alert("任务已经结束!");
      return ;
    }
  }

}


</script>

<template>
  <Page :auto-content-height="true">
    <BasicTable table-title="升级任务列表">
      <template #toolbar-tools>
        <Space> <a-button  type="primary"  v-access:code="['iot:otaupgradeTask:add']"  @click="handleAdd" > {{ $t('pages.common.add') }}</a-button> </Space>
      </template>
      <template #action="{ row }">
        <Space>
          <ghost-button @click.stop="runUpgradeTask(row)" >任务启动</ghost-button>
          <ghost-button v-access:code="['iot:otaupgradeTask:edit']" @click.stop="handleEdit(row)" > {{ $t('pages.common.edit') }}</ghost-button>
          <Popconfirm :get-popup-container="getVxePopupContainer" placement="left"  title="确认删除？" @confirm="handleDelete(row)" >
            <ghost-button danger v-access:code="['iot:otaupgradeTask:remove']" @click.stop="" >{{ $t('pages.common.delete') }}</ghost-button>
          </Popconfirm>
          <ghost-button @click.stop="stopMyUpgradeTask(row)" >中断任务</ghost-button>
          <ghost-button @click.stop="selectUpgradeDev(row)" >升级设备</ghost-button>
        </Space>
      </template>
    </BasicTable>
    <OtaupgradeTaskDrawer @reload="tableApi.query()" />
    <a-drawer v-model:open="openSnInfo" width="75%" @close="closeSnInfo">
      <SelDevSnPage :taskId="curTaskId" />
    </a-drawer>
  </Page>
</template>
