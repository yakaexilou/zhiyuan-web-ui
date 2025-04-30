import type {FormSchemaGetter} from '#/adapter/form';
import type {VxeGridProps} from '#/adapter/vxe-table';
import {dianLiangFormat, disD3custom1, valveFaWei, valveTemp} from "#/api/iot/gatewaydata";
import {renderDict} from "#/utils/render";
import {getDictOptions} from "#/utils/dict";

export const querySchemaRealTime: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'sn',
    label: '设备SN',
    width: 200,
  },
  {
    component: 'Select',
    componentProps: {
      options: getDictOptions('dev_stat'),
    },
    fieldName: 'devStat',
    label: '状态',
  },
  {
    component: 'Select',
    componentProps: {
      options: getDictOptions('valvedata_sorttype'),
    },
    fieldName: 'devSortType',
    label: '数据排序',
  },
];

// export const columns: () => VxeGridProps['columns'] = () => [
export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
  {
    title: '设备SN',
    field: 'sn',
    width: 250,
    sortType:"string",
    sortable:true,
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
  {
    title: '接收时间',
    field: 'addtime',
    width: 150,
    sortable:true,
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
    minWidth: 80,
    sortable:true,
  },
  {
    title: '报警',
    field: 'alarm',
    minWidth: 80,
  },
  {
    title: '上报周期',
    field: 'period',
    minWidth: 80,
    sortable:true,
  },
  {
    title: '实时阀位',
    field: 'realposition',
    minWidth: 100,
    formatter: ({ cellValue }) => valveFaWei( cellValue ),
    sortType:"number",
    sortable:true,
  },
  {
    title: '目标阀位',
    field: 'targetposition',
    minWidth: 100,
    formatter: ({ cellValue }) => valveFaWei( cellValue ),
    sortType:"number",
    sortable:true,
  },
  {
    title: '回温',
    field: 'returntemp',
    minWidth: 100,
    formatter: ({ cellValue }) => valveTemp( cellValue ),
    sortType:"number",
    sortable:true,
  },
  {
    title: '目标回温',
    field: 'targetreturntemp',
    minWidth: 100,
    formatter: ({ cellValue }) => valveTemp( cellValue ),
    sortType:"number",
    sortable:true,
  },
  {
    title: '供温',
    field: 'supplytemp',
    minWidth: 100,
    formatter: ({ cellValue }) => valveTemp( cellValue ),
    sortType:"number",
    sortable:true,
  },
  {
    title: '运行模式',
    field: 'custom1',
    minWidth: 100,
    formatter: ({ cellValue }) => disD3custom1( cellValue ),
  },
  {
    title: '瞬时流量',
    field: 'flow',
    visible: false,
  },
  {
    title: '瞬时功率',
    field: 'power',
    visible: false,
  },
  {
    title: '累计流量',
    field: 'flowrecorder',
    visible: false,
  },
  {
    title: '累计热力',
    field: 'powerrecorder',
    visible: false,
  },
  {
    title: '供压',
    field: 'supplypressure',
    visible: false,
  },
  {
    title: '回压',
    field: 'returnpressure',
    visible: false,
  },
  {
    title: '室温',
    field: 'roomtemp',
    visible: false,
  },
  {
    title: '目标室温',
    field: 'targetroomtemp',
    visible: false,
  },
  {
    title: '目标流量',
    field: 'targetflow',
    visible: false,
  },
  {
    title: '备用1',
    field: 'd1custom1',
    visible: false,
  },
  {
    title: '备用8',
    field: 'd2custom8',
    visible: false,
  },
  {
    title: '备用2',
    field: 'custom2',
    minWidth: 40,
    visible: false,
  },
  {
    title: '备用3',
    field: 'custom3',
    minWidth: 40,
    visible: false,
  },
  {
    title: '备用4',
    field: 'custom4',
    minWidth: 40,
    visible: false,
  },
  {
    title: '备用5',
    field: 'custom5',
    minWidth: 40,
    visible: false,
  },
  {
    title: '备用6',
    field: 'custom6',
    minWidth: 40,
    visible: false,
  },
  {
    title: '备用7',
    field: 'custom7',
    minWidth: 40,
    visible: false,
  },
  {
    title: '备用8',
    field: 'custom8',
    minWidth: 40,
    visible: false,
  },
  {
    field: 'action',
    fixed: 'right',
    slots: { default: 'action' },
    title: '操作',
    minWidth: 180,
    visible: false,
  },
];

export const drawerSchema: FormSchemaGetter = () => [
  {
    fieldName: 'sn',
    component: 'hidden',
    defaultValue:'',
  },
  {
    label: '指令编码',
    fieldName: 'cmdcode',
    component: 'Select',
    componentProps: {
      options: getDictOptions('cmd_code_key'),
    },
    rules: 'selectRequired',
    defaultValue:'31',
  },
  {
    label: '读写标识',
    fieldName: 'type',
    component: 'Select',
    componentProps: {
      options: getDictOptions('cmdtype'),
    },
    rules: 'selectRequired',
    defaultValue:'00',
  },
  {
    label: '指令参数',
    fieldName: 'cmdparams',
    component: 'Input',
    defaultValue:'',
  },
];
