import type { HmsDeviceVO, HmsDeviceForm, HmsDeviceQuery } from './model';

import type { ID, IDS } from '#/api/common';
import type { PageResult } from '#/api/common';

import { commonExport } from '#/api/helper';
import { requestClient } from '#/api/request';
import type {AxiosProgressEvent} from "#/api";

/**
* 查询设备管理列表
* @param params
* @returns 设备管理列表
*/
export function hmsDeviceList(params?: HmsDeviceQuery) {
  return requestClient.get<PageResult<HmsDeviceVO>>('/hms/hmsDevice/list', { params });
}

/**
 * 导出设备管理列表
 * @param params
 * @returns 设备管理列表
 */
export function hmsDeviceExport(params?: HmsDeviceQuery) {
  return commonExport('/hms/hmsDevice/export', params ?? {});
}

/**
 * 查询设备管理详情
 * @param id id
 * @returns 设备管理详情
 */
export function hmsDeviceInfo(id: ID) {
  return requestClient.get<HmsDeviceVO>(`/hms/hmsDevice/${id}`);
}

/**
 * 新增设备管理
 * @param data
 * @returns void
 */
export function hmsDeviceAdd(data: HmsDeviceForm) {
  return requestClient.postWithMsg<void>('/hms/hmsDevice', data);
}

/**
 * 更新设备管理
 * @param data
 * @returns void
 */
export function hmsDeviceUpdate(data: HmsDeviceForm) {
  return requestClient.putWithMsg<void>('/hms/hmsDevice', data);
}

/**
 * 删除设备管理
 * @param id id
 * @returns void
 */
export function hmsDeviceRemove(id: ID | IDS) {
  return requestClient.deleteWithMsg<void>(`/hms/hmsDevice/${id}`);
}

export function hmsDeviceImport(
  file: Blob | File,
  onUploadProgress?: AxiosProgressEvent,
) {
  return requestClient.upload(
    '/hms/hmsDevice/import_tje',
    { file },
    { onUploadProgress, timeout: 60_000 },
  );
}
