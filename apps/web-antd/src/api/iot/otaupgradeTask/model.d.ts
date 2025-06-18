import type { PageQuery, BaseEntity } from '#/api/common';

export interface OtaupgradeTaskVO {
  /**
   *
   */
  id: string | number;

  /**
   * 任务名称
   */
  name: string;

  /**
   * 升级文件
   */
  fileId: string | number;

  fileName: string | number ;

  /**
   * 开始时间
   */
  startdate: string;

  /**
   * 结束时间
   */
  enddate: string;

  /**
   * 启动状态
   */
  taskstatus: number;

  /**
   * 设备总量
   */
  devsize: number;

  /**
   * 升级总量
   */
  upgradesize: number;

  /**
   *
   */
  lastRegisterTime: string;

}

export interface OtaupgradeTaskForm extends BaseEntity {
  /**
   *
   */
  id?: string | number;

  /**
   * 任务名称
   */
  name?: string;

  /**
   * 升级文件
   */
  fileId?: string | number;

  /**
   * 开始时间
   */
  startdate?: string;

  /**
   * 结束时间
   */
  enddate?: string;

  /**
   * 启动状态
   */
  taskstatus?: number;

  /**
   * 设备总量
   */
  devsize?: number;

  /**
   * 升级总量
   */
  upgradesize?: number;

  sns?: string;


}

export interface OtaupgradeTaskQuery extends PageQuery {
  /**
   * 任务名称
   */
  name?: string;

  /**
   * 升级文件
   */
  fileId?: string | number;

  /**
   * 开始时间
   */
  startdate?: string;

  /**
   * 结束时间
   */
  enddate?: string;

  /**
   * 启动状态
   */
  taskstatus?: number;

  /**
   * 设备总量
   */
  devsize?: number;

  /**
   * 升级总量
   */
  upgradesize?: number;

  /**
   *
   */
  lastRegisterTime?: string;

  /**
    * 日期范围参数
    */
  params?: any;
}
