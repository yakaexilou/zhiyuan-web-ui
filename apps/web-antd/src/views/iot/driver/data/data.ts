import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';
import {getDictOptions} from "#/utils/dict";


export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'name',
    label: '字段标识',
  },
  {
    component: 'Input',
    fieldName: 'label',
    label: '字段描述',
  }
];

// 需要使用i18n注意这里要改成getter形式 否则切换语言不会刷新
// export const columns: () => VxeGridProps['columns'] = () => [
export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
  {
    title: '字段标识',
    field: 'name',
    align: 'left'
  },
  {
    title: '字段描述',
    field: 'label',
    align: 'left'
  },
  {
    title: '数据类型',
    field: 'dataType',
    align: 'left'
  },
  {
    title: '默认值',
    field: 'defaultValue',
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
    component: 'Input',
    dependencies: {
      show: () => false,
      triggerFields: [''],
    },
    fieldName: 'id',
  },
  {
    label: '字段标识',
    fieldName: 'name',
    component: 'Input',
    rules: 'required',
  },
  {
    label: '字段描述',
    fieldName: 'label',
    component: 'Input',
    rules: 'required',
  },
  {
    label: '数据类型',
    fieldName: 'dataType',
    component: 'Select',
    componentProps: {
      options: getDictOptions('driver_data_type'),
    },
  },
  {
    label: '枚举值',
    fieldName: 'dataEnum',
    component: 'Textarea',
  },
  {
    label: '默认值',
    fieldName: 'defaultValue',
    component: 'Input',
  },
  {
    label: '最小值',
    fieldName: 'minValue',
    component: 'Input',
  },
  {
    label: '最大值',
    fieldName: 'maxValue',
    component: 'Input',
  },
  {
    label: '排序值',
    fieldName: 'orderNumber',
    component: 'Input',
  },
  {
    component: 'Hidden',
    show:false,
    fieldName: 'driverId',
  },

];
