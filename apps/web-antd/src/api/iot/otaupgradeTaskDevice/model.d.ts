import type { PageQuery, BaseEntity } from '#/api/common';

export interface OtaupgradeTaskDeviceVO {
  /**
   * ID
   */
  id: string | number;

  /**
   * 任务ID
   */
  taskid: string | number;

  /**
   * 设备SN
   */
  devsn: string;

  /**
   * 通知时间
   */
  startdate: string;

  /**
   * 完成时间
   */
  enddate: string;

  /**
   * 设备状态
   */
  devstatus: number;

  /**
   * 
   */
  lastRegisterTime: string;

}

export interface OtaupgradeTaskDeviceForm extends BaseEntity {
  /**
   * ID
   */
  id?: string | number;

  /**
   * 任务ID
   */
  taskid?: string | number;

  /**
   * 设备SN
   */
  devsn?: string;

  /**
   * 通知时间
   */
  startdate?: string;

  /**
   * 完成时间
   */
  enddate?: string;

  /**
   * 设备状态
   */
  devstatus?: number;

  /**
   * 
   */
  lastRegisterTime?: string;

}

export interface OtaupgradeTaskDeviceQuery extends PageQuery {
  /**
   * 任务ID
   */
  taskid?: string | number;

  /**
   * 设备SN
   */
  devsn?: string;

  /**
   * 通知时间
   */
  startdate?: string;

  /**
   * 完成时间
   */
  enddate?: string;

  /**
   * 设备状态
   */
  devstatus?: number;

  /**
   * 
   */
  lastRegisterTime?: string;

  /**
    * 日期范围参数
    */
  params?: any;
}
