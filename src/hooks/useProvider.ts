// Dependencies
import { ethers } from 'ethers';

export function useProvider() {
  const provider = window.ethereum
    ? new ethers.providers.Web3Provider(window.ethereum)
    : new ethers.providers.JsonRpcProvider('https://bsc-dataseed.binance.org/');

  return provider;
}
