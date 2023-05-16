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
import { ServiceEnum } from '@/enums/serviceEnum';

enum Api {
  // 员工
  StaffPage = ServiceEnum.TICKET_GATEWAY + '/tenant_staff/page',
  IsAccountExist = ServiceEnum.TICKET_GATEWAY + '/system/accountExist',
  StaffDetail = ServiceEnum.TICKET_GATEWAY + '/tenant_staff/{id}/detail',
  CreateStaff = ServiceEnum.TICKET_GATEWAY + '/tenant_staff',
  UpdateStaff = ServiceEnum.TICKET_GATEWAY + '/tenant_staff',
  DeleteStaff = ServiceEnum.TICKET_GATEWAY + '/tenant_staff/{id}',
  // 组织机构
  DeptList = ServiceEnum.UPMS + '/common/organize/tree',
  CreateDept = ServiceEnum.TICKET_GATEWAY + '/organize',
  UpdateDept = ServiceEnum.TICKET_GATEWAY + '/organize',
  DeleteDept = ServiceEnum.TICKET_GATEWAY + '/organize/{id}',
  // 角色
  RolePageList = ServiceEnum.TICKET_GATEWAY + '/role/page',
  RoleAuthIdList = ServiceEnum.TICKET_GATEWAY + '/role/{id}/auth_ids',
  CreateRole = ServiceEnum.TICKET_GATEWAY + '/role',
  UpdateRole = ServiceEnum.TICKET_GATEWAY + '/role',
  UpdateRoleAuth = ServiceEnum.TICKET_GATEWAY + '/role/auth',
  DeleteRole = ServiceEnum.TICKET_GATEWAY + '/role/{id}',

  setRoleStatus = ServiceEnum.TICKET_GATEWAY + '/system/setRoleStatus',
  MenuTreeList = ServiceEnum.TICKET_GATEWAY + '/tenant/auth_tree',
  GetAllRoleList = ServiceEnum.TICKET_GATEWAY + '/role/list',
}

export const getStaffPage = (params: StaffParams) =>
  defHttp.get<StaffListGetResultModel>({ url: Api.StaffPage, params });

export const getStaffDetail = (id) =>
  defHttp.get<StaffParams>({ url: Api.StaffDetail.replace('{id}', id) });

export const createStaff = (params?: StaffParams) => defHttp.post({ url: Api.CreateStaff, params });

export const updateStaff = (params?: StaffParams) => defHttp.put({ url: Api.UpdateStaff, params });

export const deleteStaff = (params: string) =>
  defHttp.delete({ url: Api.DeleteStaff.replace('{id}', params) });

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
