import type {FormSchemaGetter} from '#/adapter/form';
import type {VxeGridProps} from '#/adapter/vxe-table';

import {renderDict} from '#/utils/render';
import {disCmdReturnVal} from "#/api/iot/gatewaydata";

export const querySchema: FormSchemaGetter = () => [];


export const columns: VxeGridProps['columns'] = [
  {    title: '指令状态',   field: 'cmdstat',   minWidth:100, slots: {      default: ({ row }) => {        return renderDict(row.cmdstat, 'cmdsendstat');      },    },      },
  {    title: '网关SN',    field: 'gwsn',      minWidth:120,  },
  {    title: '创建时间',   field: 'addtime',   minWidth:140,  },
  {    title: '回复时间',   field: 'returntime',width:140,  },
  {    title: '指令名称',   field: 'cmdcode',   minWidth: 100, slots: {      default: ({ row }) => {        return renderDict(row.cmdcode, 'dev_allcmd_code');      },    },     },
  {    title: '读写标识',   field: 'type',      minWidth:60,   slots: {      default: ({ row }) => {        return renderDict(row.type, 'cmdtype');      },    },      },
  {    title: '下发指令',    field: 'cmdtext',  minWidth:180 , showOverflow: "tooltip" , resizable:true  },
  {    title: '回复信息',   field: 'returninfo',minWidth:150,  showOverflow: "tooltip" , resizable:true ,formatter: ({ row }) => disCmdReturnVal( row.type , row.returninfo ), },
  {    title: '指令参数',field: 'cmdparams',    minWidth:150,  showOverflow: "tooltip", resizable:true ,},
];

export const drawerSchema: FormSchemaGetter = () => [

];
