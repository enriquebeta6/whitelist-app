export function requestAccount() {
  try {
    //@ts-ignore
    return window.ethereum.request({ method: 'eth_requestAccounts' });
  } catch (error) {
    console.error(error);
  }
}
