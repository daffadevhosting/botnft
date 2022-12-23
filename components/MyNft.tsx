import { ThirdwebNftMedia, useAddress, useNFT } from "@thirdweb-dev/react";
import { EditionDrop, NFT, SmartContract } from "@thirdweb-dev/sdk";
import React, { useEffect, useState } from "react";
import ContractMappingResponse from "../types/ContractMappingResponse";
import { INITIAL_TOKEN_SYMBOL } from "../const/contract";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Image from 'next/image';
import { swapUrl } from "../const/aLinks";
import styles from "../styles/Home.module.scss";
import MiningAnim from "../styles/Anim.module.scss";

const Symbol = INITIAL_TOKEN_SYMBOL;

type Props = {
  miningContract: SmartContract<any>;
  characterContract: EditionDrop;
  initialContract: EditionDrop;
};

const swapToken = swapUrl;

export default function CurrentGear({
  miningContract,
  characterContract,
  initialContract,
}: Props) {
  const address = useAddress();

  const { data: playerNft } = useNFT(characterContract, 0);
  const [initial, setInitial] = useState<NFT>();


  useEffect(() => {
    (async () => {
      if (!address) return;

      const p = (await miningContract.call(
        "playerNFT",
        address
      )) as ContractMappingResponse;


      if (p.isData) {
        const initialMetadata = await initialContract.get(p.value);
        setInitial(initialMetadata);
      }
    })();
  }, [address, miningContract, initialContract]);

  return (
<>
{initial ? (
<Card style={{backgroundColor: 'transparent', minHeight: '224.05px', overflow: 'hidden'}}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
          zIndex: '1',
        }}
      >
        {/* Currently equipped player */}
        <div style={{ borderRadius: 16, overflow: 'hidden', }}>
          {playerNft && (
            <ThirdwebNftMedia metadata={playerNft?.metadata} height={"40"} width={"40"} style={{objectFit: "cover", position: 'absolute', top: 0, minHeight: '200px'}} />
          )}
        </div>
        {/* Currently equipped initial */}
        <div
          style={{ borderRadius: 16, marginLeft: 8, overflow: 'hidden', minHeight: '240px' }}
        >
          {initial && (
            // @ts-ignore
            <ThirdwebNftMedia metadata={initial.metadata} height={"40"} width={"40"} style={{objectFit: "cover", position: 'absolute', right: 0, minHeight: '200px'}} />
          )}
        </div>
      </div>
{initial && (
            // @ts-ignore
      <span className={`${styles.noGapTop} `}></span> 
    )}

</Card>
) : ( 
<>
<Card style={{ minHeight: '224.05px' }}>
    <Card.Body className={MiningAnim.sliderBox} style={{padding: '10px', textAlign: 'left', color: '#121212'}}>
<Card.Title>Cara Mining Token{Symbol}</Card.Title>
<span> Untuk memulai, kamu harus memiliki NFT BOT yang akan otomatis mengaktifkan fungsi mining setelah di stake.<br/>Setiap <b>NFT</b> mempunyai tingkat kecepatan mining yang berbeda. Token <b>{Symbol}</b> bisa dibeli atau ditukarkan ke <b>BNB</b> (binance) di <a href={swapToken()} target='_blank' rel="noreferrer"><b>PancakeSwap</b></a>.</span>
    </Card.Body>
</Card>
</>
    )}
</>
  );
}
