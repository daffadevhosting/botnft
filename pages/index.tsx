import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.scss";
import {
  useAddress,
  useContract,
  useMetamask, useWalletConnect, useCoinbaseWallet,
  useOwnedNFTs,
  useNetwork,
  useNetworkMismatch,
  ChainId
} from "@thirdweb-dev/react";
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Offcanvas from 'react-bootstrap/Offcanvas';
import ListGroup from 'react-bootstrap/ListGroup';
import { DROP_EDITION_ADDRESS } from "../const/contract";
import MintContainer from "../components/MintContainer";
import SwitchNetwork from "../components/SwitchNetwork";
import Nav from "../components/utils/Navbar";
import { RiExchangeFundsFill } from "react-icons/ri";
import MiningToken from "../components/MiningPage";
import LandingPage from "../components/Landing";
import { useRouter } from "next/router";
import Spinner from 'react-bootstrap/Spinner';

const Home: NextPage = () => {

  const networkMismatch = useNetworkMismatch();
  const [, switchNetwork] = useNetwork();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShowModal = () => setShow(true);
  const handleOffcanvas = () => setShow(true);

  const { contract: editionDrop } = useContract(
    DROP_EDITION_ADDRESS,
    "edition-drop"
  );
  const title = "BOTnft Testnet";
  
  const connectWithMetamask = useMetamask();
  const connectWithWalletConnect = useWalletConnect();
  const connectWithCoinbaseWallet = useCoinbaseWallet();
  const address = useAddress();
  const router = useRouter();

  const {
    data: ownedNfts,
    isLoading,
    isError,
  } = useOwnedNFTs(editionDrop, address);

  if (!address) {
    return (
<>
<Head>
<title>{title}</title>
</Head>
	<Nav />
    <div className={styles.midCenter} style={{width: '100%'}}>
		<LandingPage />
	</div>
</>
    );
  }


  // 1. Loading
  if (isLoading) {
    return <div className={styles.loading}><Spinner animation="grow" variant="primary" /></div>;
  }

  // Something went wrong
  if (!ownedNfts || isError) {
    return <div className={styles.loading}>Error...!</div>;
  }

  // 2. No NFTs - mint page
  if (ownedNfts.length === 0 || networkMismatch) {
    return (
<>
<Head>
<title>{title}</title>
</Head>
        <SwitchNetwork />
        <MintContainer />
</>
    );
  }

  // 3. Has NFT already - show button to take to game
  return (
<>
<Head>
<title>{title}</title>
</Head>
    <div className={styles.containerPlay}>
        <SwitchNetwork />
        <MiningToken />
	</div>
</>
  );
};

export default Home;
