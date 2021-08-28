import { useState, useEffect } from "react";
import type { ReactElement } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import { LayoutOpenAR } from "~/components/app";
import { Box, Text, Button } from "@chakra-ui/react";
import { useConfigContext } from "~/providers";
import { useAuthentication, useTypedSelector, useWalletLogin} from "~/hooks";

const OpenARLogin = () => {
  const { account, walletLoginRequestSignature, walletLoginError, walletDisconnect, library } = useWalletLogin();

  const [appUser ] = useAuthentication();
  const stateUser = useTypedSelector(({ user }) => user);
  const stateCrypto = useTypedSelector(({ crypto }) => crypto);
  const router = useRouter();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  let navigating = false;

  if (appUser && stateUser.authenticated) {
    router.push("/openar/");
    navigating = true;
  }

  useEffect(() => {
    if (!library || !library?.provider) {

      if (stateCrypto.signatureRequired) {
        walletDisconnect();

      }
    }
      

  }, [library, walletDisconnect, stateCrypto.signatureRequired])
    
  return (
    <Box p="6">
      <Head>
        <title>TODO: OpenAR Title</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      {!appUser && stateUser.justConnected && !stateUser.authenticated && stateCrypto.loginMessage && (
        <Box>
          <Text mb="4">
          Hello, you&#39;re now connected with your wallet, to fully login please sign the login request using the button below.
          </Text>

          {walletLoginError && <Text color="red.400">{walletLoginError}</Text>}
          <Button
            mt="4"
            isLoading={isLoggingIn && !walletLoginError}
            onClick={async () => {
              setIsLoggingIn(true);
              await walletLoginRequestSignature(stateCrypto.loginMessage, account);

            }}
          >
            Sign login request
          </Button>
        </Box>
      )}
      {!stateUser.justConnected && (appUser || stateUser.authenticated) && !navigating && (
        <Box>
          <Text>
            Oops, it seems like you sidestepped the login process. Please connect
            your wallet first.
          </Text>
        </Box>
      )}
    </Box>
  );
};

OpenARLogin.getLayout = function getLayout(page: ReactElement) {
  return <LayoutOpenAR>{page}</LayoutOpenAR>;
};

export default OpenARLogin;
