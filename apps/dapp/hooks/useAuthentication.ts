import type { AuthenticatedAppUserData } from "~/appuser";
import { createAuthenticatedAppUser } from "~/appuser";

import { useRouter } from "next/router";
import { useTypedSelector } from "~/hooks";

import { user, authentication } from "~/services";

export const useAuthentication = () => {
  const router = useRouter();
  const { authenticated, appUserData } = useTypedSelector(({ user }) => user);

  const appUser =
    authentication.getRefreshCookie() &&
    appUserData &&
    appUserData?.id &&
    appUserData.ethAddress
      ? createAuthenticatedAppUser(appUserData)
      : null;

  const isLoggedIn = (): boolean => {
    return (authenticated && appUserData !== null) || user.isRefreshing();
  };

  const login = async (u: AuthenticatedAppUserData): Promise<boolean> => {
    return await user.login(u);
  };

  const logout = async () => {
    return await user.logout();
  };

  const preLoginLogout = async () => {
    return await user.preLoginLogout();
  };

  const logoutAndRedirect = async (path: string = "/login") => {
    const result = await user.logout();
    router.push(path);
    return result;
  };

  return [
    appUser,
    { isLoggedIn, login, logout, preLoginLogout, logoutAndRedirect },
  ] as const;
};
