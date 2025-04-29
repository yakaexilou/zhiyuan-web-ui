import type { GatewaydataVO, GatewaydataForm, GatewaydataQuery } from './model';

import type { ID, IDS } from '#/api/common';
import type { PageResult } from '#/api/common';

import { commonExport } from '#/api/helper';
import { requestClient } from '#/api/request';

/**
* 查询网关状态列表
* @param params
* @returns 网关状态列表
*/
export function gatewaydataList(params?: GatewaydataQuery) {
  return requestClient.get<PageResult<GatewaydataVO>>('/iot/gatewaydata/list', { params });
}

/**
 * 导出网关状态列表
 * @param params
 * @returns 网关状态列表
 */
export function gatewaydataExport(params?: GatewaydataQuery) {
  return commonExport('/iot/gatewaydata/export', params ?? {});
}

/**
 * 查询网关状态详情
 * @param id id
 * @returns 网关状态详情
 */
export function gatewaydataInfo(id: ID) {
  return requestClient.get<GatewaydataVO>(`/iot/gatewaydata/${id}`);
}

/**
 * 新增网关状态
 * @param data
 * @returns void
 */
export function gatewaydataAdd(data: GatewaydataForm) {
  return requestClient.postWithMsg<void>('/iot/gatewaydata', data);
}

/**
 * 更新网关状态
 * @param data
 * @returns void
 */
export function gatewaydataUpdate(data: GatewaydataForm) {
  return requestClient.putWithMsg<void>('/iot/gatewaydata', data);
}

/**
 * 删除网关状态
 * @param id id
 * @returns void
 */
export function gatewaydataRemove(id: ID | IDS) {
  return requestClient.deleteWithMsg<void>(`/iot/gatewaydata/${id}`);
}

export function dianLiangFormat( val ) {
  if(val===255)return "电源";
  if(val>100) return val ;
  return val+"%"
}
export function cqsFormat( val ) {
  if(val===255)return "内网";
  if (val >= 26) return val+" 极强";
  else if (val >= 21) return val+" 强";
  else if (val >= 16) return val+" 中";
  else if (val >= 6) return val+" 弱";
  else return val+" 差";
}
export function valveFaWei( val ) {
  if(val===-0.1)
    return "--";
  else
    return val+"%";
}
export function valveTemp( val ) {
  if(val===-0.1)
    return "--";
  else
    return val+"℃";
}
