import React, { useEffect } from "react";
import { useRouter } from "next/router";

import { useAuthentication } from "~/hooks";

export const AuthenticationSessionActiveGate = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const [appUser] = useAuthentication();

  const router = useRouter();

  useEffect(() => {
    if (!appUser && router.asPath !== "/connect")
      router.replace("/connect");    
    // eslint-disable-next-line 
  }, []);

  return <>{children}</>;
};
