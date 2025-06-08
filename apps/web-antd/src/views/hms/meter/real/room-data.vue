<script setup lang="ts">
import type { VbenFormProps } from '@vben/common-ui';

import type { VxeGridProps } from '#/adapter/vxe-table';

import { ref, watch } from 'vue';

// import dayjs from 'dayjs';
import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { areaInfo } from '#/api/hms/area';
import { hmsDeviceExport, hmsDeviceList } from '#/api/hms/hmsDevice';
import { stationInfo } from '#/api/hms/station';
import { valvedataListRealTimeBySn } from '#/api/iot/valvedata';
import { commonDownloadExcel } from '#/utils/file/download';

import { columns, querySchema } from './data';

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
        formValues.productType = '2';
        const device = await hmsDeviceList({
          pageNum: page.currentPage,
          pageSize: page.pageSize,
          ...formValues,
        });
        const t = [];
        console.log(device.rows);
        for (const deviceElement of device.rows) {
          console.log(deviceElement);
          const data = await valvedataListRealTimeBySn(deviceElement.code);
          t.push({ ...deviceElement, ...data });
        }

        return { rows: t, total: device.total };
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
</script>

<template>
  <BasicTable table-title="热表实时数据" class="flex-1 overflow-hidden" />
</template>
