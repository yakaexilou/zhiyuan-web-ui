import type { PageQuery, BaseEntity } from '#/api/common';

export interface GatewayVO {
  /**
   * 
   */
  id: string | number;

  /**
   * 网关名称
   */
  name: string;

  /**
   * 网关编码
   */
  code: string;

  /**
   * 
   */
  lastRegisterTime: string;

}

export interface GatewayForm extends BaseEntity {
  /**
   * 
   */
  id?: string | number;

  /**
   * 网关名称
   */
  name?: string;

  /**
   * 网关编码
   */
  code?: string;

  /**
   * 
   */
  lastRegisterTime?: string;

}

export interface GatewayQuery extends PageQuery {
  /**
   * 网关名称
   */
  name?: string;

  /**
   * 网关编码
   */
  code?: string;

  /**
   * 
   */
  lastRegisterTime?: string;

  /**
    * 日期范围参数
    */
  params?: any;
}
