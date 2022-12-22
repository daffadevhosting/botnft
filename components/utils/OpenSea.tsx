import React from "react";
import Image from 'next/image';
import Link from 'next/link';
import { openseaUrl } from "../../const/aLinks";

const openseaLink = openseaUrl;
const Logo = "/icons/opensea.svg"

export default function OpenSea() {

  return (
  <Link href={openseaLink()} passHref>
  <a target="_blank" rel="noopener noreferrer" title="OpenSea" style={{height: 25, borderRadius: 50, background: '#fff'}}>
  <Image src={Logo} width={25} height={25} alt="logo" />
  </a></Link>
  
  )
}