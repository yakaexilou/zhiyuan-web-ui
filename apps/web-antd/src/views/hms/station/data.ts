import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { getDictOptions } from '#/utils/dict';
import { renderDict } from '#/utils/render';

export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'name',
    label: '名称',
  },
  {
    component: 'Input',
    fieldName: 'code',
    label: '编码',
  },
  {
    component: 'RadioGroup',
    componentProps: {
      // 可选从DictEnum中获取 DictEnum.SYS_YES_NO 便于维护
      options: getDictOptions('sys_enable_state'),
      buttonStyle: 'solid',
      optionType: 'button',
    },
    fieldName: 'status',
    label: '状态',
  },
];

// 需要使用i18n注意这里要改成getter形式 否则切换语言不会刷新
// export const columns: () => VxeGridProps['columns'] = () => [
export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
  // {
  //   title: '',
  //   field: 'id',
  // },
  {
    title: '名称',
    field: 'name',
  },
  {
    title: '编码',
    field: 'code',
  },
  {
    title: '距离（km）',
    field: 'length',
  },
  {
    title: '建筑面积',
    field: 'buildArea',
  },
  {
    title: '入网面积',
    field: 'onnetArea',
  },
  {
    title: '排序',
    field: 'sequence',
  },
  {
    title: '状态',
    field: 'status',
    slots: {
      default: ({ row }) => {
        // 可选从DictEnum中获取 DictEnum.SYS_YES_NO 便于维护
        return renderDict(row.status, 'sys_enable_state');
      },
    },
  },
  {
    title: '描述',
    field: 'description',
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
    label: '名称',
    fieldName: 'name',
    component: 'Input',
  },
  {
    label: '编码',
    fieldName: 'code',
    component: 'Input',
  },
  {
    label: '距离（km）',
    fieldName: 'length',
    component: 'Input',
  },
  {
    label: '建筑面积',
    fieldName: 'buildArea',
    component: 'Input',
  },
  {
    label: '入网面积',
    fieldName: 'onnetArea',
    component: 'Input',
  },
  {
    label: '排序',
    fieldName: 'sequence',
    component: 'Input',
  },
  {
    label: '状态',
    fieldName: 'status',
    component: 'RadioGroup',
    componentProps: {
      // 可选从DictEnum中获取 DictEnum.SYS_YES_NO 便于维护
      options: getDictOptions('sys_enable_state'),
      buttonStyle: 'solid',
      optionType: 'button',
    },
    rules: 'selectRequired',
  },
  {
    label: '描述',
    fieldName: 'description',
    component: 'Textarea',
    formItemClass: 'items-start',
  },
];
