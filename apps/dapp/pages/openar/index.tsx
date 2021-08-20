import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

// import { useEthers, useEtherBalance } from "@usedapp/core";
// import { formatUnits } from "@ethersproject/units";

const OpenArPage: NextPage = () => {
  // const { activateBrowserWallet, deactivate, account } = useEthers();
  // const userBalance = useEtherBalance(account);
  // const stakingBalance = useEtherBalance(STAKING_CONTRACT);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div>
          {/* {!account && (
            <button onClick={() => activateBrowserWallet()}> Connect </button>
          )}
          {account && <button onClick={deactivate}> Disconnect </button>}

          {stakingBalance && (
            <p>ETH2 staking balance: {formatUnits(stakingBalance, 18)} ETH </p>
          )}
          {account && <p>Account: {account}</p>}
          {userBalance && (
            <p>Ether balance: {formatUnits(userBalance, 18)} ETH </p>
          )} */}

          {`${process.env.NEXT_PUBLIC_INFURA_URL}`}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default OpenArPage;
