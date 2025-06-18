import type { OtaupgradeFilePacksVO, OtaupgradeFilePacksForm, OtaupgradeFilePacksQuery } from './model';

import type { ID, IDS } from '#/api/common';
import type { PageResult } from '#/api/common';

import { commonExport } from '#/api/helper';
import { requestClient } from '#/api/request';

/**
* 查询升级包序号列表
* @param params
* @returns 升级包序号列表
*/
export function otaupgradeFilePacksList(params?: OtaupgradeFilePacksQuery) {
  return requestClient.get<PageResult<OtaupgradeFilePacksVO>>('/iot/otaupgradeFilePacks/list', { params });
}

/**
 * 导出升级包序号列表
 * @param params
 * @returns 升级包序号列表
 */
export function otaupgradeFilePacksExport(params?: OtaupgradeFilePacksQuery) {
  return commonExport('/iot/otaupgradeFilePacks/export', params ?? {});
}

/**
 * 查询升级包序号详情
 * @param id id
 * @returns 升级包序号详情
 */
export function otaupgradeFilePacksInfo(id: ID) {
  return requestClient.get<OtaupgradeFilePacksVO>(`/iot/otaupgradeFilePacks/${id}`);
}

/**
 * 新增升级包序号
 * @param data
 * @returns void
 */
export function otaupgradeFilePacksAdd(data: OtaupgradeFilePacksForm) {
  return requestClient.postWithMsg<void>('/iot/otaupgradeFilePacks', data);
}

/**
 * 更新升级包序号
 * @param data
 * @returns void
 */
export function otaupgradeFilePacksUpdate(data: OtaupgradeFilePacksForm) {
  return requestClient.putWithMsg<void>('/iot/otaupgradeFilePacks', data);
}

/**
 * 删除升级包序号
 * @param id id
 * @returns void
 */
export function otaupgradeFilePacksRemove(id: ID | IDS) {
  return requestClient.deleteWithMsg<void>(`/iot/otaupgradeFilePacks/${id}`);
}
