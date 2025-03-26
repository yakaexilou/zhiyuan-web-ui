import type { PageQuery, BaseEntity } from '#/api/common';

export interface DeviceVO {
  /**
   * 
   */
  id: string | number;

  /**
   * 名称
   */
  name: string;

  /**
   * 所属产品
   */
  productId: string | number;

  /**
   * 设备编码
   */
  code: string;

  /**
   * 通讯地址
   */
  comAddr: string;

  /**
   * 属性
   */
  attributes: string;

  /**
   * 云网关(前置机)
   */
  cloudGatewayId: string | number;

  /**
   * 硬件网关
   */
  gatewayId: string | number;

  /**
   * 在线状态
   */
  online: number;

  /**
   * 最后链接时间
   */
  lastRegisterTime: string;

}

export interface DeviceForm extends BaseEntity {
  /**
   * 
   */
  id?: string | number;

  /**
   * 名称
   */
  name?: string;

  /**
   * 所属产品
   */
  productId?: string | number;

  /**
   * 设备编码
   */
  code?: string;

  /**
   * 通讯地址
   */
  comAddr?: string;

  /**
   * 属性
   */
  attributes?: string;

  /**
   * 云网关(前置机)
   */
  cloudGatewayId?: string | number;

  /**
   * 硬件网关
   */
  gatewayId?: string | number;

  /**
   * 在线状态
   */
  online?: number;

  /**
   * 最后链接时间
   */
  lastRegisterTime?: string;

}

export interface DeviceQuery extends PageQuery {
  /**
   * 名称
   */
  name?: string;

  /**
   * 所属产品
   */
  productId?: string | number;

  /**
   * 设备编码
   */
  code?: string;

  /**
   * 硬件网关
   */
  gatewayId?: string | number;

  /**
   * 在线状态
   */
  online?: number;

  /**
    * 日期范围参数
    */
  params?: any;
}
