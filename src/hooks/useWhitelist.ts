// Dependencies
import { useState, useMemo } from 'react';
import { ethers } from 'ethers';

// Contracts
import ToysLegendWhiteList from '../contracts/ToysLegendWhiteList';

// Hooks
import { useProvider } from './useProvider';

// Utils
import { requestAccount } from '../utils/requestAccount';

export function useWhitelist() {
  const provider = useProvider();
  const [isWhitelisted, setIsWhitelisted] = useState<boolean | null>(null);

  const toysLegendWhiteListReadOnly = useMemo(() => {
    return new ethers.Contract(
      ToysLegendWhiteList.address,
      ToysLegendWhiteList.abi,
      provider
    );
  }, [provider]);

  async function checkIfIsWhiteListed() {
    try {
      await requestAccount();
      
      const signer = provider.getSigner();
      const signerAddress = await signer.getAddress();

      setIsWhitelisted(
        await toysLegendWhiteListReadOnly.isWhitelisted(signerAddress)
      )
    } catch(error) {
      console.error(error)
    }
  }

  return {
    isWhitelisted,
    checkIfIsWhiteListed,
  };
}
