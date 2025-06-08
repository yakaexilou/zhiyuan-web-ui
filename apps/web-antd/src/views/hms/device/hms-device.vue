<script setup lang="ts">
import type { VbenFormProps } from '@vben/common-ui';

import type { VxeGridProps } from '#/adapter/vxe-table';
import type { HmsDeviceForm } from '#/api/hms/hmsDevice/model';

import { ref, watch } from 'vue';

import { useVbenModal } from '@vben/common-ui';
import { $t } from '@vben/locales';
// import dayjs from 'dayjs';
import { getVxePopupContainer } from '@vben/utils';

import { Modal, Popconfirm, Space } from 'ant-design-vue';

import { useVbenVxeGrid, vxeCheckboxChecked } from '#/adapter/vxe-table';
import { areaInfo } from '#/api/hms/area';
import {
  hmsDeviceExport,
  hmsDeviceList,
  hmsDeviceRemove,
} from '#/api/hms/hmsDevice';
import { stationInfo } from '#/api/hms/station';
import { commonDownloadExcel } from '#/utils/file/download';

import { columns, querySchema } from './data';
import fileUploadModal from './file-upload-modal.vue';
import hmsDeviceModal from './hmsDevice-modal.vue';

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
        if (props.selectDeptStation !== undefined) {
          if (props.selectDeptStation?.nodeType === 'dept') {
            formValues.deptId = props.selectDeptStation.id;
            Reflect.deleteProperty(formValues, 'areaId');
            Reflect.deleteProperty(formValues, 'stationId');
          } else if (props.selectDeptStation?.nodeType === 'station') {
            formValues.stationId = props.selectDeptStation.id.split('-')[1];
            Reflect.deleteProperty(formValues, 'areaId');
            Reflect.deleteProperty(formValues, 'deptId');
          } else {
            console.log(props.selectDeptStation);
            formValues.idSeq = props.selectDeptStation?.idSeq;
            Reflect.deleteProperty(formValues, 'deptId');
            Reflect.deleteProperty(formValues, 'stationId');
          }
        }
        return await hmsDeviceList({
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
  id: 'hmsDevice-hmsDevice-index',
};

const [BasicTable, tableApi] = useVbenVxeGrid({
  formOptions,
  gridOptions,
});

const [HmsDeviceModal, modalApi] = useVbenModal({
  connectedComponent: hmsDeviceModal,
});

function handleAdd() {
  modalApi.setData({ area: area?.value, station: station?.value });
  modalApi.open();
}

async function handleEdit(row: Required<HmsDeviceForm>) {
  modalApi.setData({ id: row.id, area: area?.value, station: station?.value||null });
  modalApi.open();
}

async function handleDelete(row: Required<HmsDeviceForm>) {
  await hmsDeviceRemove(row.id);
  await tableApi.query();
}

function handleMultiDelete() {
  const rows = tableApi.grid.getCheckboxRecords();
  const ids = rows.map((row: Required<HmsDeviceForm>) => row.id);
  Modal.confirm({
    title: '提示',
    okType: 'danger',
    content: `确认删除选中的${ids.length}条记录吗？`,
    onOk: async () => {
      await hmsDeviceRemove(ids);
      await tableApi.query();
    },
  });
}

function handleDownloadExcel() {
  commonDownloadExcel(
    hmsDeviceExport,
    '设备管理数据',
    tableApi.formApi.form.values,
    {
      fieldMappingTime: formOptions.fieldMappingTime,
    },
  );
}
const station = ref();
const area = ref();
watch(
  () => props.selectDeptStation,
  async () => {
    // gridOptions.columns = getColumns();
    // tableApi.setGridOptions(gridOptions);
    if (props.selectDeptStation?.nodeType !== undefined) {
      if (props.selectDeptStation?.nodeType === 'station') {
        const id = props.selectDeptStation.id.split('-')[1];
        await stationInfo(id).then((res) => (station.value = res));
      } else if (props.selectDeptStation?.nodeType !== 'dept') {
        const id = props.selectDeptStation?.id.split('-')[1];
        await areaInfo(id).then((res) => (area.value = res));
      }
    }
    tableApi.reload();
  },
);
const [FileUploadModal, fileUploadApi] = useVbenModal({
  connectedComponent: fileUploadModal,
});
</script>

<template>
  <div class="flex-1 overflow-hidden">
    <BasicTable table-title="设备管理列表">
      <template #toolbar-actions>
        <Space>
          <a-button
            v-access:code="['hms:hmsDevice:import']"
            type="primary"
            @click="fileUploadApi.open"
          >
            {{ $t('hms.device.action.import_build_data') }}
          </a-button>
        </Space>
      </template>
      <template #toolbar-tools>
        <Space>
          <a-button
            v-access:code="['hmsDevice:hmsDevice:export']"
            @click="handleDownloadExcel"
          >
            {{ $t('pages.common.export') }}
          </a-button>
          <a-button
            :disabled="!vxeCheckboxChecked(tableApi)"
            danger
            type="primary"
            v-access:code="['hmsDevice:hmsDevice:remove']"
            @click="handleMultiDelete"
          >
            {{ $t('pages.common.delete') }}
          </a-button>
          <a-button
            type="primary"
            v-access:code="['hmsDevice:hmsDevice:add']"
            @click="handleAdd"
            :disabled="area === undefined "
          >
            {{ $t('pages.common.add') }}
          </a-button>
        </Space>
      </template>
      <template #action="{ row }">
        <Space>
          <ghost-button
            v-access:code="['hmsDevice:hmsDevice:edit']"
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
              v-access:code="['hmsDevice:hmsDevice:remove']"
              @click.stop=""
            >
              {{ $t('pages.common.delete') }}
            </ghost-button>
          </Popconfirm>
        </Space>
      </template>
    </BasicTable>
    <HmsDeviceModal @reload="tableApi.query()" />
    <FileUploadModal @reload="tableApi.query" />
  </div>
</template>
