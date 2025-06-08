import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { getPopupContainer } from '@vben/utils';

import {
  dianLiangFormat,
  disLjll,
  disLjrl,
  disSsll,
  disSsrl,
  valveTemp,
} from '#/api/iot/gatewaydata';
import { renderDict } from '#/utils/render';
import { columns3 } from '#/views/iot/valuedataRt/dataStat';

export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'code',
    label: '编码',
  },
  {
    component: 'Input',
    fieldName: 'gateway_code',
    label: '所属网关',
  },
  {
    component: 'Input',
    fieldName: 'product_type',
    label: '产品类型',
  },
];
const valveData = columns3;
Reflect.deleteProperty(valveData, 'checkbox');
console.log(valveData);
// 需要使用i18n注意这里要改成getter形式 否则切换语言不会刷新
// export const columns: () => VxeGridProps['columns'] = () => [
export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
  // {
  //   title: 'ID',
  //   field: 'id'
  // },
  {
    title: '所属区域',
    field: 'fullAddress',
    width: 120,
    sortType: 'string',
    sortable: true,
  },
  {
    title: '设备SN',
    field: 'code',
    width: 120,
    sortType: 'string',
    sortable: true,
  },
  {
    title: '状态',
    field: 'devStat',
    width: 60,
    slots: {
      default: ({ row }) => {
        return renderDict(row.devStat === ""?-1:row.devStat, 'dev_stat');
      },
    },
  },
  { title: '接收时间', field: 'addtime', width: 150, sortable: true },
  { title: '采集时间', field: 'time', width: 150 },
  { title: '上报周期', field: 'period', minWidth: 80, sortable: true },
  {
    title: '回温',
    field: 'returntemp',
    minWidth: 80,
    formatter: ({ cellValue }) => valveTemp(cellValue),
    sortType: 'number',
    sortable: true,
  },
  {
    title: '供温',
    field: 'supplytemp',
    minWidth: 80,
    formatter: ({ cellValue }) => valveTemp(cellValue),
    sortType: 'number',
    sortable: true,
  },
  {
    title: '瞬时流量',
    field: 'flow',
    minWidth: 80,
    formatter: ({ cellValue }) => disSsll(cellValue),
  },
  {
    title: '瞬时功率',
    field: 'power',
    minWidth: 80,
    formatter: ({ cellValue }) => disSsrl(cellValue),
  },
  {
    title: '累计流量',
    field: 'flowrecorder',
    minWidth: 80,
    formatter: ({ cellValue }) => disLjll(cellValue),
  },
  {
    title: '累计热力',
    field: 'powerrecorder',
    minWidth: 180,
    formatter: ({ cellValue }) => disLjrl(cellValue),
  },
];

export const modalSchema: FormSchemaGetter = () => [
  {
    label: 'ID',
    fieldName: 'id',
    component: 'Input',
    dependencies: {
      show: () => false,
      triggerFields: [''],
    },
  },
  {
    label: '所属区域',
    fieldName: 'areaId',
    component: 'Select',
    componentProps: {},
  },
  {
    label: '编码',
    fieldName: 'code',
    component: 'Input',
  },
  {
    label: '产品类型',
    fieldName: 'productId',
    component: 'Select',
    componentProps: {
      getPopupContainer,
    },
  },
  {
    label: '通讯地址',
    fieldName: 'comAddr',
    component: 'Input',
  },
  // {
  //   label: '云网关id',
  //   fieldName: 'cloudGatewayId',
  //   component: 'Input',
  // },
  {
    label: '网关',
    fieldName: 'gatewayId',
    component: 'Select',
    componentProps: {
      getPopupContainer,
    },
  },
];
