import React, { useState } from "react";
import {
  useTokenBalance,
  useContractRead,
  useMetadata,
  useAddress,
  useDisconnect,
  useMetamask, useWalletConnect, useCoinbaseWallet,
} from "@thirdweb-dev/react";
import { SmartContract, Token } from "@thirdweb-dev/sdk";
import { ethers } from "ethers";
import { MINING_CONTRACT_ADDRESS, INITIAL_TOKEN_SYMBOL } from "../../const/contract";
import { RiLogoutCircleRLine, RiLoginCircleLine, RiWallet3Line } from "react-icons/ri";
import Badge from 'react-bootstrap/Badge';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import styles from "../../styles/Home.module.scss";

type Props = {
  miningContract: SmartContract<any>;
  tokenContract: Token;
};

export default function Disconnect({ miningContract, tokenContract }: Props) {
  const Symbol = INITIAL_TOKEN_SYMBOL;
  const { data: tokenMetadata } = useMetadata(tokenContract);
  const { data: currentBalance } = useTokenBalance(tokenContract, address);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShowConnect = () => setShow(true);
  const handleShowDisconnect = () => setShow(true);
  
  const connectWithMetamask = useMetamask();
  const connectWithWalletConnect = useWalletConnect();
  const connectWithCoinbaseWallet = useCoinbaseWallet();
  const address = useAddress();
  const disconnectWallet = useDisconnect();

  return (
    <>
        {address ? (
		<>
        <Button className={styles.btn_log} onClick={handleShowDisconnect} variant='danger' style={{maxHeight: 30}} title="Sign Out">
                    <p className={styles.desktop_only} style={{margin: 0}}>{address.slice(0, 3).concat("*").concat(address.slice(-4))}</p>
        <RiWallet3Line size='24' />
        </Button>
    <Modal show={show} onHide={handleClose} animation={true} backdrop="static" centered>
        <Modal.Header closeButton>
          <Modal.Title style={{color: "#000000"}}>Sign Out Wallet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
                    <p style={{marginBottom: 20, color: '#000'}}>Your Wallet Address<br/>{address}</p>
{tokenMetadata && (
<>
      <p style={{marginBottom: 20, color: '#000'}}>
        Saldo Dompet: <b>{currentBalance?.displayValue} <small>{Symbol}</small></b>
      </p>
</>
      )}
        <Button className={styles.btn_log} onClick={() => disconnectWallet()} variant='danger' style={{maxHeight: 30, float: 'right'}} title="Sign Out">
                    <p className={styles.desktop_only} style={{margin: 0}}>Sign Out</p>
        <RiLogoutCircleRLine size='24' />
        </Button>
    </Modal.Body>
      </Modal>
	  </>
          ) : (
		  <>
        <Button
          className={`${styles.btn_log}`}
           onClick={handleShowConnect}
        >
          <p className={styles.desktop_only} style={{margin: 0}}>Enter App</p> <RiLoginCircleLine size='24' /> 
        </Button>
    <Modal show={show} onHide={handleClose} animation={true} backdrop="static" centered>
        <Modal.Header closeButton>
          <Modal.Title style={{color: "#000000"}}>Connect Wallet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
    <ListGroup>
      <ListGroup.Item style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 15, cursor: 'pointer'}} onClick={ () => { connectWithMetamask(); handleClose();}}><div style={{display: 'flex', alignItems: 'center', gap: 15}}><i className={styles.metamask}/> MetaMask</div> <Badge bg="primary">Popular</Badge></ListGroup.Item>
      <ListGroup.Item style={{display: 'flex', alignItems: 'center', gap: 15, cursor: 'pointer'}} onClick={ () => { connectWithWalletConnect(); handleClose();}}><i className={styles.walletconnect}/> WalletConnect</ListGroup.Item>
      <ListGroup.Item style={{display: 'flex', alignItems: 'center', gap: 15, cursor: 'pointer'}} onClick={ () => { connectWithCoinbaseWallet(); handleClose();}}><i className={styles.coinbase}/> Coin Base</ListGroup.Item>
    </ListGroup>
    </Modal.Body>
      </Modal>
		  </>
		)}
    </>
  );
}
