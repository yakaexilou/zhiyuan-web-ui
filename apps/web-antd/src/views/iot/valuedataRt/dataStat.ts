import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import {
  cqsFormat,
  dianLiangFormat,
  disD3custom1,
  disLjll,
  disLjrl,
  disSsll,
  disSsrl,
  valveFaWei,
  valveTemp
} from "#/api/iot/gatewaydata";
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

export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
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
  { title: '供压', field: 'supplypressure', visible: false },
  { title: '回压', field: 'returnpressure', visible: false },
  { title: '室温', field: 'roomtemp', visible: false },
  { title: '目标室温', field: 'targetroomtemp', visible: false },
  { title: '目标流量', field: 'targetflow', visible: false },
  { title: '备用1', field: 'd1custom1', visible: false },
  { title: '备用8', field: 'd2custom8', visible: false },
  { title: '备用2', field: 'custom2', minWidth: 40, visible: false },
  { title: '备用3', field: 'custom3', minWidth: 40, visible: false },
  { title: '备用4', field: 'custom4', minWidth: 40, visible: false },
  { title: '备用5', field: 'custom5', minWidth: 40, visible: false },
  { title: '备用6', field: 'custom6', minWidth: 40, visible: false },
  { title: '备用7', field: 'custom7', minWidth: 40, visible: false },
  { title: '备用8', field: 'custom8', minWidth: 40, visible: false },
];

export const columns1: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
  {
    title: '设备SN1',
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
  { title: '供压', field: 'supplypressure', visible: false },
  { title: '回压', field: 'returnpressure', visible: false },
  { title: '室温', field: 'roomtemp', visible: false },
  { title: '目标室温', field: 'targetroomtemp', visible: false },
  { title: '目标流量', field: 'targetflow', visible: false },
  { title: '备用1', field: 'd1custom1', visible: false },
  { title: '备用8', field: 'd2custom8', visible: false },
  { title: '备用2', field: 'custom2', minWidth: 40, visible: false },
  { title: '备用3', field: 'custom3', minWidth: 40, visible: false },
  { title: '备用4', field: 'custom4', minWidth: 40, visible: false },
  { title: '备用5', field: 'custom5', minWidth: 40, visible: false },
  { title: '备用6', field: 'custom6', minWidth: 40, visible: false },
  { title: '备用7', field: 'custom7', minWidth: 40, visible: false },
  { title: '备用8', field: 'custom8', minWidth: 40, visible: false },
];

export const columns2: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
  {
    title: '设备SN2',
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
  { title: '供压', field: 'supplypressure', visible: false },
  { title: '回压', field: 'returnpressure', visible: false },
  { title: '室温', field: 'roomtemp', visible: false },
  { title: '目标室温', field: 'targetroomtemp', visible: false },
  { title: '目标流量', field: 'targetflow', visible: false },
  { title: '备用1', field: 'd1custom1', visible: false },
  { title: '备用8', field: 'd2custom8', visible: false },
  { title: '备用2', field: 'custom2', minWidth: 40, visible: false },
  { title: '备用3', field: 'custom3', minWidth: 40, visible: false },
  { title: '备用4', field: 'custom4', minWidth: 40, visible: false },
  { title: '备用5', field: 'custom5', minWidth: 40, visible: false },
  { title: '备用6', field: 'custom6', minWidth: 40, visible: false },
  { title: '备用7', field: 'custom7', minWidth: 40, visible: false },
  { title: '备用8', field: 'custom8', minWidth: 40, visible: false },
];

export const columns3: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
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

