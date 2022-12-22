import {
  useNetwork,
  useNetworkMismatch,
  ChainId
} from "@thirdweb-dev/react";
import Image from 'next/image';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { ChainName } from '../const/aLinks';
import { RiErrorWarningFill } from "react-icons/ri";
import styles from "../styles/Home.module.scss";


export default function SwitchNetwork() {

  const networkMismatch = useNetworkMismatch();
  const [, switchNetwork] = useNetwork();

  const Title = "Salah Jaringan";
  const networkName = ChainName();
  const Logo = "/icons/bnb.svg"
  
  return (
<>
{networkMismatch ? (
<div className={styles.coverup}>
    <Card bg="dark" style={{ width: '18rem' }}  className={`${styles.midCenter}`}>
      <Card.Body>
        <Card.Title><RiErrorWarningFill size={28}/> {Title}</Card.Title>
		<Card.Text>Website ini berinteraksi di jaringan {networkName}.<p/>
          Silahkan ganti ke jaringan {networkName}.
        </Card.Text>
    <Button onClick={() => switchNetwork(Number(process.env.NEXT_PUBLIC_CHAIN_ID))} className={`${styles.switchNet}`}>
      <Image src={Logo} width={25} height={25} alt="logo" /> {networkName}
    </Button>
      </Card.Body>
    </Card>
</div>
) : (
<>
</>
)}
</>
    );
}
