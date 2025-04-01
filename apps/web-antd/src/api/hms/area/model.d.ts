import type { BaseEntity, PageQuery } from '#/api/common';

export interface AreaVO {
  /**
   * ID
   */
  id: number | string;

  /**
   * 名称
   */
  name: string;

  /**
   * 编码
   */
  code: string;

  /**
   * 站房
   */
  stationId: number | string;

  /**
   * 采暖面积
   */
  heatArea: number;

  /**
   * 供暖面积
   */
  buildArea: number;

  /**
   * 建筑类型（公建，学校，居民住宅，厂房，公共宿舍）
   */
  buildType: string;

  /**
   * 类型（小区，楼栋，单元，户，组，）
   */
  category: number;

  /**
   * 所属上级
   */
  parentId: number | string;

  /**
   * 单元序号
   */
  unitNumber: number;

  /**
   * 单元层数
   */
  unitFloor: number;

  /**
   * 控制方式（单元调控，户调控）多选
   */
  buildControlType: string;

  /**
   * 单元每层户数
   */
  unitRoomNumber: number;

  /**
   * 户序号
   */
  roomNumber: number;

  /**
   * 户所在楼层
   */
  roomFloorNumber: number;

  /**
   * 是否启用
   */
  status: number;

  /**
   * 描述
   */
  description: string;
}

export interface AreaForm extends BaseEntity {
  /**
   * ID
   */
  id?: number | string;

  /**
   * 名称
   */
  name?: string;

  /**
   * 编码
   */
  code?: string;

  /**
   * 站房
   */
  stationId?: number | string;

  /**
   * 采暖面积
   */
  heatArea?: number;

  /**
   * 供暖面积
   */
  buildArea?: number;

  /**
   * 建筑类型（公建，学校，居民住宅，厂房，公共宿舍）
   */
  buildType?: string;

  /**
   * 类型（小区，楼栋，单元，户，组，）
   */
  category?: number;

  /**
   * 所属上级
   */
  parentId?: number | string;

  /**
   * 单元序号
   */
  unitNumber?: number;

  /**
   * 单元层数
   */
  unitFloor?: number;

  /**
   * 控制方式（单元调控，户调控）多选
   */
  buildControlType?: string;

  /**
   * 单元每层户数
   */
  unitRoomNumber?: number;

  /**
   * 户序号
   */
  roomNumber?: number;

  /**
   * 户所在楼层
   */
  roomFloorNumber?: number;

  /**
   * 是否启用
   */
  status?: number;

  /**
   * 描述
   */
  description?: string;
}

export interface AreaQuery extends PageQuery {
  /**
   * 名称
   */
  name?: string;

  /**
   * 编码
   */
  code?: string;

  /**
   * 站房
   */
  stationId?: number | string;

  /**
   * 采暖面积
   */
  heatArea?: number;

  /**
   * 供暖面积
   */
  buildArea?: number;

  /**
   * 建筑类型（公建，学校，居民住宅，厂房，公共宿舍）
   */
  buildType?: string;

  /**
   * 类型（小区，楼栋，单元，户，组，）
   */
  category?: number;

  /**
   * 所属上级
   */
  parentId?: number | string;

  /**
   * 单元序号
   */
  unitNumber?: number;

  /**
   * 单元层数
   */
  unitFloor?: number;

  /**
   * 控制方式（单元调控，户调控）多选
   */
  buildControlType?: string;

  /**
   * 单元每层户数
   */
  unitRoomNumber?: number;

  /**
   * 户序号
   */
  roomNumber?: number;

  /**
   * 户所在楼层
   */
  roomFloorNumber?: number;

  /**
   * 是否启用
   */
  status?: number;

  /**
   * 描述
   */
  description?: string;

  /**
   * 日期范围参数
   */
  params?: any;
}
