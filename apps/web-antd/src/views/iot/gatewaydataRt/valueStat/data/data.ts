import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';
import {cqsFormat, dianLiangFormat} from "#/api/iot/gatewaydata";


export const querySchema: FormSchemaGetter = () => [];

// 需要使用i18n注意这里要改成getter形式 否则切换语言不会刷新
// export const columns: () => VxeGridProps['columns'] = () => [
export const columns: VxeGridProps['columns'] = [
  {
    title: 'id',
    field: 'id',
    visible: false,
  },
  {
    title: '设备编码',
    field: 'sn',
    minWidth: 250,
  },
  {
    title: '数据上报时间',
    field: 'time',
    minWidth: 150,
  },
  {
    title: '电池电量',
    field: 'batterypower',
    formatter: ({ cellValue }) => dianLiangFormat( cellValue ),
    minWidth:"150",
  },
  {
    title: '信号强度',
    field: 'csq',
    formatter: ({ cellValue }) => cqsFormat( cellValue ),
    minWidth:"150",
  },
  {
    title: '通讯ICCID',
    field: 'iccid',
    minWidth:"150",
  },
];

export const drawerSchema: FormSchemaGetter = () => [
];
