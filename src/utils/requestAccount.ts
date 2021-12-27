export function requestAccount() {
  try {
    return window.ethereum.request({ method: 'eth_requestAccounts' });
  } catch (error) {
    console.error(error);
  }
}
