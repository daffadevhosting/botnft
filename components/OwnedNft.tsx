import {
  ThirdwebNftMedia,
  useAddress,
  useOwnedNFTs,
  Web3Button,
} from "@thirdweb-dev/react";
import { EditionDrop, SmartContract } from "@thirdweb-dev/sdk";
import React from "react";
import LoadingSection from "./LoadingSection";
import Alert from 'react-bootstrap/Alert';
import styles from "../styles/Home.module.scss";
import { MINING_CONTRACT_ADDRESS } from "../const/contract";

type Props = {
  initialContract: EditionDrop;
  miningContract: SmartContract<any>;
};

export default function OwnedNft({ initialContract, miningContract }: Props) {
  const address = useAddress();
  const { data: ownedInitials, isLoading } = useOwnedNFTs(
    initialContract,
    address
  );

  if (isLoading) {
    return <LoadingSection />;
  }

  async function equip(id: string) {
    if (!address) return;

    // The contract requires approval to be able to transfer the initial
    const hasApproval = await initialContract.isApproved(
      address,
      MINING_CONTRACT_ADDRESS
    );

    if (!hasApproval) {
      await initialContract.setApprovalForAll(MINING_CONTRACT_ADDRESS, true);
    }

    await miningContract.call("stake", id);

    // Refresh the page
    window.location.reload();
  }
  
  if (ownedInitials?.length === 0  || undefined) {
    return <Alert variant="danger" className="mt-4">
        <Alert.Heading>Oh snap! tidak ada NFT..</Alert.Heading>
        <p>Untuk memulai atau mengupgrade kecepatan mining, kamu harus memiliki NFT.</p>
      </Alert>;
  }

  return (
    <>
          <h4 style={{marginTop: '20px'}}>
            NFT kamu
          </h4>
          <div
            style={{
              width: "100%",
              minHeight: "10rem",
              marginTop: 8,
            }}
          >
      <div className={styles.nftBoxGrid}>
        {ownedInitials?.map((p) => (
          <div className={styles.nftStakeBox} key={p.metadata.id.toString()}>
            <ThirdwebNftMedia
              metadata={p.metadata}
              className={`${styles.nftStakeMedia}`}
              height={"64"}
            />
            <p>{p.metadata.name}</p>
              <Web3Button
                className={`${styles.stakeBtn} ${styles.spacerBottom}`}
                colorMode="dark"
				accentColor="#0d6efd"
                contractAddress={MINING_CONTRACT_ADDRESS}
                action={() => equip(p.metadata.id)}
              >
                Stake
              </Web3Button>
          </div>
        ))}
          </div>
      </div>
    </>
  );
}
