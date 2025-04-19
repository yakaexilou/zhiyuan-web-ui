import type { PageQuery, BaseEntity } from '#/api/common';

export interface DeviceVO {
  /**
   * ID
   */
  id: string | number;

  /**
   * 名称
   */
  name: string;

  /**
   * 设备编码
   */
  code: string;

  /**
   * 产品类型
   */
  productId: string | number;

  /**
   * 通讯地址
   */
  comAddr: string;

  /**
   * 是否在线
   */
  online: number;

  /**
   * 注册时间
   */
  lastRegisterTime: string;

}

export interface DeviceForm extends BaseEntity {
  /**
   * ID
   */
  id?: string | number;

  /**
   * 名称
   */
  name?: string;

  /**
   * 设备编码
   */
  code?: string;

  /**
   * 产品类型
   */
  productId?: string | number;

  /**
   * 通讯地址
   */
  comAddr?: string;

  /**
   * 云网关id
   */
  cloudGatewayId?: string | number;

  /**
   * 网关
   */
  gatewayId?: string | number;

  /**
   * 设备属性
   */
  attributes?: string;

  /**
   * 注册时间
   */
  lastRegisterTime?: string;

}

export interface DeviceQuery extends PageQuery {
  /**
   * 名称
   */
  name?: string;

  /**
   * 设备编码
   */
  code?: string;

  /**
    * 日期范围参数
    */
  params?: any;
}
