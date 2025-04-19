import type { PageQuery, BaseEntity } from '#/api/common';

export interface ProductVO {
  /**
   * ID
   */
  id: string | number;

  /**
   * 名称
   */
  name: string;

  /**
   * 类别
   */
  type: string;

  /**
   * 型号
   */
  model: string;

  /**
   * 描述
   */
  description: string;

  /**
   * 驱动协议
   */
  driverId: string | number;

  /**
   * 节点类型
   */
  nodeType: string;

  /**
   * 联网方式
   */
  connectType: string;

  /**
   * 认证方式
   */
  registerType: string;

}

export interface ProductForm extends BaseEntity {
  /**
   * ID
   */
  id?: string | number;

  /**
   * 名称
   */
  name?: string;

  /**
   * 类别
   */
  type?: string;

  /**
   * 型号
   */
  model?: string;

  /**
   * 描述
   */
  description?: string;

  /**
   * 驱动协议
   */
  driverId?: string | number;

  /**
   * 节点类型
   */
  nodeType?: string;

  /**
   * 联网方式
   */
  connectType?: string;

  /**
   * 认证方式
   */
  registerType?: string;

}

export interface ProductQuery extends PageQuery {
  /**
   * 名称
   */
  name?: string;

  /**
   * 类别
   */
  type?: string;

  /**
    * 日期范围参数
    */
  params?: any;
}
