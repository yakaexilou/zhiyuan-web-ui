<script setup lang="ts">
import {ref} from 'vue';

import {Page, useVbenDrawer, type VbenFormProps} from '@vben/common-ui';
import {getVxePopupContainer} from '@vben/utils';

import {Modal, Popconfirm, Space} from 'ant-design-vue';

import {useVbenVxeGrid, vxeCheckboxChecked, type VxeGridProps,} from '#/adapter/vxe-table';

import {
  driverAttributeExport,
  driverAttributeList,
  driverAttributeRemove,
} from '#/api/iot/driverAttribute';
import type {DriverAttributeForm} from '#/api/iot/driverAttribute/model';
import {commonDownloadExcel} from '#/utils/file/download';

import driverAttributeDrawer from './driverAttribute-drawer.vue';
import {columns, querySchema} from './data';
import {emitt} from "#/views/iot/driver/mitt";

const driverId = ref('');

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
        return await driverAttributeList({
          pageNum: page.currentPage,
          pageSize: page.pageSize,
          driverId:driverId.value,
          ...formValues,
        });
      },
    },
  },
  rowConfig: {
    keyField: 'id',
  },
  // 表格全局唯一表示 保存列配置需要用到
  id: 'iot-driverAttribute-index'
};

const [BasicTable, tableApi] = useVbenVxeGrid({
  formOptions,
  gridOptions,
});

const [DriverAttributeDrawer, drawerApi] = useVbenDrawer({
  connectedComponent: driverAttributeDrawer,
});

function handleAdd() {
  console.log(" add driver id : "+driverId.value);
  drawerApi.setData({ driverId:driverId.value});
  drawerApi.open();
}

async function handleEdit(row: Required<DriverAttributeForm>) {
  //drawerApi.setData({ id: row.id });
  drawerApi.setData({ id: row.id});
  console.log( row );
  drawerApi.open();
}

async function handleDelete(row: Required<DriverAttributeForm>) {
  await driverAttributeRemove(row.id);
  await tableApi.query({ driverId:driverId.value});
}

function handleMultiDelete() {
  const rows = tableApi.grid.getCheckboxRecords();
  const ids = rows.map((row: Required<DriverAttributeForm>) => row.id);
  Modal.confirm({
    title: '提示',
    okType: 'danger',
    content: `确认删除选中的${ids.length}条记录吗？`,
    onOk: async () => {
      await driverAttributeRemove(ids);
      await tableApi.query({ driverId:driverId.value});
    },
  });
}

function handleDownloadExcel() {
  commonDownloadExcel(driverAttributeExport, '驱动属性数据', tableApi.formApi.form.values, {
    fieldMappingTime: formOptions.fieldMappingTime,
  });
}
emitt.on('rowClick', async (value) => {
  driverId.value = value;
  await tableApi.query( {driverId : driverId.value } );
});
</script>

<template>
    <BasicTable table-title="驱动属性列表">
      <template #toolbar-tools>
        <Space>
          <a-button
            v-access:code="['iot:driverAttribute:export']"
            @click="handleDownloadExcel"
          >
            {{ $t('pages.common.export') }}
          </a-button>
          <a-button
            :disabled="!vxeCheckboxChecked(tableApi)"
            danger
            type="primary"
            v-access:code="['iot:driverAttribute:remove']"
            @click="handleMultiDelete">
            {{ $t('pages.common.delete') }}
          </a-button>
          <a-button
            type="primary"
            v-access:code="['iot:driverAttribute:add']"
            @click="handleAdd"
          >
            {{ $t('pages.common.add') }}
          </a-button>
        </Space>
      </template>
      <template #action="{ row }">
        <Space>
          <ghost-button
            v-access:code="['iot:driverAttribute:edit']"
            @click.stop="handleEdit(row)"
          >
            {{ $t('pages.common.edit') }}
          </ghost-button>
          <Popconfirm
            :get-popup-container="getVxePopupContainer"
            placement="left"
            title="确认删除？"
            @confirm="handleDelete(row)"
          >
            <ghost-button
              danger
              v-access:code="['iot:driverAttribute:remove']"
              @click.stop=""
            >
              {{ $t('pages.common.delete') }}
            </ghost-button>
          </Popconfirm>
        </Space>
      </template>
    </BasicTable>
    <DriverAttributeDrawer @reload="tableApi.query()" />
</template>