export const columns4: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
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
    title: '累计流量(m³)',
    field: 'flowrecorder',
    minWidth: 80,
    formatter: ({ cellValue }) => disLjll(cellValue),
  },
  {
    title: '累计热力(KWh)',
    field: 'powerrecorder',
    minWidth: 180,
    formatter: ({ cellValue }) => disLjrl(cellValue),
  },
  { title: '供压', field: 'supplypressure', visible: false },
  { title: '回压', field: 'returnpressure', visible: false },
  { title: '室温', field: 'roomtemp', visible: false },
  { title: '目标室温', field: 'targetroomtemp', visible: false },
  { title: '目标流量', field: 'targetflow', visible: false },
  { title: '备用1', field: 'd1custom1', visible: false },
  { title: '备用8', field: 'd2custom8', visible: false },
  { title: '备用2', field: 'custom2', minWidth: 40, visible: false },
  { title: '备用3', field: 'custom3', minWidth: 40, visible: false },
  { title: '备用4', field: 'custom4', minWidth: 40, visible: false },
  { title: '备用5', field: 'custom5', minWidth: 40, visible: false },
  { title: '备用6', field: 'custom6', minWidth: 40, visible: false },
  { title: '备用7', field: 'custom7', minWidth: 40, visible: false },
  { title: '备用8', field: 'custom8', minWidth: 40, visible: false },
];
export const columns5: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
  {
    title: '设备SN5',
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
  { title: '供压', field: 'supplypressure', visible: false },
  { title: '回压', field: 'returnpressure', visible: false },
  { title: '室温', field: 'roomtemp', visible: false },
  { title: '目标室温', field: 'targetroomtemp', visible: false },
  { title: '目标流量', field: 'targetflow', visible: false },
  { title: '备用1', field: 'd1custom1', visible: false },
  { title: '备用8', field: 'd2custom8', visible: false },
  { title: '备用2', field: 'custom2', minWidth: 40, visible: false },
  { title: '备用3', field: 'custom3', minWidth: 40, visible: false },
  { title: '备用4', field: 'custom4', minWidth: 40, visible: false },
  { title: '备用5', field: 'custom5', minWidth: 40, visible: false },
  { title: '备用6', field: 'custom6', minWidth: 40, visible: false },
  { title: '备用7', field: 'custom7', minWidth: 40, visible: false },
  { title: '备用8', field: 'custom8', minWidth: 40, visible: false },
];
export const columns6: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
  {    title: 'id',    field: 'id',    visible: false,  },
  {    title: '设备编码',    field: 'sn',    minWidth: 150,    sortType:"string",    sortable:true,  },
  {    title: '状态',    field: 'devStat',    width: 60,    slots: {      default: ({ row }) => {        return renderDict(row.devStat, 'dev_stat');      },    },  },
  {    title: '数据上报时间',    field: 'time',    minWidth: 150,  },
  {    title: '电池电量',    field: 'batterypower',    formatter: ({ cellValue }) => dianLiangFormat( cellValue ),    minWidth:"150",    sortType:"number",    sortable:true,  },
  {    title: '信号强度',    field: 'csq',    formatter: ({ cellValue }) => cqsFormat( cellValue ),    minWidth:"150",    sortType:"number",    sortable:true,  },
  {    title: '通讯ICCID',    field: 'iccid',    minWidth:"150",  },
];

export const drawerSchema: FormSchemaGetter = () => [
  {
    fieldName: 'sn',
    component: 'hidden',
    defaultValue: '',
  },
  {
    label: '指令编码',
    fieldName: 'cmdcode',
    component: 'Select',
    componentProps: {
      options: getDictOptions('cmd_code_key'),
    },
    rules: 'selectRequired',
    defaultValue: '31',
  },
  {
    label: '读写标识',
    fieldName: 'type',
    component: 'Select',
    componentProps: {
      options: getDictOptions('cmdtype'),
    },
    rules: 'selectRequired',
    defaultValue: '00',
  },
  {
    label: '指令参数',
    fieldName: 'cmdparams',
    component: 'Input',
    defaultValue: '',
  },
];

export const drawerSchema1: FormSchemaGetter = () => [
  {    fieldName: 'sn',    component: 'hidden',    defaultValue:'',  },
  {    label: '指令编码1',    fieldName: 'cmdcode',    component: 'Select',    componentProps: {      options: getDictOptions('dev_yl_cmd_code'),    },    rules: 'selectRequired',    defaultValue:'31',  },
  {    label: '读写标识',    fieldName: 'type',    component: 'Select',    componentProps: {      options: getDictOptions('cmdtype'),    },    rules: 'selectRequired',    defaultValue:'00',  },
  {    label: '指令参数',    fieldName: 'cmdparams',    component: 'Input',    defaultValue:'',  },
];

