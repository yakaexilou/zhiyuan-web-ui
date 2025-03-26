import { defHttp } from '#/api/request';

const apiPrefix = '/cloud-biz/products';

export function pageList(query: any) {
  return defHttp.get(`${apiPrefix}/list`, { params: query });
}
export function create(obj: any) {
  return defHttp.post(`${apiPrefix}`, obj);
}

export function modify(row: any) {
  return defHttp.put(`${apiPrefix}/${row.id}`, row);
}

export function remove(id: any) {
  return defHttp.delete(`${apiPrefix}/${id}`);
}
