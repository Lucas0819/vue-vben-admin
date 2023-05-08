import { BasicPageParams, BasicFetchResult } from '/@/api/model/baseModel';

export type StaffParams = BasicPageParams & {
  queryParam?: string;
};

export type RoleParams = {
  queryParam?: string;
};

export type RolePageParams = BasicPageParams & RoleParams;

export type RoleAuthParams = {
  roleId: string;
  authIds: string[];
};

export type DeptParams = {
  deptName?: string;
  status?: string;
};

export type MenuParams = {
  menuName?: string;
  status?: string;
};

export interface StaffListItem {
  active: boolean;
  id: number;
  name: string;
  orgId: number;
  orgName: string;
  phone: string;
  roleName: string;
  status: string;
  userId: number;
}

export interface DeptListItem {
  id: string;
  name: string;
  parentId: string;
  sort: string;
  type: number;
  children: DeptListItem[];
}

export interface MenuListItem {
  code: string;
  description: string;
  id: number;
  name: string;
  parentId: number;
  type: string;
  children: MenuListItem[];
}

export interface RoleListItem {
  id: number;
  isAdmin: boolean;
  isDefault: boolean;
  name: string;
}

/**
 * @description: Request list return value
 */
export type StaffListGetResultModel = BasicFetchResult<StaffListItem>;

export type DeptListGetResultModel = BasicFetchResult<DeptListItem>;

export type MenuListGetResultModel = BasicFetchResult<MenuListItem>;

export type RolePageListGetResultModel = BasicFetchResult<RoleListItem>;

export type RoleListGetResultModel = RoleListItem[];
