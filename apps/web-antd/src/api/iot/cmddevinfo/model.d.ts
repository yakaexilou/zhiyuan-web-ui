import type { PageQuery, BaseEntity } from '#/api/common';

export interface CmddevinfoVO {
  /**
   * 
   */
  id: string | number;

  /**
   * 设备序列号
   */
  sn: string;

  /**
   * 指令ID
   */
  mid: string | number;

  /**
   * 设备网关序列号
   */
  gwsn: string;

  /**
   * 指令编码
   */
  cmdcode: string;

  /**
   * 读写标识
   */
  type: string;

  /**
   * 指令参数信息
   */
  cmdparams: string;

  /**
   * 指令状态
   */
  cmdstat: number;

  /**
   * 创建时间
   */
  addtime: string;

  /**
   * 回复时间
   */
  returntime: string;

  /**
   * 回复信息
   */
  returninfo: string;

}

export interface CmddevinfoForm extends BaseEntity {
  /**
   * 
   */
  id?: string | number;

  /**
   * 设备序列号
   */
  sn?: string;

  /**
   * 指令ID
   */
  mid?: string | number;

  /**
   * 设备网关序列号
   */
  gwsn?: string;

  /**
   * 指令编码
   */
  cmdcode?: string;

  /**
   * 读写标识
   */
  type?: string;

  /**
   * 指令参数信息
   */
  cmdparams?: string;

  /**
   * 指令状态
   */
  cmdstat?: number;

  /**
   * 创建时间
   */
  addtime?: string;

  /**
   * 回复时间
   */
  returntime?: string;

  /**
   * 回复信息
   */
  returninfo?: string;

}

export interface CmddevinfoQuery extends PageQuery {
  /**
   * 设备序列号
   */
  sn?: string;

  /**
   * 指令ID
   */
  mid?: string | number;

  /**
   * 设备网关序列号
   */
  gwsn?: string;

  /**
   * 指令编码
   */
  cmdcode?: string;

  /**
   * 读写标识
   */
  type?: string;

  /**
   * 指令状态
   */
  cmdstat?: number;

  /**
   * 创建时间
   */
  addtime?: string;

  /**
   * 回复时间
   */
  returntime?: string;

  /**
   * 回复信息
   */
  returninfo?: string;

  /**
    * 日期范围参数
    */
  params?: any;
}
