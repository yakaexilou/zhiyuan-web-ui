import type { PageQuery, BaseEntity } from '#/api/common';

export interface DriverAttributeVO {
  /**
   * 名称英文
   */
  name: string;

  /**
   * 中文名称
   */
  label: string;

  /**
   * 数据类型
   */
  dataType: string;

  /**
   * 枚举值([{value:1,text:值名称}])
   */
  dataEnum: string;

  /**
   * 默认值
   */
  defaultValue: string;

  /**
   * 最小值，数字类型有效
   */
  minValue: string;

  /**
   * 最大值，数字类型有效
   */
  maxValue: string;

  /**
   * 排序值
   */
  orderNumber: number;

}

export interface DriverAttributeForm extends BaseEntity {

  /**
   * 名称英文
   */
  name?: string;

  /**
   * 中文名称
   */
  label?: string;

  /**
   * 数据类型
   */
  dataType?: string;

  /**
   * 枚举值([{value:1,text:值名称}])
   */
  dataEnum?: string;

  /**
   * 默认值
   */
  defaultValue?: string;

  /**
   * 最小值，数字类型有效
   */
  minValue?: string;

  /**
   * 最大值，数字类型有效
   */
  maxValue?: string;

  /**
   * 数值步长
   */
  numberStep?: number;

  /**
   * 所属驱动
   */
  driverId?: string | number;

  /**
   * 排序值
   */
  orderNumber?: number;

}

export interface DriverAttributeQuery extends PageQuery {
  /**
   * 名称英文
   */
  name?: string;

  /**
   * 中文名称
   */
  label?: string;

  /**
   * 所属驱动
   */
  driverId?: string | number;

  /**
   * 排序值
   */
  orderNumber?: number;

  /**
    * 日期范围参数
    */
  params?: any;
}
