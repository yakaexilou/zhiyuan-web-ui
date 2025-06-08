import type { ValvedataVO, ValvedataForm, ValvedataQuery } from './model';

import type { ID, IDS } from '#/api/common';
import type { PageResult } from '#/api/common';

import { commonExport } from '#/api/helper';
import { requestClient } from '#/api/request';
import type {CmddevinfoForm} from "#/api/iot/cmddevinfo/model";
import type {GatewaydataVO} from "#/api/iot/gatewaydata/model";

/**
* 查询阀门上报数据列表
* @param params
* @returns 阀门上报数据列表
*/
export function valvedataList(params?: ValvedataQuery) {
  return requestClient.get<PageResult<ValvedataVO>>('/iot/valvedata/list', { params });
}

/**
 * 导出阀门上报数据列表
 * @param params
 * @returns 阀门上报数据列表
 */
export function valvedataExport(params?: ValvedataQuery) {
  // return commonExport('/iot/valvedata/export', params ?? {});
  let sn: string|undefined = params?.["sn"] ;
  let devType: number|undefined  = params?.["devType"] ;
  if(devType==null){
    if((sn!=null)&&( sn.startsWith("1000") )) {
      return commonExport('/iot/gatewaydata/export', params ?? {});
    }else{
      return commonExport('/iot/valvedata/export', params ?? {});
    }
  }else{
    if(devType==3){
      return commonExport('/iot/gatewaydata/export', params ?? {});
    }else{
      return commonExport('/iot/valvedata/export', params ?? {});
    }
  }
}


export function valvedataListOrGw(params?: ValvedataQuery) {
  let sn = params?.["sn"] ;
  let devType: number|undefined  = params?.["devType"] ;
  if(devType==null){
    if((sn!=null)&&( sn.startsWith("1000") )) {
      return requestClient.get<PageResult<GatewaydataVO>>('/iot/gatewaydata/list', { params });
    }else{
      return requestClient.get<PageResult<ValvedataVO>>('/iot/valvedata/list', { params });
    }
  }else{
    if(devType==3){
      return requestClient.get<PageResult<GatewaydataVO>>('/iot/gatewaydata/list', { params });
    }else{
      return requestClient.get<PageResult<ValvedataVO>>('/iot/valvedata/list', { params });
    }
  }
}

/**
 * 导出阀门上报数据列表
 * @param params
 * @returns 阀门上报数据列表
 */
export function valvedataExportOrGw(params?: ValvedataQuery) {
  let sn = params?.["sn"] ;
  let devType: number|undefined  = params?.["devType"] ;

  if(devType==null){
    if((sn!=null)&&( sn.startsWith("1000") )) {
      return commonExport('/iot/gatewaydata/export', { params });
    }else{
      return commonExport('/iot/valvedata/export', { params });
    }
  }else{
    if(devType==3){
      return commonExport('/iot/gatewaydata/export', { params });
    }else{
      return commonExport('/iot/valvedata/export', { params });
    }
  }

}



export function valvedataListRealTime(params?: ValvedataQuery) {
  let devType = params?.["devType"] ;
  if(devType==3){
    return requestClient.get<PageResult<GatewaydataVO>>('/iot/gatewaydata/rTlist', { params });
  }else{
    return requestClient.get<PageResult<ValvedataVO>>('/iot/valvedata/rTlist', { params });
  }

}

/**
 * 导出阀门上报数据列表
 * @param params
 * @returns 阀门上报数据列表
 */
export function valvedataExportRealTime(params?: ValvedataQuery) {
  let devType = params?.["devType"] ;
  if(devType==3){
    return commonExport('/iot/gatewaydata/rTexport', params ?? {});
  }else{
    return commonExport('/iot/valvedata/rTexport', params ?? {});
  }

}


/**
 * 查询阀门上报数据详情
 * @param id id
 * @returns 阀门上报数据详情
 */
export function valvedataInfo(id: ID) {
  return requestClient.get<ValvedataVO>(`/iot/valvedata/getData/${id}`);
}

/**
 * 新增阀门上报数据
 * @param data
 * @returns void
 */
export function valvedataAdd(data: CmddevinfoForm) {
  let cmdcode = data["cmdcode"];
  let cmdparams = data["cmdparams"];
  if(cmdcode=="63A0"&&cmdparams==""){
    alert("请选择波特率");
    return ;
  }
  return requestClient.postWithMsg<void>('/iot/cmddevinfo/addCmd', data);
}

/**
 * 更新阀门上报数据
 * @param data
 * @returns void
 */
export function valvedataUpdate(data: ValvedataForm) {
  return requestClient.putWithMsg<void>('/iot/valvedata', data);
}

/**
 * 删除阀门上报数据
 * @param id id
 * @returns void
 */
export function valvedataRemove(id: ID | IDS) {
  return requestClient.deleteWithMsg<void>(`/iot/valvedata/${id}`);
}
