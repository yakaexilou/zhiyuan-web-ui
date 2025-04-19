import type { DriverVO,DriverDmVO, DriverForm, DriverQuery } from './model';

import type { ID, IDS } from '#/api/common';
import type { PageResult } from '#/api/common';

import { commonExport } from '#/api/helper';
import { requestClient } from '#/api/request';

/**
* 查询driver列表
* @param params
* @returns driver列表
*/
export function driverList(params?: DriverQuery) {
  return requestClient.get<PageResult<DriverVO>>('/iot/driver/list', { params });
}

export function driverDmList(params) {
  return requestClient.get('/iot/driver/list', { params });
}

/**
 * 导出driver列表
 * @param params
 * @returns driver列表
 */
export function driverExport(params?: DriverQuery) {
  return commonExport('/iot/driver/export', params ?? {});
}

/**
 * 查询driver详情
 * @param id id
 * @returns driver详情
 */
export function driverInfo(id: ID) {
  return requestClient.get<DriverVO>(`/iot/driver/${id}`);
}




/**
 * 新增driver
 * @param data
 * @returns void
 */
export function driverAdd(data: DriverForm) {
  return requestClient.postWithMsg<void>('/iot/driver', data);
}

/**
 * 更新driver
 * @param data
 * @returns void
 */
export function driverUpdate(data: DriverForm) {
  return requestClient.putWithMsg<void>('/iot/driver', data);
}

/**
 * 删除driver
 * @param id id
 * @returns void
 */
export function driverRemove(id: ID | IDS) {
  return requestClient.deleteWithMsg<void>(`/iot/driver/${id}`);
}
