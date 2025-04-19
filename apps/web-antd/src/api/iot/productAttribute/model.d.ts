import type { PageQuery, BaseEntity } from '#/api/common';

export interface ProductAttributeVO {
  /**
   * 名称
   */
  name: string;

  /**
   * 显示名
   */
  label: string;

  /**
   * 格式类型
   */
  type: string;

}

export interface ProductAttributeForm extends BaseEntity {
  /**
   * ID
   */
  id?: string | number;

  /**
   * 名称
   */
  name?: string;

  /**
   * 显示名
   */
  label?: string;

  /**
   * option
   */
  options?: string;

  /**
   * atts
   */
  attributes?: string;

  /**
   * 产品ID
   */
  productId?: string | number;

  /**
   * 格式类型
   */
  type?: string;

  /**
   * 最大值
   */
  maxVal?: number;

  /**
   * 最小值
   */
  minVal?: number;

}

export interface ProductAttributeQuery extends PageQuery {
  /**
   * 名称
   */
  name?: string;

  /**
   * 显示名
   */
  label?: string;

  /**
    * 日期范围参数
    */
  params?: any;
}
