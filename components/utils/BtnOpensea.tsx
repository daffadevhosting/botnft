import React from "react";
import Image from 'next/image';
import Link from 'next/link';
import { shopUrl } from "../../const/aLinks";

  const uniswapLink = shopUrl;
  const Logo = "/icons/opensea.png"

export default function BtnOpensea() {

  return (
  <Link href={shopUrl()} passHref><a target="_blank" rel="noopener noreferrer" title="Buy at OpenSea" style={{position: 'fixed', bottom: 20, right: 100, width: '54px', height: '54px'}}>
  <Image src={Logo} width={54} height={54} alt="opensea" />
  </a></Link>
  
  )
}