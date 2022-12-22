import { SwapWidget } from '@uniswap/widgets'
import { INITIAL_TOKEN_ADDRESS, INITIAL_TOKEN_SYMBOL } from "../../const/contract";
import styles from "../../styles/Home.module.scss";
import '@uniswap/widgets/fonts.css'


const UNISWAP_TOKEN_LIST = 'https://gateway.ipfs.io/ipns/tokens.uniswap.org'

const NATIVE = 'NATIVE'

const ORD = INITIAL_TOKEN_ADDRESS;
const Symbol = INITIAL_TOKEN_SYMBOL;

const MY_TOKEN_LIST = [
  {
    "name": "PIPO monster",
    "address": "0x0a457C01C9bDD748A342a6860963CbE75E60b2A8",
    "symbol": "PIM",
    "decimals": 18,
    "chainId": 80001,
    "logoURI": "https://gateway.ipfscdn.io/ipfs/QmShmvJptzUttGvQTgDHmGS4nmQX33UxjMZRWwHkXDe2ry/miner.png"
  },
]



export default function Uniswap() {
  return (
    <>
  <div className="Uniswap">
  <div className={styles.midCenter}>
    <SwapWidget
      tokenList={MY_TOKEN_LIST}
      defaultInputTokenAddress={NATIVE}
      defaultInputAmount={1}
      defaultOutputTokenAddress={ORD}
      width={360} />
  </div>
  </div>
    </>
  );
}