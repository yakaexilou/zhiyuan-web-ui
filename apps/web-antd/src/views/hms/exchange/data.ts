import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { getPopupContainer } from '@vben/utils';

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
    fieldName: 'stationId',
    label: '所属站房',
    componentProps: {},
  },
  {
    component: 'Input',
    fieldName: 'code',
    label: '机组编码',
  },
];

// 需要使用i18n注意这里要改成getter形式 否则切换语言不会刷新
// export const columns: () => VxeGridProps['columns'] = () => [
export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60, fixed: 'left' },
  // {
  //   title: '',
  //   field: 'id',
  // },
  {
    title: '机组名称',
    field: 'name',
    fixed: 'left',
    minWidth: 80,
    showOverflow: 'ellipsis',
  },
  {
    title: '机组编码',
    field: 'code',
    fixed: 'left',
    minWidth: 80,
    showOverflow: 'ellipsis',
  },
  {
    title: '用途多选',
    field: 'purpose',
    minWidth: 80,
  },
  {
    title: '起始楼层',
    field: 'floorIndex',
    width: 80,
  },
  {
    title: '结束楼层',
    field: 'floorEnd',
    minWidth: 80,
  },
  {
    title: '所属站房',
    field: 'stationName',
    minWidth: 80,
  },
  {
    title: '设计一网供水范围',
    field: 'supplyTemp',
    minWidth: 80,
    formatter: ({ cellValue }) => {
      return Number.parseFloat(cellValue);
    },
  },
  {
    title: '一网供水可调范围',
    field: 'supplyTempRange',
    minWidth: 80,
    formatter: ({ cellValue }) => {
      return Number.parseFloat(cellValue);
    },
  },
  {
    title: '一网调节阀调节范围',
    field: 'supplyValveRange',
    minWidth: 80,
  },
  {
    title: '设计二网供水温度',
    field: 'supply2Temp',
    minWidth: 80,
  },
  {
    title: '二网供水温度可调范围',
    field: 'supply2TempRange',
    minWidth: 80,
  },
  {
    title: '二网回水温度设定值',
    field: 'return2Temp',
    minWidth: 80,
  },
  {
    title: '二网回水温度可调范围',
    field: 'return2TempRange',
    minWidth: 80,
  },
  {
    title: '二网水泵可调节范围',
    field: 'pumpFrequencyRange',
    minWidth: 80,
  },
  {
    title: '二网供压可调节范围',
    field: 'supply2PressRange',
    minWidth: 80,
  },
  {
    title: '二网回压可调节范围',
    field: 'return2PressRange',
    minWidth: 80,
  },
  {
    title: '二网压差可调节范围',
    field: 'pressDfifRange',
    minWidth: 80,
  },
  {
    title: '是否启用',
    field: 'status',
    minWidth: 80,
    slots: {
      default: ({ row }) => {
        // 可选从DictEnum中获取 DictEnum.SYS_ENABLE_STATE 便于维护
        return renderDict(row.status, 'sys_enable_state');
      },
    },
  },
  {
    title: '描述',
    field: 'description',
    minWidth: 80,
    showOverflow: 'ellipsis',
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
    label: '机组名称',
    fieldName: 'name',
    component: 'Input',
  },
  {
    label: '机组编码',
    fieldName: 'code',
    component: 'Input',
  },
  {
    label: '用途多选',
    fieldName: 'purpose',
    component: 'Input',
  },
  {
    label: '起始楼层',
    fieldName: 'floorIndex',
    component: 'Input',
  },
  {
    label: '结束楼层',
    fieldName: 'floorEnd',
    component: 'Input',
  },
  {
    label: '所属站房',
    fieldName: 'stationId',
    component: 'Select',
    componentProps: {
      getPopupContainer,
    },
  },
  {
    label: '设计一网供水范围',
    fieldName: 'supplyTemp',
    component: 'Input',
  },
  {
    label: '一网供水可调范围',
    fieldName: 'supplyTempRange',
    component: 'Input',
  },
  {
    label: '一网调节阀调节范围',
    fieldName: 'supplyValveRange',
    component: 'Input',
  },
  {
    label: '设计二网供水温度',
    fieldName: 'supply2Temp',
    component: 'Input',
  },
  {
    label: '二网供水温度可调范围',
    fieldName: 'supply2TempRange',
    component: 'Input',
  },
  {
    label: '二网回水温度设定值',
    fieldName: 'return2Temp',
    component: 'Input',
  },
  {
    label: '二网回水温度可调范围',
    fieldName: 'return2TempRange',
    component: 'Input',
  },
  {
    label: '二网水泵可调节范围',
    fieldName: 'pumpFrequencyRange',
    component: 'Input',
  },
  {
    label: '二网供压可调节范围',
    fieldName: 'supply2PressRange',
    component: 'Input',
  },
  {
    label: '二网回压可调节范围',
    fieldName: 'return2PressRange',
    component: 'Input',
  },
  {
    label: '二网压差可调节范围',
    fieldName: 'pressDfifRange',
    component: 'InputNumber',
    componentProps: {
      // 可选从DictEnum中获取 DictEnum.SYS_ENABLE_STATE 便于维护
      step: 0.001,
      min: 0,
      max: 999,
    },
  },
  {
    label: '是否启用',
    fieldName: 'status',
    component: 'RadioGroup',
    componentProps: {
      // 可选从DictEnum中获取 DictEnum.SYS_ENABLE_STATE 便于维护
      options: getDictOptions('sys_enable_state'),
      buttonStyle: 'solid',
      optionType: 'button',
    },
  },
  {
    label: '描述',
    fieldName: 'description',
    component: 'Textarea',
    formItemClass: 'items-start',
  },
];
