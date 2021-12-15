async function isSupportedNetwork(chainId: number) {
  // 56 = mainnet
  // 97 = testnet
  // 1337 = localhost
  // 31337 = hardhat

  const { REACT_APP_PUBLIC_CHAIN_ID = '' } = process.env ?? {}
  
  return chainId === parseInt(REACT_APP_PUBLIC_CHAIN_ID, 10);
}

export { isSupportedNetwork };
