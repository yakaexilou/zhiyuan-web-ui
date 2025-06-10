import type {FormSchemaGetter} from '#/adapter/form';
import type {VxeGridProps} from '#/adapter/vxe-table';

import {getDictOptions} from '#/utils/dict';
import {renderDict} from '#/utils/render';
import {disCmdReturnVal} from "#/api/iot/gatewaydata";

export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'actid',
    label: '指令批次号',
    width: "150",
  },
  {
    component: 'Input',
    fieldName: 'sn',
    label: '设备序列号',
  },
  {
    label: '指令状态',
    fieldName: 'cmdstat',
    component: 'Select',
    componentProps: {
      options: getDictOptions('cmdsendstat'),
    },
    width:120,
  },
  {
    component: 'RangePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
    fieldName: 'beTime',
    label: '指令时间',
  },
];

// 需要使用i18n注意这里要改成getter形式 否则切换语言不会刷新
// export const columns: () => VxeGridProps['columns'] = () => [
export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
  {    title: '',    field: 'id',    visible: false,  },
  {    title: '指令批次号',    field: 'actid',    minWidth:150,  },
  {    title: '设备序列号',    field: 'sn',    minWidth:250,  },
  {    title: '状态',    field: 'cmdstat',    slots: {      default: ({ row }) => {        return renderDict(row.cmdstat, 'cmdsendstat');      },    },    minWidth:120,  },
  {    title: '网关序列号',    field: 'gwsn',    minWidth:250,  },
  {    title: '指令ID',    field: 'mid',    minWidth:150,  },
  {    title: '指令名称',    field: 'cmdcode',    slots: {      default: ({ row }) => {        return renderDict(row.cmdcode, 'dev_allcmd_code');      },    },    minWidth: 100,  },
  {    title: '读写标识',    field: 'type',    slots: {      default: ({ row }) => {        return renderDict(row.type, 'cmdtype');      },    },    minWidth:100,  },
  {    title: '创建时间',    field: 'addtime',    minWidth:150,  },
  {    title: '下发指令',    field: 'cmdtext',    minWidth:50 ,showOverflow: "tooltip" },
  {    title: '回复时间',    field: 'returntime',    minWidth:150,  },
  {    title: '回复信息',    field: 'returninfo',    minWidth:150,    formatter: ({ row }) => disCmdReturnVal( row.type , row.returninfo ), showOverflow: "tooltip" },
  {    title: '指令参数信息',    field: 'cmdparams',    minWidth:150, showOverflow: "tooltip" },
  {    field: 'action',    fixed: 'right',    slots: { default: 'action' },    title: '操作',    width: 120,  },
];

export const drawerSchema: FormSchemaGetter = () => [
  {
    label: '设备序列号',
    fieldName: 'sn',
    component: 'Input',
    defaultValue:'',
  },
  {
    label: '指令编码',
    fieldName: 'cmdcode',
    component: 'Select',
    componentProps: {
      options: getDictOptions('dev_allcmd_code'),
    },
    rules: 'selectRequired',
    defaultValue:'40',
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
