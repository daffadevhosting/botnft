import React from "react";
import Image from 'next/image';
import Link from 'next/link';
import { explorerUrl } from "../../const/aLinks";

  const explorerLink = explorerUrl;
  const Logo = "/icons/bscscan-logo.png"
  
export default function ScanToken() {

  return (
  <Link href={explorerLink()} passHref><a target="_blank" rel="noopener noreferrer" title="BSCscan" style={{height: 25, borderRadius: 50, background: '#fff'}}>
  <Image src={Logo} width={25} height={25} alt="logo" />
  </a></Link>
  
  )
}