import type {FormSchemaGetter} from '#/adapter/form';
import type {VxeGridProps} from '#/adapter/vxe-table';

import {getDictOptions} from '#/utils/dict';
import {renderDict} from '#/utils/render';
import {disCmdReturnVal} from "#/api/iot/gatewaydata";

export const querySchema: FormSchemaGetter = () => [
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
  {
    title: '创建时间',
    field: 'addtime',
    minWidth:150,
  },
  {
    title: '设备序列号',
    field: 'sn',
    minWidth:250,
  },
  {
    title: '回复时间',
    field: 'returntime',
    minWidth:150,
  },
  {
    title: '状态',
    field: 'cmdstat',
    slots: {
      default: ({ row }) => {
        // 可选从DictEnum中获取 DictEnum.CMDSENDSTAT 便于维护
        return renderDict(row.cmdstat, 'cmdsendstat');
      },
    },
    minWidth:120,
  },
  {
    title: '网关序列号',
    field: 'gwsn',
    minWidth:250,
  },
  {
    title: '指令ID',
    field: 'mid',
    minWidth:150,
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
    minWidth:100,
  },
  {
    title: '回复信息',
    field: 'returninfo',
    minWidth:150,
    formatter: ({ row }) => disCmdReturnVal( row.type , row.returninfo ),
  },
  {
    title: '指令参数信息',
    field: 'cmdparams',
    minWidth:150,
  }
];

export const drawerSchema: FormSchemaGetter = () => [];
