import type { ProductAttributeVO, ProductAttributeForm, ProductAttributeQuery } from './model';

import type { ID, IDS } from '#/api/common';
import type { PageResult } from '#/api/common';

import { commonExport } from '#/api/helper';
import { requestClient } from '#/api/request';

/**
* 查询产品属性列表
* @param params
* @returns 产品属性列表
*/
export function productAttributeList(params?: ProductAttributeQuery) {
  return requestClient.get<PageResult<ProductAttributeVO>>('/iot/productAttribute/list', { params });
}

/**
 * 导出产品属性列表
 * @param params
 * @returns 产品属性列表
 */
export function productAttributeExport(params?: ProductAttributeQuery) {
  return commonExport('/iot/productAttribute/export', params ?? {});
}

/**
 * 查询产品属性详情
 * @param id id
 * @returns 产品属性详情
 */
export function productAttributeInfo(id: ID) {
  return requestClient.get<ProductAttributeVO>(`/iot/productAttribute/${id}`);
}

/**
 * 新增产品属性
 * @param data
 * @returns void
 */
export function productAttributeAdd(data: ProductAttributeForm) {
  return requestClient.postWithMsg<void>('/iot/productAttribute', data);
}

/**
 * 更新产品属性
 * @param data
 * @returns void
 */
export function productAttributeUpdate(data: ProductAttributeForm) {
  return requestClient.putWithMsg<void>('/iot/productAttribute', data);
}

/**
 * 删除产品属性
 * @param id id
 * @returns void
 */
export function productAttributeRemove(id: ID | IDS) {
  return requestClient.deleteWithMsg<void>(`/iot/productAttribute/${id}`);
}
