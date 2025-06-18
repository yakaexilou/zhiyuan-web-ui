import type { DeviceVO, DeviceForm, DeviceQuery } from './model';

import type { ID, IDS } from '#/api/common';
import type { PageResult } from '#/api/common';

import { commonExport } from '#/api/helper';
import { requestClient } from '#/api/request';

/**
* 查询设备信息列表
* @param params
* @returns 设备信息列表
*/
export function deviceList(params?: DeviceQuery) {
  return requestClient.get<PageResult<DeviceVO>>('/iot/device/list', { params });
}

export function deviceListByTask(params?: DeviceQuery) {
  return requestClient.get<PageResult<DeviceVO>>('/iot/device/taskList', { params });
}

export function deviceListByAdd(params?: DeviceQuery) {
  return requestClient.get<PageResult<DeviceVO>>('/iot/device/taskListAddSn', { params });
}

/**
 * 导出设备信息列表
 * @param params
 * @returns 设备信息列表
 */
export function deviceExport(params?: DeviceQuery) {
  return commonExport('/iot/device/export', params ?? {});
}

/**
 * 查询设备信息详情
 * @param id id
 * @returns 设备信息详情
 */
export function deviceInfo(id: ID) {
  return requestClient.get<DeviceVO>(`/iot/device/${id}`);
}

/**
 * 新增设备信息
 * @param data
 * @returns void
 */
export function deviceAdd(data: DeviceForm) {
  return requestClient.postWithMsg<void>('/iot/device', data);
}

/**
 * 更新设备信息
 * @param data
 * @returns void
 */
export function deviceUpdate(data: DeviceForm) {
  return requestClient.putWithMsg<void>('/iot/device', data);
}

/**
 * 删除设备信息
 * @param id id
 * @returns void
 */
export function deviceRemove(id: ID | IDS) {
  return requestClient.deleteWithMsg<void>(`/iot/device/${id}`);
}
