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
    component: 'Select',
    componentProps: {},
    fieldName: 'productId',
    label: '所属产品',
  },
  {
    component: 'Input',
    fieldName: 'code',
    label: '设备编码',
  },

  {
    component: 'RadioGroup',
    componentProps: {
      // 可选从DictEnum中获取 DictEnum.SYS_YES_NO 便于维护
      options: getDictOptions('sys_yes_no'),
      buttonStyle: 'solid',
      // optionType: 'button',
    },
    fieldName: 'online',
    label: '在线状态',
  },
  {
    component: 'Select',
    componentProps: {},
    fieldName: 'gatewayId',
    label: '硬件网关',
  },
];

// 需要使用i18n注意这里要改成getter形式 否则切换语言不会刷新
// export const columns: () => VxeGridProps['columns'] = () => [
export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
  {
    title: '',
    field: 'id',
  },
  {
    title: '名称',
    field: 'name',
  },
  {
    title: '所属产品',
    field: 'productId',
  },
  {
    title: '设备编码',
    field: 'code',
  },
  {
    title: '通讯地址',
    field: 'comAddr',
  },
  {
    title: '属性',
    field: 'attributes',
  },
  {
    title: '云网关(前置机)',
    field: 'cloudGatewayId',
  },
  {
    title: '硬件网关',
    field: 'gatewayId',
  },
  {
    title: '在线状态',
    field: 'online',
    slots: {
      default: ({ row }) => {
        // 可选从DictEnum中获取 DictEnum.SYS_YES_NO 便于维护
        return renderDict(row.online, 'sys_yes_no');
      },
    },
  },
  {
    title: '最后链接时间',
    field: 'lastRegisterTime',
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
    label: '所属产品',
    fieldName: 'productId',
    component: 'Select',
    componentProps: {},
  },
  {
    label: '设备编码',
    fieldName: 'code',
    component: 'Input',
  },
  {
    label: '通讯地址',
    fieldName: 'comAddr',
    component: 'Input',
  },
  {
    label: '属性',
    fieldName: 'attributes',
    component: 'Textarea',
  },
  {
    label: '云网关(前置机)',
    fieldName: 'cloudGatewayId',
    component: 'Select',
    componentProps: {},
  },
  {
    label: '硬件网关',
    fieldName: 'gatewayId',
    component: 'Select',
    componentProps: {},
  },
];
