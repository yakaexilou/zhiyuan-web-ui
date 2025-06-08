import type {
  DeptStationVo,
  StationForm,
  StationQuery,
  StationVO,
} from './model';

import type { ID, IDS, PageResult } from '#/api/common';

import { commonExport } from '#/api/helper';
import { requestClient } from '#/api/request';

/**
 * 查询站房信息列表
 * @param params
 * @returns 站房信息列表
 */
export function stationList(params?: StationQuery) {
  return requestClient.get<PageResult<StationVO>>('/hms/station/list', {
    params,
  });
}

/**
 * 导出站房信息列表
 * @param params
 * @returns 站房信息列表
 */
export function stationExport(params?: StationQuery) {
  return commonExport('/hms/station/export', params ?? {});
}

/**
 * 查询站房信息详情
 * @param id id
 * @returns 站房信息详情
 */
export function stationInfo(id: ID) {
  return requestClient.get<StationVO>(`/hms/station/${id}`);
}

/**
 * 新增站房信息
 * @param data
 * @returns void
 */
export function stationAdd(data: StationForm) {
  return requestClient.postWithMsg<void>('/hms/station', data);
}

/**
 * 更新站房信息
 * @param data
 * @returns void
 */
export function stationUpdate(data: StationForm) {
  return requestClient.putWithMsg<void>('/hms/station', data);
}

/**
 * 删除站房信息
 * @param id id
 * @returns void
 */
export function stationRemove(id: ID | IDS) {
  return requestClient.deleteWithMsg<void>(`/hms/station/${id}`);
}

/**
 * 查询站房信息 Tree
 * @param id id
 * @returns 站房信息详情
 */
export function getDeptStationTree() {
  return requestClient.get<DeptStationVo[]>(`/hms/station/deptTree`);
}
