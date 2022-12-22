import {
  ThirdwebNftMedia,
  useAddress,
  useMetadata,
  useContractRead,
  useTokenBalance,
} from "@thirdweb-dev/react";
import { SmartContract, Token } from "@thirdweb-dev/sdk";
import { INITIAL_TOKEN_ADDRESS, MINING_CONTRACT_ADDRESS, INITIAL_TOKEN_SYMBOL } from "../const/contract";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Swal from 'sweetalert2';
import Image from 'next/image';
import Link from 'next/link';
import styles from "../styles/Home.module.scss";
import MinerWorker from "./TokenMiner";
import { explorerUrl, cmcUrl } from "../const/aLinks";

const numberContract = INITIAL_TOKEN_ADDRESS;
const Symbol = INITIAL_TOKEN_SYMBOL;
const tokenScan = explorerUrl;
const cmcToken = cmcUrl;
const cmcLogo = "/icons/CMC.png"
const scanLogo = "/logo-bscscan.svg"

type Props = {
  miningContract: SmartContract<any>;
  tokenContract: Token;
};

export default function Rewards({ miningContract, tokenContract }: Props) {
  const address = useAddress();

  const { data: tokenMetadata } = useMetadata(tokenContract);
  const { data: currentBalance } = useTokenBalance(tokenContract, address);
  const { data: unclaimedAmount } = useContractRead(
    miningContract,
    "calculateRewards",
    address
  );

  async function claimReward() {
    if (!address) return;

    await miningContract.call("claim")
    {
    try {
        Swal.fire({
          icon: 'success',
          title: 'Token berhasil di claim...',
          showConfirmButton: false,
          timer: 3800
        });
    } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Token gagal di claim...',
          showConfirmButton: false,
          timer: 3800
        });
    }
  }

    // Refresh the page
    window.location.reload();
}

  return (
    <Card className={styles.rewardBox}
    >
{tokenMetadata && (
<>
      <Card.Title>
<div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between',}}>
<div className={styles.titleLeft}>
        <ThirdwebNftMedia
          // @ts-ignore
          metadata={tokenMetadata}
          height={"25"}
        /> {tokenMetadata.name} </div>
<div className={styles.titleRight}>
<a target='_blank' href={cmcToken()} rel="noreferrer"><Image src={cmcLogo} width={20} height={20} alt='Token Scan'/></a>
<a target='_blank' href={tokenScan()} rel="noreferrer"><Image src={scanLogo} width={120} height={20} alt='Token Scan'/></a></div>
</div>
      </Card.Title>
<small style={{marginBottom: 10}}>smartcontracts: {numberContract}</small>
      <p className={styles.noGapBottom}>

        Saldo Dompet: <b>{currentBalance?.displayValue} <small>{Symbol}</small></b>
      </p>
      <p>
       Token Terkumpul:{" "}
        <b>{unclaimedAmount && ethers.utils.formatUnits(unclaimedAmount)} <small>{Symbol}</small></b>
      </p>
</>
      )}
      <MinerWorker miningContract={miningContract} />

      <Button variant="primary"
        onClick={() => claimReward()}
        className={styles.miniBtn}
        style={{display: 'block', width: '-webkit-fill-available', height: '2.2rem'}}
      >
        Withdraw {unclaimedAmount && ethers.utils.formatUnits(unclaimedAmount)} {Symbol}
      </Button>
   </Card>
  );
}
