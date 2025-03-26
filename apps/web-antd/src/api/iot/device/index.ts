import type { DeviceVO, DeviceForm, DeviceQuery } from './model';

import type { ID, IDS } from '#/api/common';
import type { PageResult } from '#/api/common';

import { commonExport } from '#/api/helper';
import { requestClient } from '#/api/request';

/**
* 查询设备管理列表
* @param params
* @returns 设备管理列表
*/
export function deviceList(params?: DeviceQuery) {
  return requestClient.get<PageResult<DeviceVO>>('/iot/device/list', { params });
}

/**
 * 导出设备管理列表
 * @param params
 * @returns 设备管理列表
 */
export function deviceExport(params?: DeviceQuery) {
  return commonExport('/iot/device/export', params ?? {});
}

/**
 * 查询设备管理详情
 * @param id id
 * @returns 设备管理详情
 */
export function deviceInfo(id: ID) {
  return requestClient.get<DeviceVO>(`/iot/device/${id}`);
}

/**
 * 新增设备管理
 * @param data
 * @returns void
 */
export function deviceAdd(data: DeviceForm) {
  return requestClient.postWithMsg<void>('/iot/device', data);
}

/**
 * 更新设备管理
 * @param data
 * @returns void
 */
export function deviceUpdate(data: DeviceForm) {
  return requestClient.putWithMsg<void>('/iot/device', data);
}

/**
 * 删除设备管理
 * @param id id
 * @returns void
 */
export function deviceRemove(id: ID | IDS) {
  return requestClient.deleteWithMsg<void>(`/iot/device/${id}`);
}
