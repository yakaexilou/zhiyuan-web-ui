import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { getPopupContainer } from '@vben/utils';

export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'code',
    label: '编码',
  },
  {
    component: 'Input',
    fieldName: 'gateway_code',
    label: '所属网关',
  },
  {
    component: 'Input',
    fieldName: 'product_type',
    label: '产品类型',
  },
];

// 需要使用i18n注意这里要改成getter形式 否则切换语言不会刷新
// export const columns: () => VxeGridProps['columns'] = () => [
export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
  // {
  //   title: 'ID',
  //   field: 'id'
  // },
  {
    title: '所属区域',
    field: 'fullAddress',
  },
  {
    title: '网关编码',
    field: 'gatewayCode',
  },
  {
    title: '编码',
    field: 'code',
  },
  {
    title: '所属产品',
    field: 'productName',
  },
  {
    title: '通信地址',
    field: 'comAddr',
  },

  {
    field: 'action',
    fixed: 'right',
    slots: { default: 'action' },
    title: '操作',
    width: 180,
  },
];

export const modalSchema: FormSchemaGetter = () => [
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
    label: '所属区域',
    fieldName: 'areaId',
    component: 'Select',
    componentProps: {},
  },
  {
    label: '编码',
    fieldName: 'code',
    component: 'Input',
  },
  {
    label: '产品类型',
    fieldName: 'productId',
    component: 'Select',
    componentProps: {
      getPopupContainer,
    },
  },
  {
    label: '通讯地址',
    fieldName: 'comAddr',
    component: 'Input',
  },
  // {
  //   label: '云网关id',
  //   fieldName: 'cloudGatewayId',
  //   component: 'Input',
  // },
  {
    label: '网关',
    fieldName: 'gatewayId',
    component: 'Select',
    componentProps: {
      getPopupContainer,
    },
  },
];
