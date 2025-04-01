import type { ExchangeForm, ExchangeQuery, ExchangeVO } from './model';

import type { ID, IDS, PageResult } from '#/api/common';

import { commonExport } from '#/api/helper';
import { requestClient } from '#/api/request';

/**
 * 查询机组列表
 * @param params
 * @returns 机组列表
 */
export function exchangeList(params?: ExchangeQuery) {
  return requestClient.get<PageResult<ExchangeVO>>('/hms/exchange/list', {
    params,
  });
}

/**
 * 导出机组列表
 * @param params
 * @returns 机组列表
 */
export function exchangeExport(params?: ExchangeQuery) {
  return commonExport('/hms/exchange/export', params ?? {});
}

/**
 * 查询机组详情
 * @param id id
 * @returns 机组详情
 */
export function exchangeInfo(id: ID) {
  return requestClient.get<ExchangeVO>(`/hms/exchange/${id}`);
}

/**
 * 新增机组
 * @param data
 * @returns void
 */
export function exchangeAdd(data: ExchangeForm) {
  return requestClient.postWithMsg<void>('/hms/exchange', data);
}

/**
 * 更新机组
 * @param data
 * @returns void
 */
export function exchangeUpdate(data: ExchangeForm) {
  return requestClient.putWithMsg<void>('/hms/exchange', data);
}

/**
 * 删除机组
 * @param id id
 * @returns void
 */
export function exchangeRemove(id: ID | IDS) {
  return requestClient.deleteWithMsg<void>(`/hms/exchange/${id}`);
}
