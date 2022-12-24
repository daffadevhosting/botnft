import React from "react";
import {
  useAddress,
  ThirdwebNftMedia,
  useActiveClaimCondition,
  Web3Button,
} from "@thirdweb-dev/react";
import { EditionDrop, NFT } from "@thirdweb-dev/sdk";
import { ethers } from "ethers";
import { INITIAL_TOKEN_SYMBOL,
 INITIAL_EDITION_ADDRESS } from "../const/contract";
import Swal from 'sweetalert2';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import styles from "../styles/Home.module.scss";

const Symbol = INITIAL_TOKEN_SYMBOL;

type Props = {
  initialContract: EditionDrop;
  item: NFT;
};

export default function NftItem({ item, initialContract }: Props) {
  const address = useAddress();

  const { data: claimCondition } = useActiveClaimCondition(
    initialContract,
    item.metadata.id
  );

  return (
    <Card style={{ maxWidth: '18rem' }} className={styles.nftBox} key={item.metadata.id.toString()}>
      <ThirdwebNftMedia
        metadata={item.metadata}
        className={`${styles.nftMedia} ${styles.spacerBottom}`}
        height={"64"}
      />
      <Card.Body className="p-0" style={{ maxWidth: '18rem', display: 'flex', flexDirection: "column", justifyContent: "space-between" }}>
      <h6>{item.metadata.name}</h6>
      <small>{item.metadata.description}</small>
      <p>
        Harga:{" "}
        <b>
          {claimCondition && ethers.utils.formatUnits(claimCondition?.price)}{" "}
          {Symbol}
        </b>
      </p>
        <Web3Button 
          className={`${styles.miniBtn} ${styles.spacerBottom}`}
		  colorMode="dark"
		  accentColor="#0d6efd"
          contractAddress={INITIAL_EDITION_ADDRESS}
          action={(contract) => contract.erc1155.claim(item.metadata.id, 1)}
          onSuccess={() => {
            Swal.fire({
              title: 'Success!',
              text: 'Pembelian Mining Card berhasil, Silahkan Staking..',
              icon: 'success',
              confirmButtonText: 'Cool'
              });
          }
		 }
          onError={(error) => {
            const e = error;
            Swal.fire({
              title: 'Error!',
              text: 'Pembelian Mining Card Gagal..',
              icon: 'error',
              confirmButtonText: 'Blah',
			  footer: '<a href="https://pancakeswap.finance/swap?inputCurrency=tBNB&exactField=output&exactAmount=5&outputCurrency=0xc1727Cc93dF43060A95234fF2510A526f05df9C5&chainId=97" target="_blank">Beli token BOT di PANCAKESWAP?</a>'
              });
          }
		 }
        >
          Beli
        </Web3Button>
      </Card.Body>
    </Card>
  );
}
