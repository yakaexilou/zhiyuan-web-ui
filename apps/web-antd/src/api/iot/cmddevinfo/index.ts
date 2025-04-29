import type { CmddevinfoVO, CmddevinfoForm, CmddevinfoQuery } from './model';

import type { ID, IDS } from '#/api/common';
import type { PageResult } from '#/api/common';

import { commonExport } from '#/api/helper';
import { requestClient } from '#/api/request';

/**
* 查询指令信息列表
* @param params
* @returns 指令信息列表
*/
export function cmddevinfoList(params?: CmddevinfoQuery) {
  return requestClient.get<PageResult<CmddevinfoVO>>('/iot/cmddevinfo/list', { params });
}

/**
 * 导出指令信息列表
 * @param params
 * @returns 指令信息列表
 */
export function cmddevinfoExport(params?: CmddevinfoQuery) {
  return commonExport('/iot/cmddevinfo/export', params ?? {});
}

/**
 * 查询指令信息详情
 * @param id id
 * @returns 指令信息详情
 */
export function cmddevinfoInfo(id: ID) {
  return requestClient.get<CmddevinfoVO>(`/iot/cmddevinfo/${id}`);
}

/**
 * 新增指令信息
 * @param data
 * @returns void
 */
export function cmddevinfoAdd(data: CmddevinfoForm) {
  return requestClient.postWithMsg<void>('/iot/cmddevinfo', data);
}

/**
 * 更新指令信息
 * @param data
 * @returns void
 */
export function cmddevinfoUpdate(data: CmddevinfoForm) {
  return requestClient.putWithMsg<void>('/iot/cmddevinfo', data);
}

/**
 * 删除指令信息
 * @param id id
 * @returns void
 */
export function cmddevinfoRemove(id: ID | IDS) {
  return requestClient.deleteWithMsg<void>(`/iot/cmddevinfo/${id}`);
}
