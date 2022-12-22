import {
  ThirdwebNftMedia,
  useAddress,
  useClaimNFT,
  useActiveClaimCondition,
  useContract,
  useNFT
} from "@thirdweb-dev/react";
import { BigNumber } from "ethers";
import React, { useState } from "react";
import Image from 'next/image';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Swal from 'sweetalert2';
import Navigation from "../components/utils/Navbar";
import SwitchNetwork from "../components/SwitchNetwork";
import { DROP_EDITION_ADDRESS, INITIAL_TOKEN_PRICE } from "../const/contract";
import styles from "../styles/Home.module.scss";

  const tokenId = 0;
  const image = "/testnet.gif"
  const price = INITIAL_TOKEN_PRICE
  
export default function MintContainer() {
  const { contract: editionDrop } = useContract(DROP_EDITION_ADDRESS);
  const { mutate: claim, isLoading } = useClaimNFT(editionDrop);
  const address = useAddress();
  
  const { data: nftMetadata } = useNFT(editionDrop, tokenId);

  const { data: activeClaimCondition } = useActiveClaimCondition(
    editionDrop,
    BigNumber.from(tokenId)
  );
  
  async function mint() {
    try {
      claim(
        {
            quantity: 1,
            to: address as string,
            tokenId: 0,
          },
        {
          onSuccess: (data) => {
            Swal.fire({
              icon: 'success',
              title: 'Successfully Claim Member...',
              showConfirmButton: false,
              timer: 4000
            });
          },
          onError: (error) => {
            const e = error;
            Swal.fire({
              icon: 'error',
              title: 'Gagal Claim Member...',
              showConfirmButton: false,
              timer: 8000,
			  footer: '<a href="https://testnet.bnbchain.org/faucet-smart" target="_blank">Kamu perlu tBNB token?</a>'
            });
          },
        }
      );
    } catch (error) {
            Swal.fire({
              icon: 'error',
              title: 'Gagal Claim Member...',
              showConfirmButton: false,
              timer: 3800
            });
        }
  }

  return (
  <>
	<Navigation/>
      <div className={styles.container}>
    <div className={styles.collectionContainer}>
      <h1>BOT Member only</h1>

      <p>Claim Kartu member mu & mulai menambang!</p>

      <Card bg='warning' text='light'>
        <Card.Img variant="top" src={image} height={240} width={160} alt="logo" />
      <Card.Body>
	  <Card.Text style={{display: 'flex', alignItems: 'center', gap: 10}}>
            <div className={styles.mintAreaLeft}>
              <p className="m-0">Total Member {":"}</p>
            </div>
            <div className={styles.mintAreaRight}>
              {activeClaimCondition ? (
                <p className="m-0">
                  <b>{activeClaimCondition.currentMintSupply}</b>
                  {"  "}
                </p>
              ) : (
                <p className="m-0"><Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        /></p>
              )}
            </div>
          </Card.Text>
      </Card.Body>
      </Card>
        {isLoading ? (
<div className={styles.mt_150}>
      <Button className={`${styles.mainButton} ${styles.spacerBottom}`} disabled>
        <span>Claiming... </span>
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        />
      </Button>
</div>
    ) : (
<div className={styles.mt_150}>
      <Button
        className={`${styles.mainButton} ${styles.spacerBottom}`}
        onClick={() =>
          mint()
        }

      >
    Claim {price}
      </Button>
</div>
 )}
      </div>
    </div>
	</>
  );
}
