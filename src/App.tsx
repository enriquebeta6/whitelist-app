// Pages
import { useEffect } from "react";
import Donations from "./pages/Donations/Donations";

function App() {
  useEffect(() => {
    //@ts-ignore
    window.ethereum.on('chainChanged', () => window.location.reload());
  }, [])

  return (
    <Donations />
  );
}

export default App;
