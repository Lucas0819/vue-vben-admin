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
import { ServiceProxyEnum } from '@/enums/httpEnum';

enum Api {
  // 员工
  StaffPage = '/tenant_staff/page',
  IsAccountExist = '/system/accountExist',
  // 组织机构
  DeptList = '/common/organize/tree',
  CreateDept = '/organize',
  UpdateDept = '/organize',
  DeleteDept = '/organize/{id}',
  // 角色
  RolePageList = '/role/page',
  RoleAuthIdList = '/role/{id}/auth_ids',
  CreateRole = '/role',
  UpdateRole = '/role',
  UpdateRoleAuth = '/role/auth',
  DeleteRole = '/role/{id}',

  setRoleStatus = '/system/setRoleStatus',
  MenuTreeList = '/tenant/auth_tree',
  GetAllRoleList = '/system/getAllRoleList',
}

export const getStaffPage = (params: StaffParams) =>
  defHttp.get<StaffListGetResultModel>(
    { url: Api.StaffPage, params },
    { serviceProxy: ServiceProxyEnum.UPMS },
  );

export const getDeptList = (params?: DeptListItem) =>
  defHttp.get<DeptListGetResultModel>(
    { url: Api.DeptList, params },
    { serviceProxy: ServiceProxyEnum.UPMS },
  );

export const createDept = (params?: DeptListItem) =>
  defHttp.post({ url: Api.CreateDept, params }, { serviceProxy: ServiceProxyEnum.UPMS });

export const updateDept = (params?: DeptListItem) =>
  defHttp.put({ url: Api.UpdateDept, params }, { serviceProxy: ServiceProxyEnum.UPMS });

export const deleteDept = (params: string) =>
  defHttp.delete(
    { url: Api.DeleteDept.replace('{id}', params) },
    { serviceProxy: ServiceProxyEnum.UPMS },
  );

export const getMenuList = (params?: MenuParams) =>
  defHttp.get<MenuListGetResultModel>(
    { url: Api.MenuTreeList, params },
    { serviceProxy: ServiceProxyEnum.UPMS },
  );

export const getRoleListByPage = (params?: RolePageParams) =>
  defHttp.get<RolePageListGetResultModel>(
    { url: Api.RolePageList, params },
    { serviceProxy: ServiceProxyEnum.UPMS },
  );

export const getRoleAuthIdList = (roleId: string) =>
  defHttp.get<number[]>(
    { url: Api.RoleAuthIdList.replace('{id}', roleId) },
    { serviceProxy: ServiceProxyEnum.UPMS },
  );

export const createRole = (params?: RoleListItem) =>
  defHttp.post({ url: Api.CreateRole, params }, { serviceProxy: ServiceProxyEnum.UPMS });

export const updateRole = (params?: RoleListItem) =>
  defHttp.put({ url: Api.UpdateRole, params }, { serviceProxy: ServiceProxyEnum.UPMS });

export const updateRoleAuth = (params?: RoleAuthParams) =>
  defHttp.put(
    { url: Api.UpdateRoleAuth, params },
    {
      joinParamsToUrl: true,
      serviceProxy: ServiceProxyEnum.UPMS,
    },
  );

export const deleteRole = (params: string) =>
  defHttp.delete(
    { url: Api.DeleteRole.replace('{id}', params) },
    { serviceProxy: ServiceProxyEnum.UPMS },
  );

export const getAllRoleList = (params?: RoleParams) =>
  defHttp.get<RoleListGetResultModel>(
    { url: Api.GetAllRoleList, params },
    { serviceProxy: ServiceProxyEnum.UPMS },
  );

export const setRoleStatus = (id: number, status: string) =>
  defHttp.post(
    { url: Api.setRoleStatus, params: { id, status } },
    { serviceProxy: ServiceProxyEnum.UPMS },
  );

export const isAccountExist = (account: string) =>
  defHttp.post(
    { url: Api.IsAccountExist, params: { account } },
    { errorMessageMode: 'none', serviceProxy: ServiceProxyEnum.UPMS },
  );
