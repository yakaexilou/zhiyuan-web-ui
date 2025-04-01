import type { BaseEntity, PageQuery } from '#/api/common';

export interface ExchangeVO {
  /**
   *
   */
  id: number | string;

  /**
   * 名称
   */
  name: string;

  /**
   * 用途多选（换热，混水，增压）
   */
  purpose: number;

  /**
   * 起始楼层
   */
  floorIndex: number;

  /**
   * 结束楼层
   */
  floorEnd: number;

  /**
   * 所属站房
   */
  stationId: number;

  /**
   * 设计一网供水范围
   */
  supplyTemp: number;

  /**
   * 一网供水可调范围
   */
  supplyTempRange: number;

  /**
   * 一网调节阀调节范围
   */
  supplyValveRange: string;

  /**
   * 设计二网供水温度
   */
  supply2Temp: number;

  /**
   * 二网供水温度可调范围
   */
  supply2TempRange: number;

  /**
   * 二网回水温度设定值
   */
  return2Temp: number;

  /**
   * 二网回水温度可调范围
   */
  return2TempRange: number;

  /**
   * 二网水泵可调节范围
   */
  pumpFrequencyRange: number;

  /**
   * 二网供压可调节范围
   */
  supply2PressRange: number;

  /**
   * 二网回压可调节范围
   */
  return2PressRange: number;

  /**
   * 二网压差可调节范围
   */
  pressDfifRange: number;

  /**
   * 是否启用
   */
  status: boolean;

  /**
   * 描述
   */
  description: string;

  /**
   * 机组编码规则
   */
  code: string;
}

export interface ExchangeForm extends BaseEntity {
  /**
   *
   */
  id?: number | string;

  /**
   * 名称
   */
  name?: string;

  /**
   * 用途多选（换热，混水，增压）
   */
  purpose?: number;

  /**
   * 起始楼层
   */
  floorIndex?: number;

  /**
   * 结束楼层
   */
  floorEnd?: number;

  /**
   * 所属站房
   */
  stationId?: number;

  /**
   * 设计一网供水范围
   */
  supplyTemp?: number;

  /**
   * 一网供水可调范围
   */
  supplyTempRange?: number;

  /**
   * 一网调节阀调节范围
   */
  supplyValveRange?: string;

  /**
   * 设计二网供水温度
   */
  supply2Temp?: number;

  /**
   * 二网供水温度可调范围
   */
  supply2TempRange?: number;

  /**
   * 二网回水温度设定值
   */
  return2Temp?: number;

  /**
   * 二网回水温度可调范围
   */
  return2TempRange?: number;

  /**
   * 二网水泵可调节范围
   */
  pumpFrequencyRange?: number;

  /**
   * 二网供压可调节范围
   */
  supply2PressRange?: number;

  /**
   * 二网回压可调节范围
   */
  return2PressRange?: number;

  /**
   * 二网压差可调节范围
   */
  pressDfifRange?: number;

  /**
   * 是否启用
   */
  status?: boolean;

  /**
   * 描述
   */
  description?: string;

  /**
   * 机组编码规则
   */
  code?: string;
}

export interface ExchangeQuery extends PageQuery {
  /**
   * 名称
   */
  name?: string;

  /**
   * 所属站房
   */
  stationId?: number;

  /**
   * 机组编码规则
   */
  code?: string;

  /**
   * 日期范围参数
   */
  params?: any;
}
