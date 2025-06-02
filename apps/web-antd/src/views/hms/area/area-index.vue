<script setup lang="ts">
import type { VbenFormProps } from '@vben/common-ui';

//
import type { VxeGridProps } from '#/adapter/vxe-table';
import type { AreaForm } from '#/api/hms/area/model';

import { computed, ref, watch } from 'vue';

import { useVbenDrawer } from '@vben/common-ui';
import { $t } from '@vben/locales';
import { getVxePopupContainer } from '@vben/utils';

import { Modal, Popconfirm, Space } from 'ant-design-vue';

import { useVbenVxeGrid, vxeCheckboxChecked } from '#/adapter/vxe-table';
import { areaExport, areaList, areaRemove } from '#/api/hms/area';
import { commonDownloadExcel } from '#/utils/file/download';
import areaDrawer from '#/views/hms/area/area-drawer.vue';
import BuildModelModal from '#/views/hms/area/build-model.vue';
import {
  columns,
  columns_2,
  columns_3,
  columns_4,
  querySchema,
} from '#/views/hms/area/data';

const props = defineProps({
  selectDeptStation: {
    type: Object,
    default: undefined,
  },
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
function getColumns() {
  if (props.selectDeptStation === undefined) {
    return columns;
  }
  if (
    props.selectDeptStation.nodeType === 'station' ||
    props.selectDeptStation.nodeType === 'dept'
  ) {
    return columns;
  }
  if (props.selectDeptStation.nodeType === 'area') {
    return columns_2;
  }
  if (props.selectDeptStation.nodeType === 'build') {
    return columns_3;
  }
  if (props.selectDeptStation.nodeType === 'unit') {
    return columns_4;
  }
  return columns;
}
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
  columns: getColumns(),
  height: 'auto',
  keepSource: true,
  pagerConfig: {},
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues = {}) => {
        // 部门树选择处理
        if (props.selectDeptStation === undefined) {
          Reflect.deleteProperty(formValues, 'deptId');
          Reflect.deleteProperty(formValues, 'stationId');
          formValues.category = 'area';
        } else {
          if (props.selectDeptStation.nodeType === 'dept') {
            formValues.deptId = props.selectDeptStation.id;
            formValues.category = 'area';
          } else {
            Reflect.deleteProperty(formValues, 'deptId');
          }
          if (props.selectDeptStation.nodeType === 'station') {
            formValues.stationId = props.selectDeptStation.id.split('-')[1];
            formValues.category = 'area';
          } else {
            Reflect.deleteProperty(formValues, 'stationId');
          }
          if (
            props.selectDeptStation.nodeType === 'area' ||
            props.selectDeptStation.nodeType === 'build' ||
            props.selectDeptStation.nodeType === 'unit' ||
            props.selectDeptStation.nodeType === 'room'
          ) {
            formValues.parentId = props.selectDeptStation.id.split('-')[1];
          } else {
            Reflect.deleteProperty(formValues, 'parentId');
          }
        }
        return await areaList({
          pageNum: page.currentPage,
          pageSize: page.pageSize,
          orderByColumn: 'id',
          isAsc: 'asc',
          ...formValues,
        });
      },
    },
  },
  rowConfig: {
    keyField: 'id',
  },
  // 表格全局唯一表示 保存列配置需要用到
  id: 'hms-area-index',
};
const [BasicTable, tableApi] = useVbenVxeGrid({
  formOptions,
  gridOptions,
});

const [AreaDrawer, drawerApi] = useVbenDrawer({
  connectedComponent: areaDrawer,
});

function handleAdd() {
  let category = 'station';

  if (props.selectDeptStation !== undefined) {
    category = props.selectDeptStation.nodeType;
  }
  drawerApi.setData({
    category,
    title: title.value,
    pid: props.selectDeptStation?.id.split('-')[1],
  });
  drawerApi.open();
}

async function handleEdit(row: Required<AreaForm>) {
  drawerApi.setData({ id: row.id });
  drawerApi.open();
}

async function handleDelete(row: Required<AreaForm>) {
  await areaRemove(row.id);
  await tableApi.query();
}

function handleMultiDelete() {
  const rows = tableApi.grid.getCheckboxRecords();
  const ids = rows.map((row: Required<AreaForm>) => row.id);
  Modal.confirm({
    title: '提示',
    okType: 'danger',
    content: `确认删除选中的${ids.length}条记录吗？`,
    onOk: async () => {
      await areaRemove(ids);
      await tableApi.query();
    },
  });
}

function handleDownloadExcel() {
  commonDownloadExcel(
    areaExport,
    '区域信息数据',
    tableApi.formApi.form.values,
    {
      fieldMappingTime: formOptions.fieldMappingTime,
    },
  );
}
const canAddArea = computed(() => {
  return props.selectDeptStation
    ? props.selectDeptStation.nodeType !== 'station'
    : true;
});
const openBuildModelModal = ref(false);
function handleAddMultipleArea() {
  console.log(openBuildModelModal);
  openBuildModelModal.value = true;
}
const title = ref();

watch(
  () => props.selectDeptStation,
  () => {
    gridOptions.columns = getColumns();
    tableApi.setGridOptions(gridOptions);
    tableApi.reload();
  },
);
const updateBuildModelModal = (val) => {
  console.log(val);
  openBuildModelModal.value = val;
};
</script>

<template>
  <div class="flex-1 overflow-hidden">
    <BasicTable class="flex-1 overflow-hidden">
      <template #toolbar-actions>
        <Space>
          <a-button
            v-access:code="['hms:area:add']"
            @click="handleAddMultipleArea"
            type="primary"
            :disabled="canAddArea"
          >
            {{ $t('hms.area.action.addMultipleArea') }}
          </a-button>
        </Space>
      </template>
      <template #toolbar-tools>
        <Space>
          <a-button
            v-access:code="['hms:area:export']"
            @click="handleDownloadExcel"
          >
            {{ $t('pages.common.export') }}
          </a-button>
          <a-button
            :disabled="!vxeCheckboxChecked(tableApi)"
            danger
            type="primary"
            v-access:code="['hms:area:remove']"
            @click="handleMultiDelete"
          >
            {{ $t('pages.common.delete') }}
          </a-button>
          <a-button
            type="primary"
            :disabled="props.selectDeptStation?.nodeType === 'room'"
            v-access:code="['hms:area:add']"
            @click="handleAdd"
          >
            {{ $t('pages.common.add') }}
          </a-button>
        </Space>
      </template>
      <template #action="{ row }">
        <Space>
          <ghost-button
            v-access:code="['hms:area:edit']"
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
              v-access:code="['hms:area:remove']"
              @click.stop=""
            >
              {{ $t('pages.common.delete') }}
            </ghost-button>
          </Popconfirm>
        </Space>
      </template>
    </BasicTable>
    <AreaDrawer @reload="tableApi.query()" />
    <BuildModelModal
      :open="openBuildModelModal"
      @update="updateBuildModelModal"
    />
  </div>
</template>

<style scoped lang="scss"></style>
