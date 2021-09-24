import React, { useEffect } from "react";

import {
  Box,
  Text,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";

import Image from "next/image";
import Router from "next/router";

import { useOpenARDappWeb3InjectedContext } from "~/providers";
import { useTypedSelector, useWalletLogin } from "~/hooks";
import { appConfig } from "~/config";

export const WalletControl = ({
  color = "white",
  location = "menu",
  onCloseMenu,
}: {
  color?: string;
  location?: string;
  onCloseMenu?: () => void;
}) => {
  const stateUser = useTypedSelector(({ user }) => user);
  const stateCrypto = useTypedSelector(({ crypto }) => crypto);

  const web3Injected = useOpenARDappWeb3InjectedContext();
  const {
    awaitingUserInteraction,
    walletDisconnect,
    walletReconnect,
    walletLoginError,
    connectInjected,
    connectWalletConnect,
    account,
    isLoggingIn,
    library,
  } = useWalletLogin();

  const walletDisclosure = useDisclosure();

  useEffect(() => {
    if (
      (stateUser.authenticated || stateCrypto.signatureRequired) &&
      walletDisclosure.isOpen &&
      library
    ) {
      console.log("useEffect walletDisclosure.onClose()");
      walletDisclosure.onClose();
      if (typeof onCloseMenu === "function")
        onCloseMenu.call(null);

      if (Router.asPath.indexOf("/sign") !== 0)
        Router.push("/sign")
    }
  }, [
    stateUser.authenticated,
    stateCrypto.signatureRequired,
    walletDisclosure,
    library,
  ]);

  return (
    <Box>
      {/* ------- Buttons ------- */}
      <Box>
        {(!account || !stateUser.authenticated) && (
          <Button
            variant={location === "page" ? "outlineBlack" : "menuLink"}
            onClick={() => {
              walletDisclosure.onOpen()              
            }}
            color={color}
          >
            Login
          </Button>
        )}

        {account && stateUser.authenticated && (
          <Button
            variant="menuLink"
            onClick={async () => {
              await walletDisconnect();
            }}
            color={color}
          >
            Logout
          </Button>
        )}
      </Box>

      <Modal
        isOpen={walletDisclosure.isOpen}
        onClose={walletDisclosure.onClose}
      >
        <ModalOverlay bg="blackAlpha.800" />
        <ModalContent
          color="white"
          pt="0"
          bg="openar.muddygreen"
          borderRadius="0"
        >
          <ModalHeader pb="0">Connect to your wallet</ModalHeader>
          <ModalCloseButton fontSize="lg" />
          <ModalBody>
            <Text color="white" mb="4">
              Instead of a login we use your wallet to give you access to
              OpenAR. This is a two step process:
              <br />
              <br />
              (1) You connect to the wallet, then
              <br />
              (2) If you&#39;re new, haven&#39;t been around for a while, or
              cleared your cookies we ask you sign a transaction (which is free)
              to give our server a chance to check if you are who you claim you
              are.
            </Text>
            {walletLoginError && (
              <Text color="openar.error">{walletLoginError}</Text>
            )}
            <Button
              colorScheme="openarWhite"
              justifyContent="space-between"
              width="100%"
              mt="4"
              mb="4"
              size="lg"
              variant="outline"
              isDisabled={!web3Injected}
              isLoading={
                isLoggingIn &&
                awaitingUserInteraction &&
                awaitingUserInteraction === "injected"
              }
              rightIcon={
                <Image
                  width="30px"
                  height="30px"
                  src="/images/logo-metamask.svg"
                  alt="MetaMask"
                />
              }
              onClick={async () => {

                try {
                  await connectInjected();

                } catch (err) {
                  console.log("connectInjected Error");
                }
                
              }}
            >
              MetaMask
            </Button>
            <Button
              colorScheme="openarWhite"
              justifyContent="space-between"
              width="100%"
              mb="4"
              size="lg"
              variant="outline"
              isLoading={
                isLoggingIn &&
                awaitingUserInteraction &&
                awaitingUserInteraction === "walletconnect"
              }
              rightIcon={
                <Image
                  width="30px"
                  height="30px"
                  src="/images/logo-walletconnect.svg"
                  alt="WalletConnect"
                />
              }
              onClick={async () => {
                await connectWalletConnect();
              }}
            >
              WalletConnect
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};
