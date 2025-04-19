import type { ProductVO, ProductForm, ProductQuery } from './model';

import type { ID, IDS } from '#/api/common';
import type { PageResult } from '#/api/common';

import { commonExport } from '#/api/helper';
import { requestClient } from '#/api/request';

/**
* 查询产品管理列表
* @param params
* @returns 产品管理列表
*/
export function productList(params?: ProductQuery) {
  return requestClient.get<PageResult<ProductVO>>('/iot/product/list', { params });
}

/**
 * 导出产品管理列表
 * @param params
 * @returns 产品管理列表
 */
export function productExport(params?: ProductQuery) {
  return commonExport('/iot/product/export', params ?? {});
}

/**
 * 查询产品管理详情
 * @param id id
 * @returns 产品管理详情
 */
export function productInfo(id: ID) {
  return requestClient.get<ProductVO>(`/iot/product/${id}`);
}

/**
 * 新增产品管理
 * @param data
 * @returns void
 */
export function productAdd(data: ProductForm) {
  return requestClient.postWithMsg<void>('/iot/product', data);
}

/**
 * 更新产品管理
 * @param data
 * @returns void
 */
export function productUpdate(data: ProductForm) {
  return requestClient.putWithMsg<void>('/iot/product', data);
}

/**
 * 删除产品管理
 * @param id id
 * @returns void
 */
export function productRemove(id: ID | IDS) {
  return requestClient.deleteWithMsg<void>(`/iot/product/${id}`);
}
