import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { getPopupContainer } from '@vben/utils';

import { getDictOptions } from '#/utils/dict';
import { renderDict } from '#/utils/render';

export const querySchema: FormSchemaGetter = () => [
  { component: 'Input', fieldName: 'name', label: '名称' },
  {
    component: 'Select',
    componentProps: { options: getDictOptions('product_type') },
    fieldName: 'type',
    label: '类别',
  },
];

export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
  { title: '名称', field: 'name', align: 'left' },
  {
    title: '类别',
    field: 'type',
    slots: {
      default: ({ row }) => {
        return renderDict(row.type, 'biz_product_type');
      },
    },
    align: 'left',
  },
  { title: '型号', field: 'model', align: 'left' },
  { title: '驱动协议', field: 'driverName' },
  {
    title: '协议号',
    field: 'protype',
    slots: {
      default: ({ row }) => {
        return renderDict(row.protype, 'product_pro_type');
      },
    },
  },
  { title: '数据使能', field: 'sensornumber' },
  {
    title: '节点类型',
    field: 'nodeType',
    slots: {
      default: ({ row }) => {
        return renderDict(row.nodeType, 'node_type');
      },
    },
  },
  {
    title: '联网方式',
    field: 'connectType',
    slots: {
      default: ({ row }) => {
        return renderDict(row.connectType, 'connect_type');
      },
    },
  },
  {
    title: '认证方式',
    field: 'registerType',
    slots: {
      default: ({ row }) => {
        return renderDict(row.registerType, 'regist_type');
      },
    },
  },
  { title: '描述', field: 'description' },
  {
    field: 'action',
    fixed: 'right',
    slots: { default: 'action' },
    title: '操作',
    width: 380,
  },
];

export const drawerSchema: FormSchemaGetter = () => [
  {
    label: 'ID',
    fieldName: 'id',
    component: 'Input',
    dependencies: { show: () => false, triggerFields: [''] },
  },
  { label: '名称', fieldName: 'name', component: 'Input' },
  {
    label: '类别',
    fieldName: 'type',
    component: 'Select',
    componentProps: { options: getDictOptions('biz_product_type') },
  },
  { label: '型号', fieldName: 'model', component: 'Input' },
  {
    label: '驱动协议',
    fieldName: 'driverId',
    component: 'Select',
    componentProps: { getPopupContainer },
  },
  {
    label: '驱动号',
    fieldName: 'protype',
    component: 'Select',
    componentProps: { options: getDictOptions('product_pro_type') },
  },
  { label: '数据使能', fieldName: 'sensornumber', component: 'Input' },
  {
    label: '节点类型',
    fieldName: 'nodeType',
    component: 'Select',
    componentProps: { options: getDictOptions('node_type') },
  },
  {
    label: '联网方式',
    fieldName: 'connectType',
    component: 'Select',
    componentProps: { options: getDictOptions('connect_type') },
  },
  {
    label: '认证方式',
    fieldName: 'registerType',
    component: 'Select',
    componentProps: { options: getDictOptions('regist_type') },
  },
  { label: '描述', fieldName: 'description', component: 'Input' },
];
