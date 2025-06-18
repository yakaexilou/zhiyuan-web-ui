import type { PageQuery, BaseEntity } from '#/api/common';

export interface OtaupgradeFilePacksVO {
  /**
   * ID
   */
  id: string | number;

  /**
   * 文件ID
   */
  fileid: string | number;

  /**
   * 包序号
   */
  packindex: number;

  /**
   * 创建时间
   */
  createtime: string;

}

export interface OtaupgradeFilePacksForm extends BaseEntity {
  /**
   * 文件ID
   */
  fileid?: string | number;

  /**
   * 包序号
   */
  packindex?: number;

  /**
   * 升级包内容
   */
  content?: string;

  /**
   * 创建时间
   */
  createtime?: string;

}

export interface OtaupgradeFilePacksQuery extends PageQuery {
  /**
   * 文件ID
   */
  fileid?: string | number;

  /**
    * 日期范围参数
    */
  params?: any;
}
