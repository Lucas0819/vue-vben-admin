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
  StaffPage = ServiceProxyEnum.TICKET_GATEWAY + '/tenant_staff/page',
  IsAccountExist = ServiceProxyEnum.TICKET_GATEWAY + '/system/accountExist',
  // 组织机构
  DeptList = ServiceProxyEnum.UPMS + '/common/organize/tree',
  CreateDept = ServiceProxyEnum.TICKET_GATEWAY + '/organize',
  UpdateDept = ServiceProxyEnum.TICKET_GATEWAY + '/organize',
  DeleteDept = ServiceProxyEnum.TICKET_GATEWAY + '/organize/{id}',
  // 角色
  RolePageList = ServiceProxyEnum.TICKET_GATEWAY + '/role/page',
  RoleAuthIdList = ServiceProxyEnum.TICKET_GATEWAY + '/role/{id}/auth_ids',
  CreateRole = ServiceProxyEnum.TICKET_GATEWAY + '/role',
  UpdateRole = ServiceProxyEnum.TICKET_GATEWAY + '/role',
  UpdateRoleAuth = ServiceProxyEnum.TICKET_GATEWAY + '/role/auth',
  DeleteRole = ServiceProxyEnum.TICKET_GATEWAY + '/role/{id}',

  setRoleStatus = ServiceProxyEnum.TICKET_GATEWAY + '/system/setRoleStatus',
  MenuTreeList = ServiceProxyEnum.TICKET_GATEWAY + '/tenant/auth_tree',
  GetAllRoleList = ServiceProxyEnum.TICKET_GATEWAY + '/system/getAllRoleList',
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
