import React from "react";
import Image from 'next/image';
import Link from 'next/link';
import { swapUrl } from "../../const/aLinks";

  const uniswapLink = swapUrl;
  const Logo = "/icons/pancakeswap.png"

export default function Unilink() {

  return (
  <Link href={swapUrl()} passHref><a target="_blank" rel="noopener noreferrer" title="PancakeSwap" style={{height: 25, borderRadius: 50, background: '#fff'}}>
  <Image src={Logo} width={25} height={25} alt="logo" />
  </a></Link>
  
  )
}