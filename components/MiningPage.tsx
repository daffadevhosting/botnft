import {
  useAddress,
  useContract,
  useEditionDrop,
  useMetamask,
  useToken,
} from "@thirdweb-dev/react";
import React, { useState } from "react";
import Head from "next/head";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import CurrentNFT from "../components/MyNft";
import LoadingSection from "../components/LoadingSection";
import StakedNft from "../components/OwnedNft";
import Rewards from "../components/Rewards";
import Shop from "../components/Shop";
import Navigation from "../components/utils/Navbar";
import SwapLink from '../components/utils/LinkSwap';
import OpenseaShop from '../components/utils/BtnOpensea';
import { BsShopWindow } from "react-icons/bs";
import {
  DROP_EDITION_ADDRESS,
  MINING_CONTRACT_ADDRESS,
  INITIAL_TOKEN_ADDRESS,
  INITIAL_EDITION_ADDRESS,
} from "../const/contract";
import styles from "../styles/Home.module.scss";

export default function Play() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const title = "BOTnft Testnet";
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const { contract: miningContract } = useContract(MINING_CONTRACT_ADDRESS);
  const characterContract = useEditionDrop(DROP_EDITION_ADDRESS);
  const initialContract = useEditionDrop(INITIAL_EDITION_ADDRESS);
  const tokenContract = useToken(INITIAL_TOKEN_ADDRESS);

  if (!address) {
    return (
      <Container>
        <div className={styles.loading}>
            <Button className={styles.mainButton} onClick={connectWithMetamask}>
                Connect Wallet
            </Button>
        </div>
      </Container>
    );
  }

  return (
<>
<Head>
<title>{title}</title>
</Head>
	<Navigation/>
    <Container style={{ margin: '10px auto' }}>
      {miningContract &&
      characterContract &&
      tokenContract &&
      initialContract ? (
        <div className={styles.mainSection}>
          <CurrentNFT
            miningContract={miningContract}
            characterContract={characterContract}
            initialContract={initialContract}
          />
          <Rewards
            miningContract={miningContract}
            tokenContract={tokenContract}
          />
        </div>
      ) : (
        <></>
      )}


      {initialContract && miningContract ? (
        <>
            <StakedNft
              initialContract={initialContract}
              miningContract={miningContract}
            />
        </>
      ) : (
        <LoadingSection />
      )}
<></>
    <Offcanvas show={show} onHide={handleClose} placement='bottom' style={{height: '100vh', color: '#121212'}}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title><BsShopWindow size={'28px'}/> Shop</Offcanvas.Title>
		  <SwapLink/>
        </Offcanvas.Header>
        <Offcanvas.Body>
      {initialContract && tokenContract ? (
        <>
          <div
            style={{
              width: "100%",
              minHeight: "10rem",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 8,
            }}
          >
            <Shop initialContract={initialContract} />
          </div>

        </>
      ) : (
        <LoadingSection />
      )}
        </Offcanvas.Body>
      </Offcanvas>
<Button variant="primary" onClick={handleShow} className="me-2" style={{position: 'fixed', bottom: 20, right: 20, width: '54px', height: '54px', borderRadius: '50%'}} title="NFT shop"><BsShopWindow size={'28px'}/></Button>
<OpenseaShop />
    </Container>
</>
  );
}
