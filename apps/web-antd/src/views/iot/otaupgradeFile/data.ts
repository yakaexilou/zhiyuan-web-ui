import type {FormSchemaGetter} from '#/adapter/form';
import type {VxeGridProps} from '#/adapter/vxe-table';
import {getPopupContainer} from "@vben/utils";
import {otaupgradeUpFile, upFileInfo} from "#/api/iot/otaupgradeFile";
import {disFileSize} from "#/api/iot/gatewaydata";


export const querySchema: FormSchemaGetter = () => [
  {    component: 'Input',    fieldName: 'name',    label: '升级操作',  },
  {    component: 'Select',    componentProps: {      getPopupContainer,    },    fieldName: 'productId',    label: '产品类型',  },
];


export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
  {    title: 'ID',    field: 'id',    visible:false ,  },
  {    title: '创建时间',    field: 'createTime',  },
  {    title: '升级操作',    field: 'name',  },
  {    title: '升级前版本',    field: 'oldvesion',  },
  {    title: '当前版本',    field: 'newvesion',  },
  {    title: '产品类型',    field: 'productName',  },
  {    title: '文件名',    field: 'filename',  },
  {    title: '分包大小',    field: 'packsize',  },
  {    title: '文件大小',    field: 'filesize',    formatter: ({ cellValue }) => disFileSize( cellValue ),  },
  {    field: 'action',    fixed: 'right',    slots: { default: 'action' },    title: '操作',    width: 180,  },
];

export const drawerSchema: FormSchemaGetter = () => [
  {    label: '升级操作',    fieldName: 'name',    component: 'Input',    rules: 'required',    defaultValue: '输入升级标题',  },
  {    label: '升级前版本',    fieldName: 'oldvesion',    component: 'Input',    rules: 'required',    defaultValue: '1.0',  },
  {    label: '当前版本',    fieldName: 'newvesion',    component: 'Input',    rules: 'required',    defaultValue: '1.2',  },
  {    label: '产品类型',    fieldName: 'productId',    component: 'Select',    componentProps: {      getPopupContainer,    },    rules: 'selectRequired',    defaultValue: '2',  },
  {    fieldName: 'packsize',    component: 'hidden',    defaultValue: '450',  },
  {    fieldName: 'filecontent',    component: 'hidden',    defaultValue: '',  },
  {    fieldName: 'filesize',    component: 'hidden',    defaultValue: '',  },
  {    fieldName: 'filename',    component: 'hidden',    defaultValue: '',  },
  {    label: '升级文件',    fieldName: 'fileupdate',    component: 'FileUpload',    componentProps:{      api:otaupgradeUpFile,      onChange:upFileInfo,    }  },
];
