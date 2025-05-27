import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';
import {cqsFormat, dianLiangFormat} from "#/api/iot/gatewaydata";
import {renderDict} from "#/utils/render";
import {getDictOptions} from "#/utils/dict";


export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'sn',
    label: '网关SN',
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
      options: getDictOptions('gateway_sorttype'),
    },
    fieldName: 'devSortType',
    label: '数据排序',
  },
];

// 需要使用i18n注意这里要改成getter形式 否则切换语言不会刷新
// export const columns: () => VxeGridProps['columns'] = () => [
export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
  {    title: 'id',    field: 'id',    visible: false,  },
  {    title: '设备编码',    field: 'sn',    minWidth: 250,    sortType:"string",    sortable:true,  },
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
    defaultValue:'',
  },
  {
    label: '指令编码',
    fieldName: 'cmdcode',
    component: 'Select',
    componentProps: {
      options: getDictOptions('gwcmd_code_key'),
    },
    rules: 'selectRequired',
    defaultValue:'16',
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