export const drawerSchema2: FormSchemaGetter = () => [
  {    fieldName: 'sn',    component: 'hidden',    defaultValue:'',  },
  {    label: '指令编码2',    fieldName: 'cmdcode',    component: 'Select',    componentProps: {      options: getDictOptions('dev_sw_cmd_code'),    },    rules: 'selectRequired',    defaultValue:'31',  },
  {    label: '读写标识',    fieldName: 'type',    component: 'Select',    componentProps: {      options: getDictOptions('cmdtype'),    },    rules: 'selectRequired',    defaultValue:'00',  },
  {    label: '指令参数',    fieldName: 'cmdparams',    component: 'Input',    defaultValue:'',  },
]

export const drawerSchema3: FormSchemaGetter = () => [
  {    fieldName: 'sn',    component: 'hidden',    defaultValue:'',  },
  {    label: '指令编码3',    fieldName: 'cmdcode',    component: 'Select',    componentProps: {      options: getDictOptions('dev_fm_cmd_code'),    },    rules: 'selectRequired',    defaultValue:'31',  },
  {    label: '读写标识',    fieldName: 'type',    component: 'Select',    componentProps: {      options: getDictOptions('cmdtype'),    },    rules: 'selectRequired',    defaultValue:'00',  },
  {    label: '指令参数',    fieldName: 'cmdparams',    component: 'Input',    defaultValue:'',  },
]

export const drawerSchema4: FormSchemaGetter = () => [
  {    fieldName: 'sn',    component: 'hidden',    defaultValue:'',  },
  {    label: '指令编码4',    fieldName: 'cmdcode',    component: 'Select',    componentProps: {      options: getDictOptions('dev_rb_cmd_code'),    },    rules: 'selectRequired',    defaultValue:'31',  },
  {    label: '读写标识',    fieldName: 'type',    component: 'Select',    componentProps: {      options: getDictOptions('cmdtype'),    },    rules: 'selectRequired',    defaultValue:'00',  },
  {    label: '指令参数',    fieldName: 'cmdparams',    component: 'Input',    defaultValue:'',  },
]

export const drawerSchema5: FormSchemaGetter = () => [
  {    fieldName: 'sn',    component: 'hidden',    defaultValue:'',  },
  {    label: '指令编码5',    fieldName: 'cmdcode',    component: 'Select',    componentProps: {      options: getDictOptions('dev_zf_cmd_code'),    },    rules: 'selectRequired',    defaultValue:'16',  },
  {    label: '读写标识',    fieldName: 'type',    component: 'Select',    componentProps: {      options: getDictOptions('cmdtype'),    },    rules: 'selectRequired',    defaultValue:'00',  },
  {    label: '指令参数',    fieldName: 'cmdparams',    component: 'Input',    defaultValue:'',  },
]

export const drawerSchema6: FormSchemaGetter = () => [
  {    fieldName: 'sn',    component: 'hidden',    defaultValue:'',  },
  {    label: '指令编码',    fieldName: 'cmdcode',    component: 'Select',    componentProps: {      options: getDictOptions('dev_gw_cmd_code'),    },    rules: 'selectRequired',    defaultValue:'63AA',  },
  {    label: '读写标识',    fieldName: 'type',    component: 'Select',    componentProps: {      options: getDictOptions('cmdtype'),    },    rules: 'selectRequired',    defaultValue:'00',  },
  {    label: '指令参数',    fieldName: 'cmdparams',    component: 'Input',    defaultValue:'',  },
]

export interface DevTypeTree {
  id: number;
  /**
   * antd组件必须要这个属性 实际是没有这个属性的
   */
  key: string;
  parentId: number;
  label: string;
  weight: number;
  children?: DevTypeTree[];
}
