import type {FormSchemaGetter} from '#/adapter/form';
import type {VxeGridProps} from '#/adapter/vxe-table';

import {getDictOptions} from '#/utils/dict';
import {renderDict} from '#/utils/render';

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
    width:150,
    visible: false,
  },
  {
    title: '设备网关序列号',
    field: 'gwsn',
    minWidth:120,
  },
  {
    title: '创建时间',
    field: 'addtime',
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
    minWidth:60,
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
    minWidth:120,
  },
  {
    title: '指令参数信息',
    field: 'cmdparams',
    minWidth:80,
  },
  {
    title: '回复时间',
    field: 'returntime',
    width:150,
  },
  {
    title: '回复信息',
    field: 'returninfo',
    minWidth:80,
  },
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
