import type { PageQuery, BaseEntity } from '#/api/common';

export interface GatewaydataVO {
  /**
   * 设备编码
   */
  sn: string;

  /**
   * 电池电量
   */
  batterypower: string;

  /**
   * 信号强度
   */
  csq: number;

  /**
   * 通讯ICCID
   */
  iccid: string | number;

  /**
   * 数据上报时间
   */
  time: string;

}

export interface GatewaydataForm extends BaseEntity {
  /**
   * 设备编码
   */
  sn?: string;

  /**
   * 电池电量
   */
  batterypower?: string;

  /**
   * 信号强度
   */
  csq?: number;

  /**
   * 通讯ICCID
   */
  iccid?: string | number;

  /**
   * 数据上报时间
   */
  time?: string;

}

export interface GatewaydataQuery extends PageQuery {
  /**
   * 设备编码
   */
  sn?: string;

  /**
   * 通讯ICCID
   */
  iccid?: string | number;

}
