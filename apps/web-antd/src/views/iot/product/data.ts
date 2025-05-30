import type {FormSchemaGetter} from '#/adapter/form';
import type {VxeGridProps} from '#/adapter/vxe-table';

import {getDictOptions} from '#/utils/dict';
import {renderDict} from '#/utils/render';


import {getPopupContainer} from '@vben/utils';


export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'name',
    label: '名称',
  },
  {
    component: 'Select',
    componentProps: {
      // 可选从DictEnum中获取 DictEnum.PRODUCT_TYPE 便于维护
      options: getDictOptions('product_type'),
    },
    fieldName: 'type',
    label: '类别',
  },
];

// 需要使用i18n注意这里要改成getter形式 否则切换语言不会刷新
// export const columns: () => VxeGridProps['columns'] = () => [
export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
  {
    title: '名称',
    field: 'name',
    align: 'left',
  },
  {
    title: '类别',
    field: 'type',
    slots: {
      default: ({ row }) => {
        // 可选从DictEnum中获取 DictEnum.PRODUCT_TYPE 便于维护
        return renderDict(row.type, 'biz_product_type');
      },
    },
    align: 'left',
  },
  {
    title: '型号',
    field: 'model',
    align: 'left',
  },
  {
    title: '驱动协议',
    field: 'driverName',
  },
  {
    title: '协议号',
    field: 'protype',
    slots: {
      default: ({ row }) => {
        return renderDict(row.protype, 'product_pro_type');
      },
    },
  },

  {
    title: '节点类型',
    field: 'nodeType',
    slots: {
      default: ({ row }) => {
        // 可选从DictEnum中获取 DictEnum.NODE_TYPE 便于维护
        return renderDict(row.nodeType, 'node_type');
      },
    },
  },
  {
    title: '联网方式',
    field: 'connectType',
    slots: {
      default: ({ row }) => {
        // 可选从DictEnum中获取 DictEnum.CONNECT_TYPE 便于维护
        return renderDict(row.connectType, 'connect_type');
      },
    },
  },
  {
    title: '认证方式',
    field: 'registerType',
    slots: {
      default: ({ row }) => {
        // 可选从DictEnum中获取 DictEnum.REGIST_TYPE 便于维护
        return renderDict(row.registerType, 'regist_type');
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
    width: 380,
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
    label: '类别',
    fieldName: 'type',
    component: 'Select',
    componentProps: {
      // 可选从DictEnum中获取 DictEnum.PRODUCT_TYPE 便于维护
      options: getDictOptions('biz_product_type'),
    },
  },
  {
    label: '型号',
    fieldName: 'model',
    component: 'Input',
  },
  {
    label: '驱动协议',
    fieldName: 'driverId',
    component: 'Select',
    componentProps: {
      getPopupContainer,
    },
  },
  {
    label: '驱动号',
    fieldName: 'protype',
    component: 'Select',
    componentProps: {
      options: getDictOptions('product_pro_type'),
    },
  },
  {
    label: '节点类型',
    fieldName: 'nodeType',
    component: 'Select',
    componentProps: {
      // 可选从DictEnum中获取 DictEnum.NODE_TYPE 便于维护
      options: getDictOptions('node_type'),
    },
  },
  {
    label: '联网方式',
    fieldName: 'connectType',
    component: 'Select',
    componentProps: {
      // 可选从DictEnum中获取 DictEnum.CONNECT_TYPE 便于维护
      options: getDictOptions('connect_type'),
    },
  },
  {
    label: '认证方式',
    fieldName: 'registerType',
    component: 'Select',
    componentProps: {
      // 可选从DictEnum中获取 DictEnum.REGIST_TYPE 便于维护
      options: getDictOptions('regist_type'),
    },
  },
  {
    label: '描述',
    fieldName: 'description',
    component: 'Input',
  },
];
