// Pages
import { useEffect } from "react";
import Whitelist from "./pages/Whitelist/Whitelist";

function App() {
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('chainChanged', () => window.location.reload());
    }
  }, [])

  return (
    <Whitelist />
  );
}

export default App;
