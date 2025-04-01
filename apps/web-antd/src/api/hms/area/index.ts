import type { AreaForm, AreaQuery, AreaVO } from './model';

import type { ID, IDS, PageResult } from '#/api/common';

import { commonExport } from '#/api/helper';
import { requestClient } from '#/api/request';

/**
 * 查询区域信息列表
 * @param params
 * @returns 区域信息列表
 */
export function areaList(params?: AreaQuery) {
  return requestClient.get<PageResult<AreaVO>>('/hms/area/list', { params });
}

/**
 * 导出区域信息列表
 * @param params
 * @returns 区域信息列表
 */
export function areaExport(params?: AreaQuery) {
  return commonExport('/hms/area/export', params ?? {});
}

/**
 * 查询区域信息详情
 * @param id id
 * @returns 区域信息详情
 */
export function areaInfo(id: ID) {
  return requestClient.get<AreaVO>(`/hms/area/${id}`);
}

/**
 * 新增区域信息
 * @param data
 * @returns void
 */
export function areaAdd(data: AreaForm) {
  return requestClient.postWithMsg<void>('/hms/area', data);
}

/**
 * 更新区域信息
 * @param data
 * @returns void
 */
export function areaUpdate(data: AreaForm) {
  return requestClient.putWithMsg<void>('/hms/area', data);
}

/**
 * 删除区域信息
 * @param id id
 * @returns void
 */
export function areaRemove(id: ID | IDS) {
  return requestClient.deleteWithMsg<void>(`/hms/area/${id}`);
}
