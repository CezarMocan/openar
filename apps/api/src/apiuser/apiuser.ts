import type { RoleName, PermissionName } from "./roles";

export interface AuthenticatedAppUserFunctions {
  is(name: RoleName): boolean;
  has(names: RoleName | RoleName[]): boolean;
  can(permissions: PermissionName | PermissionName[]): boolean;
}

export interface AuthenticatedAppUserData {
  id: number;
  role: RoleName;
  roles: RoleName[];
  permissions: PermissionName[];
  pseudonym: string;
  ethAddress: string;
  ens?: string;
}

export interface AuthenticatedAppUser
  extends AuthenticatedAppUserData,
    AuthenticatedAppUserFunctions {}

export interface JwtPayloadAuthenticatedAppUser {
  id: number;
  pseudonym?: string | null;
  email?: string | null;
  ethAddress: string;
  role?: string;
  roles?: RoleName[];
  permissions?: PermissionName[];
}

const is = (role: RoleName, name: RoleName): boolean => name === role;

const has = (roles: RoleName[], names: RoleName | RoleName[]): boolean =>
  (Array.isArray(names) ? names : [names]).some((name) => roles.includes(name));

const can = (
  permissions: PermissionName[],
  perms: PermissionName | PermissionName[]
): boolean =>
  (Array.isArray(perms) ? perms : [perms]).some((perm) =>
    permissions.includes(perm)
  );

export const createAuthenticatedAppUser = (
  id: number,
  role: RoleName,
  roles: RoleName[],
  permissions: PermissionName[],
  pseudonym: string,
  ethAddress: string
): AuthenticatedAppUser => {
  const user: AuthenticatedAppUser = {
    id,
    role,
    roles,
    permissions,
    pseudonym,
    ethAddress,
    is(name: RoleName) {
      return is(this.role, name);
    },
    has(names: RoleName | RoleName[]) {
      return has(this.roles, names);
    },
    can(perms: PermissionName | PermissionName[]) {
      return can(this.permissions, perms);
    },
  };

  return user;
};
