import type {GatewaydataForm, GatewaydataQuery, GatewaydataVO} from './model';

import type {ID, IDS, PageResult} from '#/api/common';

import {commonExport} from '#/api/helper';
import {requestClient} from '#/api/request';
import type {CmddevinfoForm} from "#/api/iot/cmddevinfo/model";

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


export function gatewaydataListRealTime(params?: GatewaydataQuery) {
  return requestClient.get<PageResult<GatewaydataVO>>('/iot/gatewaydata/rTlist', { params });
}

/**
 * 导出阀门上报数据列表
 * @param params
 * @returns 阀门上报数据列表
 */
export function gatewaydataExportRealTime(params?: GatewaydataQuery) {
  return commonExport('/iot/gatewaydata/rTexport', params ?? {});
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
export function gatewaydataAdd(data: CmddevinfoForm) {
  return requestClient.postWithMsg<void>('/iot/cmddevinfo/addCmd', data);
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

export function dianLiangFormat( val: number ) {
  if(val==null) return "";
  if(val===255)return "电源";
  if(val>100) return val ;
  return val+"%"
}
export function cqsFormat( val: number ) {
  if(val==null) return "";
  if(val===255)return "内网";
  if (val >= 26) return val+" 极强";
  else if (val >= 21) return val+" 强";
  else if (val >= 16) return val+" 中";
  else if (val >= 6) return val+" 弱";
  else return val+" 差";
}
export function valveFaWei( val: number ) {
  if(val==null) return "--";
  if(val===-0.1)
    return "--";
  else
    return val+"%";
}
export function valveTemp( val: number ) {
  if(val==null) return "--";
  if(val===-0.1)
    return "--";
  else
    return val+"℃";
}
export function disD3custom1( val: string ) {
  if(val=="01")
    return "开度";
  else
  if(val=="02")
    return "回温";
  else
    return "";
}

