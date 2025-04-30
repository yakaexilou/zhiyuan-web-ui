import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';
import {dianLiangFormat, valveFaWei, valveTemp,disD3custom1} from "#/api/iot/gatewaydata";


export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'sn',
    label: '设备SN',
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
  {
    title: '设备SN',
    field: 'sn',
    width: 250,
  },
  {
    title: '接收时间',
    field: 'addtime',
    width: 150,
  },
  {
    title: '采集时间',
    field: 'time',
    width: 150,
  },
  {
    title: '电量',
    field: 'batterypower',
    formatter: ({ cellValue }) => dianLiangFormat( cellValue ),
    width: 80,
  },
  {
    title: '报警',
    field: 'alarm',
    width: 80,
  },
  {
    title: '上报周期',
    field: 'period',
    width: 80,
  },
  {
    title: '实时阀位',
    field: 'realposition',
    width: 80,
    formatter: ({ cellValue }) => valveFaWei( cellValue ),
  },
  {
    title: '目标阀位',
    field: 'targetposition',
    width: 80,
    formatter: ({ cellValue }) => valveFaWei( cellValue ),
  },
  {
    title: '回温',
    field: 'returntemp',
    width: 80,
    formatter: ({ cellValue }) => valveTemp( cellValue ),
  },
  {
    title: '目标回温',
    field: 'targetreturntemp',
    width: 80,
    formatter: ({ cellValue }) => valveTemp( cellValue ),
  },
  {
    title: '供温',
    field: 'supplytemp',
    formatter: ({ cellValue }) => valveTemp( cellValue ),
    width: 80,
  },
  {
    title: '运行模式',
    field: 'custom1',
    width: 80,
    formatter: ({ cellValue }) => disD3custom1( cellValue ),
  },
  {
    title: '瞬时流量',
    field: 'flow',
  },
  {
    title: '瞬时功率',
    field: 'power',
  },
  {
    title: '累计流量',
    field: 'flowrecorder',
  },
  {
    title: '累计热力',
    field: 'powerrecorder',
  },
  {
    title: '供压',
    field: 'supplypressure',
  },
  {
    title: '回压',
    field: 'returnpressure',
  },
  {
    title: '室温',
    field: 'roomtemp',
  },
  {
    title: '目标室温',
    field: 'targetroomtemp',
  },
  {
    title: '目标流量',
    field: 'targetflow',
  },
  {
    title: '备用1',
    field: 'd1custom1',
    visible: false,
  },
  {
    title: '备用8',
    field: 'd2custom8',
  },
  {
    title: '备用1',
    field: 'custom1',
    width: 80,
    visible: false,
  },
  {
    title: '备用2',
    field: 'custom2',
    width: 40,
  },
  {
    title: '备用3',
    field: 'custom3',
    width: 40,
  },
  {
    title: '备用4',
    field: 'custom4',
    width: 40,
  },
  {
    title: '备用5',
    field: 'custom5',
    width: 40,
  },
  {
    title: '备用6',
    field: 'custom6',
    width: 40,
  },
  {
    title: '备用7',
    field: 'custom7',
    width: 40,
  },
  {
    title: '备用8',
    field: 'custom8',
    width: 40,
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
