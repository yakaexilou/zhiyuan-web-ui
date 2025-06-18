import type { PageQuery, BaseEntity } from '#/api/common';

export interface OtaupgradeFileVO {
  /**
   * ID
   */
  id: string | number;

  /**
   * 升级文件
   */
  name: string;

  /**
   * 升级前版本
   */
  oldvesion: string;

  /**
   * 当前版本
   */
  newvesion: string;

  /**
   * 产品类型
   */
  productId: string | number;

  productName: String;
  /**
   * 分包大小
   */
  packsize: number;

  /**
   * 文件名
   */
  filename: string;

  filesize: number;

  finecontent: string;

  /**
   *
   */
  lastRegisterTime: string;

  /**
   * 创建时间
   */
  createTime: string;

}

export interface OtaupgradeFileForm extends BaseEntity {
  /**
   * ID
   */
  id?: string | number;

  /**
   * 升级文件
   */
  name?: string;

  /**
   * 升级前版本
   */
  oldvesion?: string;

  /**
   * 当前版本
   */
  newvesion?: string;

  /**
   * 产品类型
   */
  productId?: string | number;

  /**
   * 分包大小
   */
  packsize?: number;

  /**
   * 文件名
   */
  filename?: string;


  filesize: number;

  /**
   * 文件内容
   */
  filecontent?: string;


}

export interface OtaupgradeFileQuery extends PageQuery {
  /**
   * 升级文件
   */
  name?: string;

  /**
   * 产品类型
   */
  productId?: string | number;

  /**
   *
   */
  lastRegisterTime?: string;

  /**
    * 日期范围参数
    */
  params?: any;
}
