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

const minimunContribution = process.env.REACT_APP_PUBLIC_MINIMUN_CONTRIBUTION || 25

export function useDonations() {
  const provider = useProvider();
  const [status, setStatus] = useState<Status>('idle');
  const [hashTax, setHashTax] = useState<string | null>(null);
  const [currentDonations, setCurrentDonations] = useState(0);
  const [isDonor, setIsDonor] = useState<boolean | null>(null);
  const [maxNumberOfDonators, setMaxNumberOfDonators] = useState(0);
  const [errorMessageID, setErrorMessageID] = useState<ErrorMessageIDs>(
    'donations.error.generic.text'
  );
  const [stepMessageID, setStepMessageID] = useState<StepMessageIDs>(
    'donations.step.waiting'
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

      const address = await signer.getAddress()

      const balaceOfSigner = await busdTokenSigner.balanceOf(address);
      const balaceOfSignerInEther = ethers.utils.formatEther(balaceOfSigner);
      const balaceOfSignerInt = parseInt(balaceOfSignerInEther, 10);

      if (balaceOfSignerInt < minimunContribution) {
        setStatus('error');
        setErrorMessageID('donations.error.not-enough-balance');
      
        return;
      }

      setStepMessageID('donations.step.approve');
      const busdApproveTrasaction = await busdTokenSigner.approve(
        ToysLegendDonation.address,
        ethers.utils.parseEther(minimunContribution.toString())
      );
      await busdApproveTrasaction.wait();

      setStepMessageID('donations.step.transfer');
      const transactionDonation = await toysLegendDonationSigner.makeDonation();
      await transactionDonation.wait();

      setStatus('success');
      setHashTax(transactionDonation.hash);
    } catch (error: any) {
      if (error?.data?.message?.includes(`You're a donator`)) {
        setErrorMessageID('donations.error.account-whitelisted');
      } else if (error?.message?.includes('User denied transaction ')) {
        setErrorMessageID('donations.error.user-denied-transaction');
      } else {
        setErrorMessageID('donations.error.generic.text');
      }

      setStatus('error');
    }
  }

  async function checkIfIsDonator() {
    try {
      await requestAccount();
      const [address] = await window.ethereum.request({ method: 'eth_accounts' })
  
      setIsDonor(
        await toysLegendDonationReadOnly.isDonator(address)
      )
    } catch(error) {
      setStatus('error');
    }
  }

  return {
    status,
    hashTax,
    setStatus,
    setHashTax,
    makeDonation,
    isDonor,
    stepMessageID,
    errorMessageID,
    currentDonations,
    setCurrentDonations,
    maxNumberOfDonators,
    checkIfIsDonator,
  };
}
