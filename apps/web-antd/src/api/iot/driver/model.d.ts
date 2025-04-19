import type { PageQuery, BaseEntity } from '#/api/common';

export interface DriverVO {
  /**
   * ID
   */
  id: string | number;

  /**
   * 驱动名称
   */
  name: string;

  /**
   * 驱动编码
   */
  code: string;

  /**
   * 通信方式
   */
  commType: string;

}
export interface DriverDmVO {
  /**
   * ID
   */
  id: string | number;

  /**
   * 驱动名称
   */
  name: string;
}

export interface DriverForm extends BaseEntity {
  /**
   * ID
   */
  id?: string | number;

  /**
   * 驱动名称
   */
  name?: string;

  /**
   * 驱动编码
   */
  code?: string;

  /**
   * 通信方式
   */
  commType?: string;

  /**
   * 配置信息
   */
  config?: string;

}

export interface DriverQuery extends PageQuery {
  /**
   * 驱动名称
   */
  name?: string;

  /**
   * 驱动编码
   */
  code?: string;

  /**
   * 通信方式
   */
  commType?: string;

  /**
    * 日期范围参数
    */
  params?: any;
}
