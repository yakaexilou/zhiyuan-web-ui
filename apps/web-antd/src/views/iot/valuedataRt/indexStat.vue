<script setup lang="ts">
import type { VbenFormProps } from '@vben/common-ui';

import type { VxeGridProps } from '#/adapter/vxe-table';
import type { ValvedataVO } from '#/api/iot/valvedata/model';

import { ref } from 'vue';

import { Page, useVbenDrawer } from '@vben/common-ui';

import { Space } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { valvedataListRealTime } from '#/api/iot/valvedata';
import ValueStatPage from '#/views/iot/valuedataRt/valueStat/index.vue';

import {
  columns,
  columns1,
  columns2,
  columns3,
  columns4,
  columns5,
  querySchemaRealTime,
} from './dataStat';
import DevTypeTree from './devType-tree.vue';
import valvedataDrawer from './valvedata-drawer.vue';

const selectDevTypeId = ref<number[]>([]);

let devType = 3;

function getColumns() {
  if (devType == 0) return columns;
  if (devType == 1) return columns1;
  if (devType == 2) return columns2;
  if (devType == 3) return columns3;
  if (devType == 4) return columns4;
  if (devType == 5) return columns5;
}

function setColumns(selDevType: number) {
  devType = selDevType;
  gridOptions.columns = getColumns();
  tableApi.setGridOptions(gridOptions);
}

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
        if (selectDevTypeId.value.length === 1) {
          setColumns(selectDevTypeId.value[0]);
        }
        return await valvedataListRealTime({
          pageNum: page.currentPage,
          pageSize: page.pageSize,
          devType,
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

const curSn = ref();
const curDevType = ref();

const openSnInfo = ref(false);
const clickSnDisInfo = (sn: string) => {
  if (sn != null && sn.length > 0) {
    curSn.value = sn;
    curDevType.value = devType;
    openSnInfo.value = true;
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

function handleAddComandInfo() {
  const rows = tableApi.grid.getCheckboxRecords();
  const sns = rows.map((row: ValvedataVO) => row.sn);
  if (sns.length > 0) {
    const strSn = sns.join(',');
    const dv = { sn: strSn, devType };
    drawerApi.setData(dv);
    drawerApi.open();
  }
}
</script>

<template>
  <Page :auto-content-height="true" content-class="flex gap-[8px] w-full">
    <DevTypeTree
      v-model:select-dev-type-id="selectDevTypeId"
      class="w-[260px]"
      @reload="() => tableApi.reload()"
      @select="() => tableApi.reload()"
    />
    <BasicTable table-title="设备上报数据列表" class="w-full">
      <template #toolbar-tools>
        <Space>
          <a-button
            v-access:code="['iot:valvedata:list']"
            @click="handleAddComandInfo"
          >
            批量下发指令
          </a-button>
        </Space>
      </template>
      <template #action="{ row }"></template>
    </BasicTable>
    <ValvedataDrawer @reload="tableApi.query()" />
    <a-drawer v-model:open="openSnInfo" width="75%">
      <ValueStatPage :sn="curSn" :dev-type="curDevType" />
    </a-drawer>
  </Page>
</template>
