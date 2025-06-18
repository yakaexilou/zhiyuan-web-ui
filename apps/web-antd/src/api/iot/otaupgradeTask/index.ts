import type { OtaupgradeTaskVO, OtaupgradeTaskForm, OtaupgradeTaskQuery } from './model';

import type { ID, IDS } from '#/api/common';
import type { PageResult } from '#/api/common';

import { commonExport } from '#/api/helper';
import { requestClient } from '#/api/request';

/**
* 查询升级任务列表
* @param params
* @returns 升级任务列表
*/
export function otaupgradeTaskList(params?: OtaupgradeTaskQuery) {
  return requestClient.get<PageResult<OtaupgradeTaskVO>>('/iot/otaupgradeTask/list', { params });
}


/**
 * 查询升级任务详情
 * @param id id
 * @returns 升级任务详情
 */
export function otaupgradeTaskInfo(id: ID) {
  return requestClient.get<OtaupgradeTaskVO>(`/iot/otaupgradeTask/${id}`);
}

/**
 * 新增升级任务
 * @param data
 * @returns void
 */
export function otaupgradeTaskAdd(data: OtaupgradeTaskForm) {
  return requestClient.postWithMsg<void>('/iot/otaupgradeTask', data);
}

/**
 * 更新升级任务
 * @param data
 * @returns void
 */
export function otaupgradeTaskUpdate(data: OtaupgradeTaskForm) {
  return requestClient.putWithMsg<void>('/iot/otaupgradeTask', data);
}

/**
 * 删除升级任务
 * @param id id
 * @returns void
 */
export function otaupgradeTaskRemove(id: ID | IDS) {
  return requestClient.deleteWithMsg<void>(`/iot/otaupgradeTask/${id}`);
}

export function startUpgradeTask(id: ID) {
  return requestClient.post<void>(`/iot/otaupgradeTask/start/${id}` );
}

export function stopUpgradeTask(id: ID) {
  return requestClient.post<void>(`/iot/otaupgradeTask/stop/${id}`);
}

export function otaupgradeTaskSaveSns( data: OtaupgradeTaskForm) {
  return requestClient.postWithMsg<void>('/iot/otaupgradeTask/addSns', data);
}
export function otaupgradeTaskDelSns( data: OtaupgradeTaskForm) {
  return requestClient.postWithMsg<void>('/iot/otaupgradeTask/delSn', data);
}
