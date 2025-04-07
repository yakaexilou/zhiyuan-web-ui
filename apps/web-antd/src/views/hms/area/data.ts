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
    component: 'Input',
    fieldName: 'code',
    label: '编码',
  },
  {
    component: 'Select',
    componentProps: {},
    fieldName: 'stationId',
    label: '站房',
  },

  {
    component: 'RadioGroup',
    componentProps: {
      // 可选从DictEnum中获取 DictEnum.SYS_ENABLE_STATE 便于维护
      options: getDictOptions('sys_enable_state'),
      buttonStyle: 'solid',
      optionType: 'button',
    },
    fieldName: 'status',
    label: '是否启用',
  },
];

// 需要使用i18n注意这里要改成getter形式 否则切换语言不会刷新
// export const columns: () => VxeGridProps['columns'] = () => [
export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
  // {
  //   title: 'ID',
  //   field: 'id',
  // },
  {
    title: '名称',
    field: 'name',
  },
  {
    title: '编码',
    field: 'code',
  },
  {
    title: '站房',
    field: 'stationName',
  },
  {
    title: '采暖面积',
    field: 'heatArea',
  },
  {
    title: '供暖面积',
    field: 'buildArea',
  },
  {
    title: '建筑类型',
    field: 'buildType',
    slots: {
      default: ({ row }) => {
        // 可选从DictEnum中获取 DictEnum.SYS_ENABLE_STATE 便于维护
        return renderDict(row.status, 'hms_build_type');
      },
    },
  },
  {
    title: '类型',
    field: 'category',
    slots: {
      default: ({ row }) => {
        // 可选从DictEnum中获取 DictEnum.SYS_ENABLE_STATE 便于维护
        return renderDict(row.status, 'hms_area_category');
      },
    },
  },
  {
    title: '所属上级',
    field: 'parentId',
  },
  {
    title: '单元序号',
    field: 'unitNumber',
  },
  {
    title: '单元层数',
    field: 'unitFloor',
  },
  {
    title: '控制方式',
    field: 'buildControlType',
    slots: {
      default: ({ row }) => {
        // 可选从DictEnum中获取 DictEnum.SYS_ENABLE_STATE 便于维护
        return renderDict(row.status, 'hms_control_type');
      },
    },
  },
  {
    title: '单元每层户数',
    field: 'unitRoomNumber',
  },
  {
    title: '户序号',
    field: 'roomNumber',
  },
  {
    title: '户所在楼层',
    field: 'roomFloorNumber',
  },
  {
    title: '是否启用',
    field: 'status',
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
    label: '编码',
    fieldName: 'code',
    component: 'Input',
  },
  {
    label: '站房',
    fieldName: 'stationId',
    component: 'Select',
    componentProps: {
      getPopupContainer,
    },
  },
  {
    label: '采暖面积',
    fieldName: 'heatArea',
    component: 'Input',
  },
  {
    label: '供暖面积',
    fieldName: 'buildArea',
    component: 'Input',
  },
  {
    label: '建筑类型',
    fieldName: 'buildType',
    component: 'Select',
    componentProps: {
      options: getDictOptions('hms_build_type'),
      buttonStyle: 'solid',
      optionType: 'button',
    },
  },
  {
    label: '类型',
    fieldName: 'category',
    component: 'Select',
    componentProps: {
      options: getDictOptions('hms_area_category'),
      buttonStyle: 'solid',
      optionType: 'button',
    },
  },
  {
    label: '所属上级',
    fieldName: 'parentId',
    component: 'Input',
  },
  {
    label: '单元序号',
    fieldName: 'unitNumber',
    component: 'Input',
  },
  {
    label: '单元层数',
    fieldName: 'unitFloor',
    component: 'Input',
  },
  {
    label: '控制方式',
    fieldName: 'buildControlType',
    component: 'Select',
    componentProps: {
      options: getDictOptions('hms_control_type'),
      buttonStyle: 'solid',
      optionType: 'button',
    },
  },
  {
    label: '单元每层户数',
    fieldName: 'unitRoomNumber',
    component: 'Input',
  },
  {
    label: '户序号',
    fieldName: 'roomNumber',
    component: 'Input',
  },
  {
    label: '户所在楼层',
    fieldName: 'roomFloorNumber',
    component: 'Input',
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
    component: 'Input',
  },
];
