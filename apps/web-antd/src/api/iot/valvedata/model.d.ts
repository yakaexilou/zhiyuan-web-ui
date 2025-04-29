import type { PageQuery, BaseEntity } from '#/api/common';

export interface ValvedataVO {
  /**
   * 设备SN
   */
  sn: string;

  /**
   * 协议版本
   */
  cmd: string;

  /**
   * 电池电量
   */
  batterypower: number;

  /**
   * 报警
   */
  alarm: number;

  /**
   * 上报周期
   */
  period: number;

  /**
   * 数据使能1
   */
  d1: number;

  /**
   * 数据使能2
   */
  d2: number;

  /**
   * 数据使能3
   */
  d3: number;

  /**
   * 接收时间
   */
  addtime: string;
  /**
   * 采集时间
   */
  time: string;

  /**
   * 备用1
   */
  d1custom1: string;

  /**
   * 实时阀位
   */
  realposition: number;

  /**
   * 目标阀位
   */
  targetposition: number;

  /**
   * 回温
   */
  returntemp: number;

  /**
   * 目标回温
   */
  targetreturntemp: number;

  /**
   * 供温
   */
  supplytemp: number;

  /**
   * 瞬时流量
   */
  flow: number;

  /**
   * 瞬时功率
   */
  power: number;

  /**
   * 累计流量
   */
  flowrecorder: number;

  /**
   * 累计热力
   */
  powerrecorder: number;

  /**
   * 供压
   */
  supplypressure: number;

  /**
   * 回压
   */
  returnpressure: number;

  /**
   * 室温
   */
  roomtemp: number;

  /**
   * 目标室温
   */
  targetroomtemp: number;

  /**
   * 目标流量
   */
  targetflow: number;

  /**
   * 使能2备用8
   */
  d2custom8: string;

  /**
   * 使能3备用1
   */
  custom1: string;

  /**
   * 使能3备用2
   */
  custom2: string;

  /**
   * 使能3备用3
   */
  custom3: string;

  /**
   * 使能3备用4
   */
  custom4: string;

  /**
   * 使能3备用5
   */
  custom5: string;

  /**
   * 使能3备用6
   */
  custom6: string;

  /**
   * 使能3备用7
   */
  custom7: string;

  /**
   * 使能3备用8
   */
  custom8: string;

}

export interface ValvedataForm extends BaseEntity {
  /**
   * 设备SN
   */
  sn?: string;

}

export interface ValvedataQuery extends PageQuery {
  /**
   * 设备SN
   */
  sn?: string;

  /**
   * 协议版本
   */
  cmd?: string;

  /**
   * 采集时间
   */
  time?: string;

  /**
    * 日期范围参数
    */
  params?: any;
}
