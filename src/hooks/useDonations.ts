// Dependencies
import { useState, useEffect, useMemo, useCallback } from 'react';
import { ethers } from 'ethers';

// Contracts
import BUSDToken from '../contracts/BUSDToken';
import ToysLegendDonation from '../contracts/ToysLegendDonation';

// Hooks
import { useProvider } from './useProvider';

// Utils
import { requestAccount } from '../utils/requestAccount';
import { isSupportedNetwork } from '../utils/isSupportedNetwork';

type Status = 'idle' | 'loading' | 'success' | 'error';

export function useDonations() {
  const provider = useProvider();
  const [status, setStatus] = useState<Status>('idle');
  const [hashTax, setHashTax] = useState<string | null>(null);
  const [currentDonations, setCurrentDonations] = useState(0);
  const [maxNumberOfDonators, setMaxNumberOfDonators] = useState(0);
  const [errorMessageID, setErrorMessageID] = useState<ErrorMessageIDs>(
    'donations.error.generic.text'
  );

  const toysLegendDonationReadOnly = useMemo(() => {
    return new ethers.Contract(
      ToysLegendDonation.address,
      ToysLegendDonation.abi,
      provider
    );
  }, [provider]);

  const busdTokenReadOnly = useMemo(() => {
    return new ethers.Contract(BUSDToken.address, BUSDToken.abi, provider);
  }, [provider]);

  const handleAddedToDonorsEvent = useCallback(() => {
    async function updateNumberOfDonators() {
      const numberOfDonatorsBigNumber =
        await toysLegendDonationReadOnly.numberOfDonators();
      const numberOfDonators = +numberOfDonatorsBigNumber.toString();

      setCurrentDonations(numberOfDonators);
    }

    updateNumberOfDonators();
  }, [toysLegendDonationReadOnly]);

  useEffect(() => {
    if (!window.ethereum) return

    async function fetchData() {
      const network = await provider.getNetwork();
      const supported = await isSupportedNetwork(network.chainId);

      if (!supported) {
        setStatus('error');
        setErrorMessageID('donations.error.network');

        return;
      }

      const [numberOfDonatorsBigNumber, maxNumberOfDonatorsBigNumber] =
        await Promise.all([
          toysLegendDonationReadOnly.numberOfDonators(),
          toysLegendDonationReadOnly.maxNumberOfDonators(),
        ]);

      const numberOfDonators = +numberOfDonatorsBigNumber.toString();
      const newMaxNumberOfDonators = +maxNumberOfDonatorsBigNumber.toString();

      setCurrentDonations(numberOfDonators);
      setMaxNumberOfDonators(newMaxNumberOfDonators);
    }

    fetchData();

    toysLegendDonationReadOnly.on('AddedToDonors', handleAddedToDonorsEvent);

    return () => {
      toysLegendDonationReadOnly.removeListener(
        'AddedToDonors',
        handleAddedToDonorsEvent
      );
    };
  }, [handleAddedToDonorsEvent, provider, toysLegendDonationReadOnly]);

  async function makeDonation() {
    try {
      await requestAccount();

      const signer = provider.getSigner();
      const busdTokenSigner = busdTokenReadOnly.connect(signer);
      const toysLegendDonationSigner =
        toysLegendDonationReadOnly.connect(signer);

      setStatus('loading');

      const busdApproveTrasaction = await busdTokenSigner.approve(
        ToysLegendDonation.address,
        ethers.utils.parseEther('1')
      );
      await busdApproveTrasaction.wait();

      const transactionDonation = await toysLegendDonationSigner.makeDonation();
      await transactionDonation.wait();

      setStatus('success');
      setHashTax(transactionDonation.hash);
    } catch (error: any) {
      if (error?.data?.message?.includes(`You're a donator`)) {
        setErrorMessageID('donations.error.account-whitelisted');
      } else {
        setErrorMessageID('donations.error.generic.text');
      }

      setStatus('error');
      console.log({ error });
    }
  }

  return {
    status,
    hashTax,
    setStatus,
    setHashTax,
    makeDonation,
    errorMessageID,
    currentDonations,
    setCurrentDonations,
    maxNumberOfDonators,
  };
}
