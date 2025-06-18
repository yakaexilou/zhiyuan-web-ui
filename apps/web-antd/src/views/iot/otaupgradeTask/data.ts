import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';
import {getPopupContainer} from "@vben/utils";
import {renderDict} from "#/utils/render";


export const querySchema: FormSchemaGetter = () => [
  {    component: 'Input',    fieldName: 'name',    label: '任务名称',  },
  {    component: 'RadioGroup',    componentProps: {      buttonStyle: 'solid',      optionType: 'button',    },    fieldName: 'taskstatus',    label: '启动状态',  },
];

export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
  {    title: '',    field: 'id', visible:false },
  {    title: '创建时间',    field: 'createTime',  },
  {    title: '任务名称',    field: 'name',  },
  {    title: '升级操作',    field: 'fileName',  },
  {    title: '开始时间',    field: 'startdate',  width: 150,},
  {    title: '结束时间',    field: 'enddate',  width: 150,},
  {    title: '启动状态',    field: 'taskstatus',    minWidth: 120,    slots: {      default: ({ row }) => {        return renderDict(row.taskstatus, 'upgrade_stat');      },    },  },
  {    title: '设备总量',    field: 'devsize',  },
  {    title: '升级总量',    field: 'upgradesize',  },
  {    field: 'action',    fixed: 'right',    slots: { default: 'action' },    title: '操作',    minWidth: 280,  },
];

export const drawerSchema: FormSchemaGetter = () => [
  {    label: '任务名称',    fieldName: 'name',    component: 'Input',  },
  {    label: '升级操作',    fieldName: 'fileId',    component: 'Select',    componentProps: {      getPopupContainer,    },    rules: 'selectRequired', },
  {    label: '开始时间',    fieldName: 'startdate',    component: 'DatePicker',    componentProps: {      showTime: true,      format: 'YYYY-MM-DD HH:mm:ss',      valueFormat: 'YYYY-MM-DD HH:mm:ss',    },    rules: 'required',  },
  {    label: '结束时间',    fieldName: 'enddate',    component: 'DatePicker',    componentProps: {      showTime: true,      format: 'YYYY-MM-DD HH:mm:ss',      valueFormat: 'YYYY-MM-DD HH:mm:ss',    },    rules: 'required',  },
  {    fieldName: 'devsize',    component: 'hidden', defaultValue:'0'  },
  {    fieldName: 'upgradesize',    component: 'hidden', defaultValue:'0' },
];
