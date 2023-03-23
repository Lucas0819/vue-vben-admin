import {
  DeptListGetResultModel,
  DeptListItem,
  MenuListGetResultModel,
  MenuParams,
  RoleAuthParams,
  RoleListGetResultModel,
  RoleListItem,
  RolePageListGetResultModel,
  RolePageParams,
  RoleParams,
  StaffListGetResultModel,
  StaffParams,
} from './model/systemModel';
import { defHttp } from '/@/utils/http/axios';

enum Api {
  // 员工
  AccountList = '/system/getAccountList',
  StaffPage = '/enterprise/enterprise_manage_web_gateway/tenant_staff/page',
  IsAccountExist = '/system/accountExist',
  // 组织机构
  DeptList = '/upms/common/organize/tree',
  CreateDept = '/enterprise/enterprise_manage_web_gateway/organize',
  UpdateDept = '/enterprise/enterprise_manage_web_gateway/organize',
  DeleteDept = '/enterprise/enterprise_manage_web_gateway/organize/{id}',
  // 角色
  RolePageList = '/enterprise/enterprise_manage_web_gateway/role/page',
  RoleAuthIdList = '/enterprise/enterprise_manage_web_gateway/role/{id}/auth_ids',
  CreateRole = '/enterprise/enterprise_manage_web_gateway/role',
  UpdateRole = '/enterprise/enterprise_manage_web_gateway/role',
  UpdateRoleAuth = '/enterprise/enterprise_manage_web_gateway/role/auth',
  DeleteRole = '/enterprise/enterprise_manage_web_gateway/role/{id}',

  setRoleStatus = '/system/setRoleStatus',
  MenuTreeList = '/enterprise/enterprise_manage_web_gateway/tenant/auth_tree',
  GetAllRoleList = '/system/getAllRoleList',
}

export const getStaffPage = (params: StaffParams) =>
  defHttp.get<StaffListGetResultModel>({ url: Api.StaffPage, params });

export const getDeptList = (params?: DeptListItem) =>
  defHttp.get<DeptListGetResultModel>({ url: Api.DeptList, params });

export const createDept = (params?: DeptListItem) => defHttp.post({ url: Api.CreateDept, params });

export const updateDept = (params?: DeptListItem) => defHttp.put({ url: Api.UpdateDept, params });

export const deleteDept = (params: string) =>
  defHttp.delete({ url: Api.DeleteDept.replace('{id}', params) });

export const getMenuList = (params?: MenuParams) =>
  defHttp.get<MenuListGetResultModel>({ url: Api.MenuTreeList, params });

export const getRoleListByPage = (params?: RolePageParams) =>
  defHttp.get<RolePageListGetResultModel>({ url: Api.RolePageList, params });

export const getRoleAuthIdList = (roleId: string) =>
  defHttp.get<number[]>({ url: Api.RoleAuthIdList.replace('{id}', roleId) });

export const createRole = (params?: RoleListItem) => defHttp.post({ url: Api.CreateRole, params });

export const updateRole = (params?: RoleListItem) => defHttp.put({ url: Api.UpdateRole, params });

export const updateRoleAuth = (params?: RoleAuthParams) =>
  defHttp.put(
    { url: Api.UpdateRoleAuth, params },
    {
      joinParamsToUrl: true,
    },
  );

export const deleteRole = (params: string) =>
  defHttp.delete({ url: Api.DeleteRole.replace('{id}', params) });

export const getAllRoleList = (params?: RoleParams) =>
  defHttp.get<RoleListGetResultModel>({ url: Api.GetAllRoleList, params });

export const setRoleStatus = (id: number, status: string) =>
  defHttp.post({ url: Api.setRoleStatus, params: { id, status } });

export const isAccountExist = (account: string) =>
  defHttp.post({ url: Api.IsAccountExist, params: { account } }, { errorMessageMode: 'none' });
