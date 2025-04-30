import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';
import { getPopupContainer } from '@vben/utils';
import {renderDict} from "#/utils/render";
import {getDictOptions} from "#/utils/dict";

export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'name',
    label: '名称',
  },
  {
    component: 'Input',
    fieldName: 'code',
    label: '设备编码',
  },
  {
    component: 'Select',
    componentProps: {
      options: getDictOptions('dev_stat'),
    },
    fieldName: 'online',
    label: '状态',
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
    title: '状态',
    field: 'devStat',
    width: 60,
    slots: {
      default: ({ row }) => {
        return renderDict(row.online, 'dev_stat');
      },
    },
  },
  {
    title: '设备编码',
    field: 'code',
  },
  {
    title: '产品类型',
    field: 'productName',
  },
  {
    title: '网关ID',
    field: 'gatewayName',
  },
  {
    title: '通讯地址',
    field: 'comAddr',
  },
  {
    title: '注册时间',
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
    label: '设备编码',
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
  {
    label: '云网关id',
    fieldName: 'cloudGatewayId',
    component: 'Input',
  },
  {
    label: '网关',
    fieldName: 'gatewayId',
    component: 'Select',
    componentProps: {
      getPopupContainer,
    },
  },
  {
    label: '注册时间',
    fieldName: 'lastRegisterTime',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
  },
  {
    fieldName: 'attributes',
    component: 'Hidden',
    show: false,
  }
];
