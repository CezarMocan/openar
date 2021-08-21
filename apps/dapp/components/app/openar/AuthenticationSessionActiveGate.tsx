import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useEthers } from "@usedapp/core";

import { user } from "~/services";
import { useTypedSelector, useAuthTabWideLogInOutReload } from "~/hooks";

export const AuthenticationSessionActiveGate = ({
  children,
  publicRoutesPaths,
}: {
  children: React.ReactNode;
  publicRoutesPaths: string[];
}) => {
  const [loginStatus] = useAuthTabWideLogInOutReload();

  const { connected } = useTypedSelector(({ crypto }) => crypto);
  const router = useRouter();
  const { account, deactivate } = useEthers();
  console.log("useEthers Account()", connected, account, router.asPath);

  useEffect(() => {
    const processLogout = async () => {
      console.log("logout() AuthGate");
      await user.logout();
    };

    if (connected && !account) {
      console.log("block unwanted recconects");
      // processLogout();
      // router.push("/openar/connect/");
    }
  }, [connected, account, deactivate]);

  useEffect(() => {
    const processLogout = async () => {
      console.log("logout() AuthGate");
      await user.logout();
    };

    if (!connected || !user.isLocalSessionValid()) {
      console.log("session invalid should logout");
      // processLogout();
      // router.push("/openar/connect/");
    } else {
      user.setAllowRefresh(true);
      user.setRefreshing(false);
    }
    // e slint-disable-next-line react-hooks/exhaustive-deps
  }, [connected, router]);

  useEffect(() => {
    if (loginStatus === "logged-out" && router.asPath !== "/openar/connect")
      router.push("/openar/connect/");
    
  }, [loginStatus, router]);

  return <>{children}</>;
};
