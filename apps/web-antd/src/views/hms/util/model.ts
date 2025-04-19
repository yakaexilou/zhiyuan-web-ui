/**
 * @description: 部门树带站房信息
 */
export interface DeptTree {
  id: number;
  /**
   * antd组件必须要这个属性 实际是没有这个属性的
   */
  key: string;
  parentId: number;
  label: string;
  weight: number;
  children?: DeptTree[];
}
