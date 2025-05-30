import type {FormSchemaGetter} from '#/adapter/form';
import type {VxeGridProps} from '#/adapter/vxe-table';

import {renderDict} from '#/utils/render';
import {disCmdReturnVal} from "#/api/iot/gatewaydata";

export const querySchema: FormSchemaGetter = () => [];

// 需要使用i18n注意这里要改成getter形式 否则切换语言不会刷新
// export const columns: () => VxeGridProps['columns'] = () => [
export const columns: VxeGridProps['columns'] = [
  {
    title: '设备序列号',
    field: 'sn',
    width:220,
  },
  {
    title: '指令ID',
    field: 'mid',
    width:120,
    visible: false,
  },
  {
    title: '指令状态',
    field: 'cmdstat',
    slots: {
      default: ({ row }) => {
        // 可选从DictEnum中获取 DictEnum.CMDSENDSTAT 便于维护
        return renderDict(row.cmdstat, 'cmdsendstat');
      },
    },
    minWidth:100,
  },
  {
    title: '网关序列号',
    field: 'gwsn',
    minWidth:120,
  },
  {
    title: '创建时间',
    field: 'addtime',
    minWidth:140,
  },
  {
    title: '回复时间',
    field: 'returntime',
    width:140,
  },
  {
    title: '指令名称',
    field: 'cmdcode',
    slots: {
      default: ({ row }) => {
        return renderDict(row.cmdcode, 'dev_allcmd_code');
      },
    },
    minWidth: 100,
  },
  {
    title: '读写标识',
    field: 'type',
    slots: {
      default: ({ row }) => {
        // 可选从DictEnum中获取 DictEnum.CMDTYPE 便于维护
        return renderDict(row.type, 'cmdtype');
      },
    },
    minWidth:60,
  },
  {
    title: '回复信息',
    field: 'returninfo',
    minWidth:180,
    formatter: ({ row }) => disCmdReturnVal( row.type , row.returninfo ),
  },
  {
    title: '指令参数信息',
    field: 'cmdparams',
    minWidth:150,
  },
];

export const drawerSchema: FormSchemaGetter = () => [

];
