import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { getDictOptions } from '#/utils/dict';
import { renderDict } from '#/utils/render';

export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'sn',
    label: '设备序列号',
  },
  {
    component: 'RangePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
    fieldName: 'addtime',
    label: '指令时间',
  },
];

// 需要使用i18n注意这里要改成getter形式 否则切换语言不会刷新
// export const columns: () => VxeGridProps['columns'] = () => [
export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
  {
    title: '',
    field: 'id',
    visible: false,
  },
  {
    title: '设备序列号',
    field: 'sn',
    width:250,
  },
  {
    title: '指令ID',
    field: 'mid',
    width:150,
  },
  {
    title: '设备网关序列号',
    field: 'gwsn',
    width:250,
  },
  {
    title: '创建时间',
    field: 'addtime',
    width:150,
  },
  {
    title: '指令名称',
    field: 'cmdcode',
    slots: {
      default: ({ row }) => {
        return renderDict(row.cmdcode, 'cmd_code_key');
      },
    },
    width: 100,
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
    width:100,
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
    width:120,
  },
  {
    title: '指令参数信息',
    field: 'cmdparams',
    width:250,
  },
  {
    title: '回复时间',
    field: 'returntime',
    width:150,
  },
  {
    title: '回复信息',
    field: 'returninfo',
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
  {
    label: '',
    fieldName: 'id',
    component: 'Input',
    dependencies: {
      show: () => false,
      triggerFields: [''],
    },
  },
  {
    label: '设备序列号',
    fieldName: 'sn',
    component: 'Input',
  },
  {
    label: '指令编码',
    fieldName: 'cmdcode',
    component: 'Select',
    componentProps: {
      options: getDictOptions('cmd_code_key'),
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
