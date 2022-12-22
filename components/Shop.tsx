import { ThirdwebNftMedia, useNFTs } from "@thirdweb-dev/react";
import { EditionDrop } from "@thirdweb-dev/sdk";
import React, { useEffect } from "react";
import styles from "../styles/Home.module.scss";
import ShopNft from "./NftItem";

type Props = {
  initialContract: EditionDrop;
};

export default function Shop({ initialContract }: Props) {
  const { data: availableInitials } = useNFTs(initialContract);

  return (
    <>
      <div className={styles.nftBoxGridshop}>
        {availableInitials?.map((p) => (
          <ShopNft
            initialContract={initialContract}
            item={p}
            key={p.metadata.id.toString()}
          />
        ))}
      </div>
    </>
  );
}
