import React, { useState } from "react";
import {
  useAddress,
  useDisconnect,
  useMetamask, useWalletConnect, useCoinbaseWallet,
} from "@thirdweb-dev/react";
import { RiLogoutCircleRLine, RiLoginCircleLine } from "react-icons/ri";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import styles from "../../styles/Home.module.scss";

export default function Disconnect() {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShowModal = () => setShow(true);
  
  const connectWithMetamask = useMetamask();
  const connectWithWalletConnect = useWalletConnect();
  const connectWithCoinbaseWallet = useCoinbaseWallet();
  const address = useAddress();
  const disconnectWallet = useDisconnect();

  return (
    <>
        {address ? (
        <Button className={styles.btn_log} onClick={() => disconnectWallet()} variant='danger' style={{maxHeight: 30}} title="Sign Out">
                    <p className={styles.desktop_only} style={{margin: 0}}>{address.slice(0, 3).concat("*").concat(address.slice(-4))}</p>
        <RiLogoutCircleRLine size='24' />
        </Button>
          ) : (
		  <>
        <Button
          className={`${styles.btn_log}`}
           onClick={handleShowModal}
        >
          <p className={styles.desktop_only} style={{margin: 0}}>Enter App</p> <RiLoginCircleLine size='24' /> 
        </Button>
    <Modal show={show} onHide={handleClose} animation={true} backdrop="static" centered>
        <Modal.Header closeButton>
          <Modal.Title style={{color: "#000000"}}>Connect Wallet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
    <ListGroup>
      <ListGroup.Item style={{display: 'flex', alignItems: 'center', gap: 15, cursor: 'pointer'}} onClick={ () => { connectWithMetamask(); handleClose();}}><i className={styles.metamask}/> MetaMask</ListGroup.Item>
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
