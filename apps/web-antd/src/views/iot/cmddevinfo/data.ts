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
  },
  {
    title: '指令ID',
    field: 'mid',
    visible: false,
  },
  {
    title: '设备网关序列号',
    field: 'gwsn',
  },
  {
    title: '创建时间',
    field: 'addtime',
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
    title: '编码',
    field: 'cmdcode',
    width: 60,
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
  },
  {
    title: '指令参数信息',
    field: 'cmdparams',
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
  },
  {
    title: '回复时间',
    field: 'returntime',
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
    label: '指令ID',
    fieldName: 'mid',
    component: 'Input',
    rules: 'required',
  },
  {
    label: '设备网关序列号',
    fieldName: 'gwsn',
    component: 'Input',
  },
  {
    label: '指令编码',
    fieldName: 'cmdcode',
    component: 'Input',
    rules: 'required',
  },
  {
    label: '读写标识',
    fieldName: 'type',
    component: 'Select',
    componentProps: {
      // 可选从DictEnum中获取 DictEnum.CMDTYPE 便于维护
      options: getDictOptions('cmdtype'),
    },
    rules: 'selectRequired',
  },
  {
    label: '指令参数信息',
    fieldName: 'cmdparams',
    component: 'Input',
  },
  {
    label: '指令状态',
    fieldName: 'cmdstat',
    component: 'Select',
    componentProps: {
      // 可选从DictEnum中获取 DictEnum.CMDSENDSTAT 便于维护
      options: getDictOptions('cmdsendstat'),
    },
    rules: 'selectRequired',
  },
  {
    label: '创建时间',
    fieldName: 'addtime',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
  },
  {
    label: '回复时间',
    fieldName: 'returntime',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
  },
  {
    label: '回复信息',
    fieldName: 'returninfo',
    component: 'Input',
  },
];
