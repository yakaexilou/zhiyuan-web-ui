import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';
import {cqsFormat, dianLiangFormat} from "#/api/iot/gatewaydata";


export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'sn',
    label: '设备编码',

  },
  {
    component: 'RangePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
    fieldName: 'beTime',
    label: '采集时间',
  },
];

// 需要使用i18n注意这里要改成getter形式 否则切换语言不会刷新
// export const columns: () => VxeGridProps['columns'] = () => [
export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
  {
    title: 'id',
    field: 'id',
    visible: false,
  },
  {
    title: '设备编码',
    field: 'sn',
    width: 250,
  },
  {
    title: '数据上报时间',
    field: 'time',
    width: 150,
  },
  {
    title: '电池电量',
    field: 'batterypower',
    formatter: ({ cellValue }) => dianLiangFormat( cellValue ),
    width:"150",
  },
  {
    title: '信号强度',
    field: 'csq',
    formatter: ({ cellValue }) => cqsFormat( cellValue ),
    width:"150",
  },
  {
    title: '通讯ICCID',
    field: 'iccid',
  },
  {
    field: 'action',
    fixed: 'right',
    slots: { default: 'action' },
    title: '操作',
    width: 180,
  },
];

export const drawerSchema: FormSchemaGetter = () => [
];
