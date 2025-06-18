<script setup lang="ts">
import {Page, useVbenDrawer, type VbenFormProps} from '@vben/common-ui';
import {getVxePopupContainer} from '@vben/utils';

import {Modal, Popconfirm, Space} from 'ant-design-vue';

import {useVbenVxeGrid, vxeCheckboxChecked, type VxeGridProps} from '#/adapter/vxe-table';

import {otaupgradeFileList, otaupgradeFileRemove,} from '#/api/iot/otaupgradeFile';
import type {OtaupgradeFileForm} from '#/api/iot/otaupgradeFile/model';

import otaupgradeFileDrawer from './otaupgradeFile-drawer.vue';
import {columns, querySchema} from './data';

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
        return await otaupgradeFileList({
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
  id: 'iot-otaupgradeFile-index'
};

const [BasicTable, tableApi] = useVbenVxeGrid({
  formOptions,
  gridOptions,
});

const [OtaupgradeFileDrawer, drawerApi] = useVbenDrawer({
  connectedComponent: otaupgradeFileDrawer,
});

function handleAdd() {
  drawerApi.setData({});
  drawerApi.open();
}

async function handleDelete(row: Required<OtaupgradeFileForm>) {
  await otaupgradeFileRemove(row.id);
  await tableApi.query();
}

function handleMultiDelete() {
  const rows = tableApi.grid.getCheckboxRecords();
  const ids = rows.map((row: Required<OtaupgradeFileForm>) => row.id);
  Modal.confirm({
    title: '提示',
    okType: 'danger',
    content: `确认删除选中的${ids.length}条记录吗？`,
    onOk: async () => {
      await otaupgradeFileRemove(ids);
      await tableApi.query();
    },
  });
}


</script>

<template>
  <Page :auto-content-height="true">
    <BasicTable table-title="升级文件列表">
      <template #toolbar-tools>
        <Space>
          <a-button
            :disabled="!vxeCheckboxChecked(tableApi)"
            danger
            type="primary"
            v-access:code="['iot:otaupgradeFile:remove']"
            @click="handleMultiDelete">
            {{ $t('pages.common.delete') }}
          </a-button>
          <a-button
            type="primary"
            v-access:code="['iot:otaupgradeFile:add']"
            @click="handleAdd"
          >
            {{ $t('pages.common.add') }}
          </a-button>
        </Space>
      </template>
      <template #action="{ row }">
        <Space>
          <Popconfirm
            :get-popup-container="getVxePopupContainer"
            placement="left"
            title="确认删除？"
            @confirm="handleDelete(row)"
          >
            <ghost-button
              danger
              v-access:code="['iot:otaupgradeFile:remove']"
              @click.stop=""
            >
              {{ $t('pages.common.delete') }}
            </ghost-button>
          </Popconfirm>
        </Space>
      </template>
    </BasicTable>
    <OtaupgradeFileDrawer @reload="tableApi.query()" />
  </Page>
</template>
