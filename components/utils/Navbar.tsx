import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Disconnect from './Disconnect';
import UniLink from './Unilink';
import OpenSea from './OpenSea';
import TokenScan from './ScanToken';
import styles from "../../styles/Home.module.scss";

const TxtTitle = 'BOT Testnet';

function Navigation() {
  return (
      <Navbar className={styles.glass} sticky="top">
        <Container>
          <Navbar.Brand href="/" style={{color: "#fff"}}>{TxtTitle}</Navbar.Brand>
		  <div style={{display: "flex", alignItems: "center", gap: 10}}>
		  <OpenSea />
		  <UniLink />
		  <TokenScan />
          <Disconnect/>
		  </div>
        </Container>
      </Navbar>
  );
}

export default Navigation;
