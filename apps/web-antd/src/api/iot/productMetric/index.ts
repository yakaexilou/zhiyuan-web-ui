import type { ProductMetricVO, ProductMetricForm, ProductMetricQuery } from './model';

import type { ID, IDS } from '#/api/common';
import type { PageResult } from '#/api/common';

import { commonExport } from '#/api/helper';
import { requestClient } from '#/api/request';

/**
* 查询产品数据项列表
* @param params
* @returns 产品数据项列表
*/
export function productMetricList(params?: ProductMetricQuery) {
  return requestClient.get<PageResult<ProductMetricVO>>('/iot/productMetric/list', { params });
}

/**
 * 导出产品数据项列表
 * @param params
 * @returns 产品数据项列表
 */
export function productMetricExport(params?: ProductMetricQuery) {
  return commonExport('/iot/productMetric/export', params ?? {});
}

/**
 * 查询产品数据项详情
 * @param id id
 * @returns 产品数据项详情
 */
export function productMetricInfo(id: ID) {
  return requestClient.get<ProductMetricVO>(`/iot/productMetric/${id}`);
}

/**
 * 新增产品数据项
 * @param data
 * @returns void
 */
export function productMetricAdd(data: ProductMetricForm) {
  return requestClient.postWithMsg<void>('/iot/productMetric', data);
}

/**
 * 更新产品数据项
 * @param data
 * @returns void
 */
export function productMetricUpdate(data: ProductMetricForm) {
  return requestClient.putWithMsg<void>('/iot/productMetric', data);
}

/**
 * 删除产品数据项
 * @param id id
 * @returns void
 */
export function productMetricRemove(id: ID | IDS) {
  return requestClient.deleteWithMsg<void>(`/iot/productMetric/${id}`);
}
