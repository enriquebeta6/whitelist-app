// Dependencies
import { ethers } from 'ethers';

export function useProvider() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  return provider;
}
