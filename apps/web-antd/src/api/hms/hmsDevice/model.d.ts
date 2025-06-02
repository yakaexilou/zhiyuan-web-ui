import type { BaseEntity, PageQuery } from '#/api/common';

export interface HmsDeviceVO {
  /**
   * ID
   */
  id: number | string;

  /**
   * 编码
   */
  code: string;

  /**
   * 关联设备ID
   */
  iotDeviceId: number | string;

  /**
   * 所属区域
   */
  areaId: number | string;

  /**
   * 所属部门
   */
  deptId: number | string;
}

export interface HmsDeviceForm extends BaseEntity {
  /**
   * ID
   */
  id?: number | string;

  /**
   * 编码
   */
  code?: string;

  /**
   * 关联设备ID
   */
  iotDeviceId?: number | string;

  /**
   * 所属区域
   */
  areaId?: number | string;

  /**
   * 所属部门
   */
  deptId?: number | string;
}

export interface HmsDeviceQuery extends PageQuery {
  /**
   * 编码
   */
  code?: string;

  /**
   * 关联设备ID
   */
  iotDeviceId?: number | string;

  /**
   * 所属区域
   */
  areaId?: number | string;

  /**
   * 所属部门
   */
  deptId?: number | string;

  /**
   * 日期范围参数
   */
  params?: any;
}
