import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { getDictOptions } from '#/utils/dict';
import { renderDict } from '#/utils/render';

export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'name',
    label: '驱动名称',
  },
  {
    component: 'Input',
    fieldName: 'code',
    label: '驱动编码',
  },
  {
    component: 'Select',
    componentProps: {
      // 可选从DictEnum中获取 DictEnum.COMM_TYPE 便于维护
      options: getDictOptions('comm_type'),
    },
    fieldName: 'commType',
    label: '通信方式',
  },
];

// 需要使用i18n注意这里要改成getter形式 否则切换语言不会刷新
// export const columns: () => VxeGridProps['columns'] = () => [
export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
  {
    title: '驱动名称',
    field: 'name',
    align: 'left'
  },
  {
    title: '驱动编码',
    field: 'code',
    align: 'left'
  },
  {
    title: '通信方式',
    field: 'commType',
    fixed: 'center',
    slots: {
      default: ({ row }) => {
        // 可选从DictEnum中获取 DictEnum.COMM_TYPE 便于维护
        return renderDict(row.commType, 'comm_type');
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
    label: '驱动名称',
    fieldName: 'name',
    component: 'Input',
  },
  {
    label: '驱动编码',
    fieldName: 'code',
    component: 'Input',
  },
  {
    label: '通信方式',
    fieldName: 'commType',
    component: 'Select',
    componentProps: {
      // 可选从DictEnum中获取 DictEnum.COMM_TYPE 便于维护
      options: getDictOptions('comm_type'),
    },
  },
  {
    label: '配置信息',
    fieldName: 'config',
    component: 'Textarea',
  },
];
