import React, { useEffect } from 'react'
import { useMetamask } from './App';

export default function Test() {
    const { account, provider, activate, shortAccount, connected, balance } = useMetamask();
    useEffect(()=> {
        //to connect metamask just call activate() of useMetamask
        (async function(){
           activate(); 
        })();
    }, [])

    useEffect(()=> {
        if(!connected) return;
        console.log(account, shortAccount);

    },[connected])
    return (
        <div>Test</div>
    )
}
