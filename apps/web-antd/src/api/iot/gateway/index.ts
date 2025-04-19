import type { GatewayVO, GatewayForm, GatewayQuery } from './model';

import type { ID, IDS } from '#/api/common';
import type { PageResult } from '#/api/common';

import { commonExport } from '#/api/helper';
import { requestClient } from '#/api/request';

/**
* 查询网关信息列表
* @param params
* @returns 网关信息列表
*/
export function gatewayList(params?: GatewayQuery) {
  return requestClient.get<PageResult<GatewayVO>>('/iot/gateway/list', { params });
}

/**
 * 导出网关信息列表
 * @param params
 * @returns 网关信息列表
 */
export function gatewayExport(params?: GatewayQuery) {
  return commonExport('/iot/gateway/export', params ?? {});
}

/**
 * 查询网关信息详情
 * @param id id
 * @returns 网关信息详情
 */
export function gatewayInfo(id: ID) {
  return requestClient.get<GatewayVO>(`/iot/gateway/${id}`);
}

/**
 * 新增网关信息
 * @param data
 * @returns void
 */
export function gatewayAdd(data: GatewayForm) {
  return requestClient.postWithMsg<void>('/iot/gateway', data);
}

/**
 * 更新网关信息
 * @param data
 * @returns void
 */
export function gatewayUpdate(data: GatewayForm) {
  return requestClient.putWithMsg<void>('/iot/gateway', data);
}

/**
 * 删除网关信息
 * @param id id
 * @returns void
 */
export function gatewayRemove(id: ID | IDS) {
  return requestClient.deleteWithMsg<void>(`/iot/gateway/${id}`);
}
