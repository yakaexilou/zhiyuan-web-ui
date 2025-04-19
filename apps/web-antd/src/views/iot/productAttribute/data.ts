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
    fieldName: 'label',
    label: '显示名',
  },
];

// 需要使用i18n注意这里要改成getter形式 否则切换语言不会刷新
// export const columns: () => VxeGridProps['columns'] = () => [
export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
  {
    title: '名称',
    field: 'name',
  },
  {
    title: '显示名',
    field: 'label',
  },
  {
    title: '格式类型',
    field: 'type',
    slots: {
      default: ({ row }) => {
        // 可选从DictEnum中获取 DictEnum.DRIVER_DATA_TYPE 便于维护
        return renderDict(row.type, 'driver_data_type');
      },
    },
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
    label: '名称',
    fieldName: 'name',
    component: 'Input',
  },
  {
    label: '显示名',
    fieldName: 'label',
    component: 'Input',
  },
  {
    label: 'option',
    fieldName: 'options',
    component: 'Textarea',
  },
  {
    label: 'atts',
    fieldName: 'attributes',
    component: 'Textarea',
  },
  {
    fieldName: 'productId',
    component: 'Hidden',
    show:false,
  },
  {
    label: '格式类型',
    fieldName: 'type',
    component: 'Select',
    componentProps: {
      // 可选从DictEnum中获取 DictEnum.DRIVER_DATA_TYPE 便于维护
      options: getDictOptions('driver_data_type'),
    },
  },
  {
    label: '最大值',
    fieldName: 'maxVal',
    component: 'Input',
  },
  {
    label: '最小值',
    fieldName: 'minVal',
    component: 'Input',
  },
];
