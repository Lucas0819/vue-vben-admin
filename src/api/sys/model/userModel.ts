/**
 * @description: Login interface parameters
 */
export interface LoginParams {
  username: string;
  password: string;
  grant_type: string;
  scope: string;
}

//public class AuthTreeVO extends TreeNode<AuthTreeVO> implements Serializable {
//     private static final long serialVersionUID = 1L;
//
//     /**
//      * 权限编码（标识），作为分组时为空
//      */
//     @ApiModelProperty("权限编码（标识），作为分组时为空")
//     private String code;
//     /**
//      * 权限名称
//      */
//     @ApiModelProperty("权限名称")
//     private String name;
//
//     /**
//      * 类型
//      */
//     @ApiModelProperty("类型")
//     private String type;
//
//     /**
//      * 权限描述
//      */
//     @ApiModelProperty("权限描述")
//     private String description;
//
// }
// 转换为interface

/**
 * @description: Login interface return value
 */
export interface LoginResultModel {
  access_token: string;
  default_tenant_id: string;
  name: string;
  user_id: string;
  username: string;
}

export interface AuthTreeVO {
  code: string;
  name: string;
  description: string;
}

interface UserTenantListVO {
  id: number;
  name: string;
  shortName: string;
  visualAddress: string;
  longitude: string;
  latitude: string;
  logo: string;
}

export interface UserBaseInfoVO {
  id: number;
  username: string;
  gender: string;
  avatar: string;
  name: string;
  phone: string;
  email: string;
  userRole: string;
  orgName: string;
  companyName: string;
  homePath: string;
}

/**
 * @description: Get user information return value
 */
export interface GetUserInfoModel {
  sysUser: UserBaseInfoVO;
  defaultTenantId: string;
  defaultTenantType: string;
  defaultTenantName: string;
  permissions: AuthTreeVO[];
  roles: string[];
  tenants: UserTenantListVO[];
}
