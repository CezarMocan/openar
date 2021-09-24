import React, { useEffect, useState } from "react";

import { useLazyQuery } from "@apollo/client";

import { Box, Text, Flex, chakra } from "@chakra-ui/react";
import { ArrowLink } from "~/components/ui";
import {
  CornerButton,
  EmbeddedVideoPlayer,
  isValidEmbeddedVideoPlayerVideo,
  WalletActionRequired,
  IncompleteOverlay
} from "~/components/frontend";

import LogoXDAI from "~/assets/img/xdai/xdai-white.svg";
import { useAuthentication, useWalletLogin, useAppToast } from "~/hooks";
import { getArObjectTokenInfoGQL } from "~/graphql/queries";
import { BeatLoader } from "react-spinners";

import {
  OpenAR,
  Decimal,
  platformCuts,
  bigNumberToEther,
  numberToBigNumber,
} from "@openar/crypto";

import { appConfig } from "~/config";

export const ArtworkDetails = ({
  artwork,
  object,
}: {
  artwork: any;
  object: any;
}) => {
  const [profileUrl, setProfileUrl] = useState(
    `/u/${artwork.creator.ethAddress}`
  );

  const buySuccessToast = useAppToast(
    "Congratulations",
    "You've bought an edtion of this object",
    "success"
  );

  const buyErrorToast = useAppToast(
    "Oops",
    "Please login to buy",
    "error"
  );

  const [appUser, { hasCookies }] = useAuthentication();
  const [cryptoError, setCryptoError] = useState(undefined);
  const [isAwaitingWalletInteraction, setIsAwaitingWalletInteraction] =
    useState(false);
  const [isAwaitingBlockConfirmation, setIsAwaitingBlockConfirmation] =
    useState(false);
  const { library, account, chainId } = useWalletLogin();

  const [subgraphQueryTrigger, subgraphQuery] = useLazyQuery(getArObjectTokenInfoGQL, {
    variables: {
      arObjectKey: object?.key ?? "",
      first: 100,
    },
    context: { clientName: "subgraph" },
  });

  useEffect(() => {
    subgraphQueryTrigger();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const artist = artwork.creator?.pseudonym
    ? artwork.creator?.pseudonym
    : artwork.creator?.ethAddress;

  useEffect(() => {
    if (appUser && appUser.ethAddress === artwork?.creator?.ethAddress) {
      setProfileUrl("/x/");
    }
  }, [appUser, artwork?.creator?.ethAddress]);

  const ownedToken = subgraphQuery?.data?.medias
    ? subgraphQuery?.data?.medias.filter(
        (token) =>
          token.creator.id === token.owner.id &&
          token.creator.id.toLowerCase() ===
            artwork.creator?.ethAddress.toLowerCase()
      )
    : [];

  const currentAsk =
    ownedToken.length > 0 && ownedToken[0]?.currentAsk?.amount
      ? bigNumberToEther(ownedToken[0].currentAsk.amount)
      : null;

  /* --------- COL: Artwork details) --------- */

  const buy = async (tokenId: number, bid: number) => {
    let openAR: OpenAR;
    setCryptoError(undefined);

    try {
      if (library && account)
        openAR = new OpenAR(library.getSigner(account), chainId);

      if (!openAR || !appUser) {
        setCryptoError("Could not initialize connection to wallet");
        return;
      }

      setIsAwaitingWalletInteraction(true);

      const ownerCut = Decimal.rawBigNumber(
        Decimal.new(100)
          .value.sub(platformCuts.furtherSalesPool.value)
          .sub(platformCuts.furtherSalesPlatform.value)
          .sub(platformCuts.furtherSalesCreator.value)
      );

      const tx = await openAR
        .setNativeBid(
          numberToBigNumber(tokenId),
          openAR.createBid(bid, account),
          {
            platform: platformCuts.furtherSalesPlatform,
            pool: platformCuts.furtherSalesPool,
            owner: ownerCut,
            creator: platformCuts.furtherSalesCreator,
            prevOwner: Decimal.new(0),
          }
        )
        .catch((err) => {
          setIsAwaitingBlockConfirmation(false);
          if (err.message.indexOf("denied transaction") > -1) {
            setCryptoError("You've rejected the transaction");
          } else {
            setCryptoError(err.message);
          }
        });

      if (!tx) return;

      setIsAwaitingWalletInteraction(false);
      setIsAwaitingBlockConfirmation(true);

      tx.wait(chainId === 31337 ? 0 : appConfig.numBlockConfirmations)
        .catch((err) => {
          setIsAwaitingBlockConfirmation(false);
          setCryptoError(err.message);
        })
        .finally(() => {
          setTimeout(
            () => {
              // TODO: make interaction nicer ...
              buySuccessToast("Congratulations", `You've bought TODO: token number of `);
              subgraphQueryTrigger();
              setIsAwaitingBlockConfirmation(false);
            },
            chainId === 31337 ? 5000 : 0
          );
        });
    } catch (err) {
      setIsAwaitingBlockConfirmation(false);
      setCryptoError(err.message);
    }
  };

  const canBuy =
    `${artwork?.creator?.ethAddress}`.toLowerCase() !==
      `${appUser?.ethAddress}`.toLowerCase() &&
    appUser &&
    account &&
    hasCookies();
  return (
    <Flex
      direction="column"
      className="artworkDetails"
      w={{
        base: "100vw",
        t: "50vw",
        d: "33.3vw",
      }}
      height={{
        base: "auto",
        t: "100%",
      }}
      minHeight="100vh"
      bg="var(--chakra-colors-openar-muddygreen)"
      overflowY="auto"
    >
      {/* ======== BOX: Artwork title  ======== */}
      <Box className="artworkTitle" borderBottom="1px solid white" p="6">
        <chakra.h1 textStyle="pagetitle" maxWidth="80%">
          {artwork.title}
        </chakra.h1>
        <chakra.p textStyle="copy" h="auto" m="0">
          {artist}
        </chakra.p>
        <chakra.p textStyle="meta">
          {new Date(artwork.createdAt).getFullYear()}
        </chakra.p>
      </Box>

      <Box width="100%" overflow="auto" height="100%" flexGrow={0}>
        {/* ======== BOX: Artwork description  ======== */}
        <Box
          className="artworkDescription"
          borderBottom="1px solid white"
          p="6"
        >
          <chakra.p textStyle="label" className="label">
            Artwork description
          </chakra.p>
          <div dangerouslySetInnerHTML={{ __html: artwork.description }} />

          {object?.description && (
            <>
              <chakra.p textStyle="label" mt="4" className="label">
                Object description
              </chakra.p>
              <div dangerouslySetInnerHTML={{ __html: object.description }} />
            </>
          )}
        </Box>

        {/* ======== BOX: Artwork purchase  ======== */}
        {currentAsk && ownedToken.length > 0 && (
          <Box
            className="artworkPurchase"
            borderBottom="1px solid white"
            p="6"
            position="relative"
          >
            <CornerButton
              label="Buy"
              position="top"
              emphasis
              onClick={() => {
                if (canBuy) {
                  buy(ownedToken[0].id, parseFloat(currentAsk ?? "0"));                  
                } else {

                  if (`${artwork?.creator?.ethAddress}`.toLowerCase() ===
                  `${appUser?.ethAddress}`.toLowerCase()) {
                    buyErrorToast("Oops", "You can't buy your own token");
                  } else {
                    buyErrorToast("Oops", "Please login to buy");
                  }
                  
                }
              }}
              isDisabled={!canBuy}
            />
            <chakra.p
              textStyle="subtitle"
              mb="10"
              sx={{ svg: { display: "inline-block" } }}
            >
              <LogoXDAI width="30px" height="20px" viewBox="40 0 150 150" />
              {currentAsk} xDai
            </chakra.p>
            {/* ======== TODO: Edition number  ======== */}
            <chakra.p mb="0 !important" textStyle="label" className="label">
              Edition{" "}
              <chakra.span fontWeight="300" pl="1rem">
                {ownedToken.length} available. 
                
                {ownedToken[0].editionNumber}/{ownedToken[0].editionOf}
              </chakra.span>
            </chakra.p>
            {(subgraphQuery.loading || isAwaitingBlockConfirmation) && (
                <IncompleteOverlay
                  cornerRem="8rem"
                  headline={
                    isAwaitingBlockConfirmation
                      ? "Awaiting transaction confirmation"
                      : "Loading data"
                  }
                  height="100%"
                  marginLeft="6"
                  marginBottom="0"
                  justifyContent="center"
                  alignItems="center"
                  subline={
                    <Flex w="100%" justifyContent="center" pt="2">
                      <BeatLoader color="#fff" />
                    </Flex>
                  }
                />
              )}
          </Box>
        )}

        {/* _____________________________

                TODO: Buy Button onclick LINK
            _______________________________*/}

        {/* ======== BOX: Artwork further link  ======== */}
        {artwork.url && (
          <Box className="artworkURL" borderBottom="1px solid white" p="6">
            <chakra.p textStyle="label" className="label">
              More information
            </chakra.p>
            <ArrowLink href={artwork.url}>{artwork.url}</ArrowLink>
          </Box>
        )}

        {/* ======== BOX: Artist profile  ======== */}
        {artwork.creator.bio && (
          <Box
            className="artistInfo"
            borderBottom="1px solid white"
            p="6"
            position="relative"
          >
            <CornerButton href={profileUrl} label="View profile" />

            <chakra.p textStyle="label" className="label">
              About the artist
            </chakra.p>
            <div dangerouslySetInnerHTML={{ __html: artwork.creator.bio }} />
          </Box>
        )}

        {/* _____________________________

                TODO: View Profile onclick LINK
            _______________________________*/}

        {/* ======== BOX: Artwork video  ======== */}
        {artwork.video &&
          artwork.video.trim().length > 0 &&
          isValidEmbeddedVideoPlayerVideo(artwork.video) && (
            <Box
              className="artworkVideo"
              borderBottom="1px solid white"
              p="6"
              sx={{
                ".chakra-aspect-ratio": {
                  mx: "-6",
                  mt: "6",
                  mb: "-10",
                },
              }}
            >
              <chakra.p textStyle="label" className="label">
                Artwork video
              </chakra.p>
              <EmbeddedVideoPlayer url={artwork.video} />
            </Box>
          )}
      </Box>
      <WalletActionRequired
        isOpen={isAwaitingWalletInteraction}
        showClose={!!cryptoError}
        onClose={() => {
          setIsAwaitingWalletInteraction(false);
          setCryptoError(false);
        }}
        title="Confirmation required"
        error={cryptoError}
      >
        <Text color="white" mb="4">
          Please confirm the transaction in your wallet.
        </Text>
      </WalletActionRequired>
    </Flex>
  );
};

export default ArtworkDetails;
