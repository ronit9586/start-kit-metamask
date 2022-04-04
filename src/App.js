import logo from './logo.svg';
import './App.css';
import { createContext, useContext } from 'react';
import useWallet from './hooks/useWallet';
import Test from './Test';

const WalletContext = createContext();

export function useMetamask() {
  return useContext(WalletContext);
}
function App() {
  const wallet = useWallet("0x61");

  return (
    <WalletContext.Provider value={wallet}>
      <Test></Test>
    </WalletContext.Provider>
  );
}

export default App;
