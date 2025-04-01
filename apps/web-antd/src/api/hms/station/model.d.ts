import type { BaseEntity, PageQuery } from '#/api/common';

export interface StationVO {
  /**
   *
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
   * 距离上级节点距离 单位km
   */
  length: number;

  /**
   * 建筑面积
   */
  buildArea: number;

  /**
   * 入网面积
   */
  onnetArea: number;

  /**
   * 排序
   */
  sequence: number;

  /**
   * 状态
   */
  status: number;

  /**
   * 是否删除
   */
  deleted: number;

  /**
   * 描述
   */
  description: string;
}

export interface StationForm extends BaseEntity {
  /**
   *
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
   * 距离上级节点距离 单位km
   */
  length?: number;

  /**
   * 建筑面积
   */
  buildArea?: number;

  /**
   * 入网面积
   */
  onnetArea?: number;

  /**
   * 排序
   */
  sequence?: number;

  /**
   * 状态
   */
  status?: number;

  /**
   * 是否删除
   */
  deleted?: number;

  /**
   * 描述
   */
  description?: string;
}

export interface StationQuery extends PageQuery {
  /**
   * 名称
   */
  name?: string;

  /**
   * 编码
   */
  code?: string;
  /**
   * 状态
   */
  status?: number;

}
