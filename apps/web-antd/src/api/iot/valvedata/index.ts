import type { ValvedataVO, ValvedataForm, ValvedataQuery } from './model';

import type { ID, IDS } from '#/api/common';
import type { PageResult } from '#/api/common';

import { commonExport } from '#/api/helper';
import { requestClient } from '#/api/request';

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
  return commonExport('/iot/valvedata/export', params ?? {});
}

/**
 * 查询阀门上报数据详情
 * @param id id
 * @returns 阀门上报数据详情
 */
export function valvedataInfo(id: ID) {
  return requestClient.get<ValvedataVO>(`/iot/valvedata/${id}`);
}

/**
 * 新增阀门上报数据
 * @param data
 * @returns void
 */
export function valvedataAdd(data: ValvedataForm) {
  return requestClient.postWithMsg<void>('/iot/valvedata', data);
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
