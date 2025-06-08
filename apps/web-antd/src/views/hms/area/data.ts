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
    // show: false,
    // dependencies: {
    //   show: false,
    //   // 随意一个字段改变时，都会触发
    //   // triggerFields: ['field1Switch'],
    // },
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
    title: '小区性质',
    field: 'buildType',
    slots: {
      default: ({ row }) => {
        // 可选从DictEnum中获取 DictEnum.SYS_ENABLE_STATE 便于维护
        return renderDict(row.status, 'hms_build_type');
      },
    },
  },
  // {
  //   title: '类型',
  //   field: 'category',
  //   slots: {
  //     default: ({ row }) => {
  //       // 可选从DictEnum中获取 DictEnum.SYS_ENABLE_STATE 便于维护
  //       return renderDict(row.status, 'hms_area_category');
  //     },
  //   },
  // },
  // {
  //   title: '所属上级',
  //   field: 'parentId',
  // },
  // {
  //   title: '单元序号',
  //   field: 'unitNumber',
  // },
  // {
  //   title: '单元层数',
  //   field: 'unitFloor',
  // },
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
  // {
  //   title: '单元每层户数',
  //   field: 'unitRoomNumber',
  // },
  // {
  //   title: '户序号',
  //   field: 'roomNumber',
  // },
  // {
  //   title: '户所在楼层',
  //   field: 'roomFloorNumber',
  // },
  {
    title: '排序值',
    field: 'orderNum',
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
// 楼宇
export const columns_2: VxeGridProps['columns'] = [
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
  // {
  //   title: '站房',
  //   field: 'stationName',
  //   show: false,
  //   // dependencies: {
  //   //   show: false,
  //   //   // 随意一个字段改变时，都会触发
  //   //   // triggerFields: ['field1Switch'],
  //   // },
  // },
  {
    title: '采暖面积',
    field: 'heatArea',
  },
  {
    title: '供暖面积',
    field: 'buildArea',
  },
  // {
  //   title: '建筑类型',
  //   field: 'buildType',
  //   slots: {
  //     default: ({ row }) => {
  //       // 可选从DictEnum中获取 DictEnum.SYS_ENABLE_STATE 便于维护
  //       return renderDict(row.status, 'hms_build_type');
  //     },
  //   },
  // },
  // {
  //   title: '类型',
  //   field: 'category',
  //   slots: {
  //     default: ({ row }) => {
  //       // 可选从DictEnum中获取 DictEnum.SYS_ENABLE_STATE 便于维护
  //       return renderDict(row.status, 'hms_area_category');
  //     },
  //   },
  // },
  {
    title: '所属小区',
    field: 'parentId',
  },
  {
    title: '排序值',
    field: 'orderNum',
  },
  // {
  //   title: '单元序号',
  //   field: 'unitNumber',
  // },
  // {
  //   title: '单元层数',
  //   field: 'unitFloor',
  // },
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
  // {
  //   title: '单元每层户数',
  //   field: 'unitRoomNumber',
  // },
  // {
  //   title: '户序号',
  //   field: 'roomNumber',
  // },
  // {
  //   title: '户所在楼层',
  //   field: 'roomFloorNumber',
  // },
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
// 单元
export const columns_3: VxeGridProps['columns'] = [
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
  // {
  //   title: '站房',
  //   field: 'stationName',
  //   show: false,
  //   // dependencies: {
  //   //   show: false,
  //   //   // 随意一个字段改变时，都会触发
  //   //   // triggerFields: ['field1Switch'],
  //   // },
  // },
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
  // {
  //   title: '类型',
  //   field: 'category',
  //   slots: {
  //     default: ({ row }) => {
  //       // 可选从DictEnum中获取 DictEnum.SYS_ENABLE_STATE 便于维护
  //       return renderDict(row.status, 'hms_area_category');
  //     },
  //   },
  // },
  {
    title: '所属楼宇',
    field: 'parentId',
  },
  {
    title: '排序值',
    field: 'orderNum',
  },
  // {
  //   title: '单元序号',
  //   field: 'unitNumber',
  // },
  // {
  //   title: '单元层数',
  //   field: 'unitFloor',
  // },
  // {
  //   title: '控制方式',
  //   field: 'buildControlType',
  //   slots: {
  //     default: ({ row }) => {
  //       // 可选从DictEnum中获取 DictEnum.SYS_ENABLE_STATE 便于维护
  //       return renderDict(row.status, 'hms_control_type');
  //     },
  //   },
  // },
  // {
  //   title: '单元每层户数',
  //   field: 'unitRoomNumber',
  // },
  // {
  //   title: '户序号',
  //   field: 'roomNumber',
  // },
  // {
  //   title: '户所在楼层',
  //   field: 'roomFloorNumber',
  // },
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
// 住户
export const columns_4: VxeGridProps['columns'] = [
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
  // {
  //   title: '站房',
  //   field: 'stationName',
  //   show: false,
  //   // dependencies: {
  //   //   show: false,
  //   //   // 随意一个字段改变时，都会触发
  //   //   // triggerFields: ['field1Switch'],
  //   // },
  // },
  {
    title: '采暖面积',
    field: 'heatArea',
  },
  {
    title: '供暖面积',
    field: 'buildArea',
  },
  // {
  //   title: '建筑类型',
  //   field: 'buildType',
  //   slots: {
  //     default: ({ row }) => {
  //       // 可选从DictEnum中获取 DictEnum.SYS_ENABLE_STATE 便于维护
  //       return renderDict(row.status, 'hms_build_type');
  //     },
  //   },
  // },
  // {
  //   title: '类型',
  //   field: 'category',
  //   slots: {
  //     default: ({ row }) => {
  //       // 可选从DictEnum中获取 DictEnum.SYS_ENABLE_STATE 便于维护
  //       return renderDict(row.status, 'hms_area_category');
  //     },
  //   },
  // },
  {
    title: '所属单元',
    field: 'parentId',
  },
  {
    title: '排序值',
    field: 'orderNum',
  },
  // {
  //   title: '单元序号',
  //   field: 'unitNumber',
  // },
  // {
  //   title: '单元层数',
  //   field: 'unitFloor',
  // },
  // {
  //   title: '控制方式',
  //   field: 'buildControlType',
  //   slots: {
  //     default: ({ row }) => {
  //       // 可选从DictEnum中获取 DictEnum.SYS_ENABLE_STATE 便于维护
  //       return renderDict(row.status, 'hms_control_type');
  //     },
  //   },
  // },
  // {
  //   title: '单元每层户数',
  //   field: 'unitRoomNumber',
  // },
  // {
  //   title: '户序号',
  //   field: 'roomNumber',
  // },
  // {
  //   title: '户所在楼层',
  //   field: 'roomFloorNumber',
  // },
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
    dependencies: {
      if(values) {
        return values.category === 'area';
      },
      triggerFields: ['category'],
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
    dependencies: {
      if(values) {
        return values.category === 'build';
      },
      triggerFields: ['category'],
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
    // dependencies: {
    //   triggerFields: [''],
    //   show: () => false,
    // },
  },
  {
    label: '所属上级',
    fieldName: 'parentId',
    component: 'Input',
    dependencies: {
      if(values) {
        return values.category !== 'area';
      },
      triggerFields: ['category'],
    },
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
    dependencies: {
      if(values) {
        return values.category === 'build';
      },
      triggerFields: ['category'],
    },
  },
  {
    label: '户序号',
    fieldName: 'roomNumber',
    component: 'Input',
    dependencies: {
      if(values) {
        return values.category === 'room';
      },
      triggerFields: ['category'],
    },
  },
  {
    label: '户所在楼层',
    fieldName: 'roomFloorNumber',
    component: 'Input',
    dependencies: {
      if(values) {
        return values.category === 'room';
      },
      triggerFields: ['category'],
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
    component: 'Input',
  },
];
