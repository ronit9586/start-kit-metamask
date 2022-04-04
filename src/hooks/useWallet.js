import { BigNumber, ethers } from 'ethers';
import React, { createContext, useEffect, useState } from 'react'

export default function useWallet(reqChainId) {

    const [account, setAccount] = useState('0x');
    const [provider, setProvider] = useState(null);
    const [shortAccount, setshortAddress] = useState(null);
    const [connected, setConnected] = useState(false);
    const [balance, setBalance] = useState(0);

    const trimAccount = (account) => {
        return account.slice(0, 5) + "..." + account.slice(-4);
    }

    const activate = async () => {
        if (!window.ethereum) {
            throw Error("Metamask is not installed");
        }
        await window.ethereum
            .request({ method: 'eth_requestAccounts' })
        const chainId = await window.ethereum.request({ method: 'eth_chainId' })
        const reqChain = BigNumber.from(reqChainId).toHexString();
        if(chainId!= reqChain)
            await window.ethereum
            .request({ method: 'wallet_switchEthereumChain', params: [{chainId: reqChain}] })
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(provider);
        const account = await provider.getSigner().getAddress();
        setshortAddress(trimAccount(account));
        setAccount(account);
        const balance = await provider.getBalance(account);
        setBalance(balance)
        setConnected(true) 
    }
    return { account, provider, activate, shortAccount, connected, balance };
}
