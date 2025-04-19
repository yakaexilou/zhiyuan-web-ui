import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';


export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'name',
    label: '网关名称',
  },
  {
    component: 'Input',
    fieldName: 'code',
    label: '网关编码',
  }
];

// 需要使用i18n注意这里要改成getter形式 否则切换语言不会刷新
// export const columns: () => VxeGridProps['columns'] = () => [
export const columns: VxeGridProps['columns'] = [
  {
    title: '网关名称',
    field: 'name',
  },
  {
    title: '网关编码',
    field: 'code',
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
    label: '',
    fieldName: 'id',
    component: 'Input',
    dependencies: {
      show: () => false,
      triggerFields: [''],
    },
  },
  {
    label: '网关名称',
    fieldName: 'name',
    component: 'Input',
    rules: 'required',
  },
  {
    label: '网关编码',
    fieldName: 'code',
    component: 'Input',
    rules: 'required',
  },
  {
    label: '',
    fieldName: 'lastRegisterTime',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
  },
];
