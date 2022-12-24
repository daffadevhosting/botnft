import React from "react";
import Image from 'next/image';
import Link from 'next/link';
import { swapUrl } from "../../const/aLinks";

  const swapLink = swapUrl;
  const Logo = "/icons/Swap.png"

export default function LinkSwap() {

  return (
  <Link href={swapUrl()} passHref><a target="_blank" rel="noopener noreferrer" title="buy token" style={{height: 25}}>
  <Image src={Logo} width={200} height={35} alt="logo" />
  </a></Link>
  
  )
}