import type {FormSchemaGetter} from '#/adapter/form';
import type {VxeGridProps} from '#/adapter/vxe-table';

export const querySchema: FormSchemaGetter = () => [
  {    component: 'Input',    fieldName: 'name',    label: '名称',  },
  {    component: 'Input',    fieldName: 'code',    label: '设备编码',  },
  {    label: '网关',    fieldName: 'gatewayCode',    component: 'Input',  },
];

export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
  {    title: '名称',    field: 'name',  },
  {    title: '设备编码',    field: 'code',  },
  {    title: '产品类型',    field: 'productName',  },
  {    title: '网关ID',    field: 'gatewayName',  },
  {    title: '通讯地址',    field: 'comAddr',  },
  {    title: '注册时间',    field: 'lastRegisterTime',  },
];

export const drawerSchema: FormSchemaGetter = () => [];
