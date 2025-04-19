import type { DriverAttributeVO, DriverAttributeForm, DriverAttributeQuery } from './model';

import type { ID, IDS } from '#/api/common';
import type { PageResult } from '#/api/common';

import { commonExport } from '#/api/helper';
import { requestClient } from '#/api/request';

/**
* 查询驱动属性列表
* @param params
* @returns 驱动属性列表
*/
export function driverAttributeList(params?: DriverAttributeQuery) {
  return requestClient.get<PageResult<DriverAttributeVO>>('/iot/driverAttribute/list', { params });
}

/**
 * 导出驱动属性列表
 * @param params
 * @returns 驱动属性列表
 */
export function driverAttributeExport(params?: DriverAttributeQuery) {
  return commonExport('/iot/driverAttribute/export', params ?? {});
}

/**
 * 查询驱动属性详情
 * @param id id
 * @returns 驱动属性详情
 */
export function driverAttributeInfo(id: ID) {
  return requestClient.get<DriverAttributeVO>(`/iot/driverAttribute/${id}`);
}

/**
 * 新增驱动属性
 * @param data
 * @returns void
 */
export function driverAttributeAdd(data: DriverAttributeForm) {
  return requestClient.postWithMsg<void>('/iot/driverAttribute', data);
}

/**
 * 更新驱动属性
 * @param data
 * @returns void
 */
export function driverAttributeUpdate(data: DriverAttributeForm) {
  return requestClient.putWithMsg<void>('/iot/driverAttribute', data);
}

/**
 * 删除驱动属性
 * @param id id
 * @returns void
 */
export function driverAttributeRemove(id: ID | IDS) {
  return requestClient.deleteWithMsg<void>(`/iot/driverAttribute/${id}`);
}
