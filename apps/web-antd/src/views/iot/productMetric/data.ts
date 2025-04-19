import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';


export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'name',
    label: '英文名称',
  },
  {
    component: 'Input',
    fieldName: 'label',
    label: '中文名称',
  },
];

// 需要使用i18n注意这里要改成getter形式 否则切换语言不会刷新
// export const columns: () => VxeGridProps['columns'] = () => [
export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
  {
    title: '英文名称',
    field: 'name',
  },
  {
    title: '中文名称',
    field: 'label',
  },
  {
    title: '自动读取周期',
    field: 'readPeriod',
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
    label: 'ID',
    fieldName: 'id',
    component: 'Input',
    dependencies: {
      show: () => false,
      triggerFields: [''],
    },
  },
  {
    label: '英文名称',
    fieldName: 'name',
    component: 'Input',
  },
  {
    label: '中文名称',
    fieldName: 'label',
    component: 'Input',
  },
  {
    label: '显示小数位',
    fieldName: 'showPoint',
    component: 'Input',
  },
  {
    label: '单位名称',
    fieldName: 'unitName',
    component: 'Input',
  },
  {
    label: '自动采集',
    fieldName: 'isAutoRead',
    component: 'Input',
  },
  {
    label: '读取周期',
    fieldName: 'readPeriod',
    component: 'Input',
  },
  {
    label: '驱动属性',
    fieldName: 'driverAttribute',
    component: 'Input',
  },
  {
    fieldName: 'productId',
    component: 'Hidden',
  },
];
