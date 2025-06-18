import type { OtaupgradeTaskDeviceVO, OtaupgradeTaskDeviceForm, OtaupgradeTaskDeviceQuery } from './model';

import type { ID, IDS } from '#/api/common';
import type { PageResult } from '#/api/common';

import { commonExport } from '#/api/helper';
import { requestClient } from '#/api/request';

/**
* 查询升级设备状态列表
* @param params
* @returns 升级设备状态列表
*/
export function otaupgradeTaskDeviceList(params?: OtaupgradeTaskDeviceQuery) {
  return requestClient.get<PageResult<OtaupgradeTaskDeviceVO>>('/iot/otaupgradeTaskDevice/list', { params });
}

/**
 * 导出升级设备状态列表
 * @param params
 * @returns 升级设备状态列表
 */
export function otaupgradeTaskDeviceExport(params?: OtaupgradeTaskDeviceQuery) {
  return commonExport('/iot/otaupgradeTaskDevice/export', params ?? {});
}

/**
 * 查询升级设备状态详情
 * @param id id
 * @returns 升级设备状态详情
 */
export function otaupgradeTaskDeviceInfo(id: ID) {
  return requestClient.get<OtaupgradeTaskDeviceVO>(`/iot/otaupgradeTaskDevice/${id}`);
}

/**
 * 新增升级设备状态
 * @param data
 * @returns void
 */
export function otaupgradeTaskDeviceAdd(data: OtaupgradeTaskDeviceForm) {
  return requestClient.postWithMsg<void>('/iot/otaupgradeTaskDevice', data);
}

/**
 * 更新升级设备状态
 * @param data
 * @returns void
 */
export function otaupgradeTaskDeviceUpdate(data: OtaupgradeTaskDeviceForm) {
  return requestClient.putWithMsg<void>('/iot/otaupgradeTaskDevice', data);
}

/**
 * 删除升级设备状态
 * @param id id
 * @returns void
 */
export function otaupgradeTaskDeviceRemove(id: ID | IDS) {
  return requestClient.deleteWithMsg<void>(`/iot/otaupgradeTaskDevice/${id}`);
}
