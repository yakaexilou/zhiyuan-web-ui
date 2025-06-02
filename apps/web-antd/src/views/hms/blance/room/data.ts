import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { getPopupContainer } from '@vben/utils';

import { columns3 } from '#/views/iot/valuedataRt/dataStat';
import {renderDict} from "#/utils/render";
import {dianLiangFormat, disD3custom1, valveFaWei, valveTemp} from "#/api/iot/gatewaydata";

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
  },
  {
    title: '设备SN',
    field: 'sn',
    width: 250,
    sortType: 'string',
    sortable: true,
  },
  {
    title: '状态',
    field: 'devStat',
    width: 60,
    slots: {
      default: ({ row }) => {
        return renderDict(row.devStat, 'dev_stat');
      },
    },
  },
  { title: '接收时间', field: 'addtime', width: 150, sortable: true },
  { title: '采集时间', field: 'time', width: 150 },
  {
    title: '电量',
    field: 'batterypower',
    minWidth: 80,
    formatter: ({ cellValue }) => dianLiangFormat(cellValue),
    sortable: true,
  },
  { title: '报警', field: 'alarm', minWidth: 80 },
  { title: '上报周期', field: 'period', minWidth: 80, sortable: true },
  {
    title: '实时阀位',
    field: 'realposition',
    minWidth: 80,
    formatter: ({ cellValue }) => valveFaWei(cellValue),
    sortType: 'number',
    sortable: true,
  },
  {
    title: '目标阀位',
    field: 'targetposition',
    minWidth: 80,
    formatter: ({ cellValue }) => valveFaWei(cellValue),
    sortType: 'number',
    sortable: true,
  },
  {
    title: '回温',
    field: 'returntemp',
    minWidth: 80,
    formatter: ({ cellValue }) => valveTemp(cellValue),
    sortType: 'number',
    sortable: true,
  },
  {
    title: '目标回温',
    field: 'targetreturntemp',
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
    title: '运行模式',
    field: 'custom1',
    minWidth: 80,
    formatter: ({ cellValue }) => disD3custom1(cellValue),
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
