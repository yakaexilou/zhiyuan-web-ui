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
  if (val >= 26) return " 强"+val;
  else if (val >= 21) return " 强  "+val;
  else if (val >= 16) return " 中  "+val;
  else if (val >= 6) return " 弱  "+val;
  else return val+" 差";
}
export function valveFaWei( val: number ) {
  if(val==null) return "--";
  if(val===-0.1)
    return "--";
  else{
    // return val+"%";
    return "100%";
  }
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
export function disCmdReturnVal( type: string , val: string ) {
  if(type=="00"){
    return val ;
  }else{
    if(val==null||val==""){
      return "";
    }else{
      if(val=="00")
        return "成功";
      else
      if(val=="01")
        return "异常";
      else
        return val ;
    }
  }
}
export function disSsll( val: number ) {
  if(val==null)
    return "";
  else{
    if(val==0){
      return "0";
    }else{
      let rv = Math.round(val * 10000) / 10000;
      if(rv==0)return "0";
      return rv+"m³/h";
    }
  }
}
export function disSsrl( val: number ) {
  if(val==null)
    return "";
  else{
    if(val==0){
      return "0";
    }else{
      let rv = Math.round(val * 10000) / 10000;
      if(rv==0)return "0";
      return rv+"kW/h";
    }
  }
}
export function disLjll( val: number ) {
  if(val==null)
    return "";
  else{
    if(val==0){
      return "0";
    }else{
      let rv = Math.round(val * 10000) / 10000;
      if(rv==0)return "0";
      // return rv+"m³";
      return rv;
    }
  }
}
export function disLjrl( val: number ) {
  if(val==null)
    return "";
  else{
    if(val==0){
      return "0";
    }else{
      let rv = Math.round(val * 10000) / 10000;
      if(rv==0)return "0";
      // return rv+"kWh";
      return rv;
    }
  }
}
