import type { OtaupgradeFileVO, OtaupgradeFileForm, OtaupgradeFileQuery } from './model';

import type { ID, IDS } from '#/api/common';
import type { PageResult } from '#/api/common';

import {commonExport, ContentTypeEnum} from '#/api/helper';
import { requestClient } from '#/api/request';


/**
* 查询升级文件列表
* @param params
* @returns 升级文件列表
*/
export function otaupgradeFileList(params?: OtaupgradeFileQuery) {
  return requestClient.get<PageResult<OtaupgradeFileVO>>('/iot/otaupgradeFile/list', { params });
}

/**
 * 导出升级文件列表
 * @param params
 * @returns 升级文件列表
 */
export function otaupgradeFileExport(params?: OtaupgradeFileQuery) {
  return commonExport('/iot/otaupgradeFile/export', params ?? {});
}

/**
 * 查询升级文件详情
 * @param id id
 * @returns 升级文件详情
 */
export function otaupgradeFileInfo(id: ID) {
  return requestClient.get<OtaupgradeFileVO>(`/iot/otaupgradeFile/${id}`);
}

/**
 * 新增升级文件
 * @param data
 * @returns void
 */
export function otaupgradeFileAdd(data: OtaupgradeFileForm) {
  return requestClient.postWithMsg<void>('/iot/otaupgradeFile', data);
}

/**
 * 更新升级文件
 * @param data
 * @returns void
 */
export function otaupgradeFileUpdate(data: OtaupgradeFileForm) {
  return requestClient.putWithMsg<void>('/iot/otaupgradeFile', data);
}

// export function ossUpload(file: Blob | File) {
//   const formData = new FormData();
//   formData.append('file', file);
//   return requestClient.postWithMsg(Api.ossUpload, formData, {
//     headers: { 'Content-Type': ContentTypeEnum.FORM_DATA },
//     timeout: 30 * 1000,
//   });
// }

export function otaupgradeUpFile(file: Blob | File) {
  const formData = new FormData();
  formData.append('file', file);
  // return requestClient.postWithMsg<void>('/iot/otaupgradeFile/upfile', file);
  return  requestClient.postWithMsg('/iot/otaupgradeFile/upfile', formData, {
    headers: { 'Content-Type': ContentTypeEnum.FORM_DATA },
    timeout: 30 * 1000,
  });
}

export function upFileInfo(dataList: any){
  const data=dataList[0]
  const ufileName = data["ufileName"] ;
  const uconent = data["uconent"] ;
  const ufileSize = data["ufileSize"] ;
  console.log( ufileName + " "+uconent+ "  s " +ufileSize )
}

/**
 * 删除升级文件
 * @param id id
 * @returns void
 */
export function otaupgradeFileRemove(id: ID | IDS) {
  return requestClient.deleteWithMsg<void>(`/iot/otaupgradeFile/${id}`);
}
