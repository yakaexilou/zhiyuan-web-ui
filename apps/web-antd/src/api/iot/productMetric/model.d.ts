import type { PageQuery, BaseEntity } from '#/api/common';

export interface ProductMetricVO {
  /**
   * 英文名称
   */
  name: string;

  /**
   * 中文名称
   */
  label: string;

  /**
   * 自动读取周期（秒）
   */
  readPeriod: number;

}

export interface ProductMetricForm extends BaseEntity {
  /**
   * 英文名称
   */
  name?: string;

  /**
   * 中文名称
   */
  label?: string;

  /**
   * 显示小数位
   */
  showPoint?: string;

  /**
   * 单位名称
   */
  unitName?: string;

  /**
   * 是否自动采集
   */
  isAutoRead?: number;

  /**
   * 自动读取周期（秒）
   */
  readPeriod?: number;

  /**
   * 关联驱动
   */
  driverAttribute?: string;

  /**
   * 关联产品
   */
  productId?: string | number;

}

export interface ProductMetricQuery extends PageQuery {
  /**
   * 英文名称
   */
  name?: string;

  /**
   * 中文名称
   */
  label?: string;

  /**
    * 日期范围参数
    */
  params?: any;
}
