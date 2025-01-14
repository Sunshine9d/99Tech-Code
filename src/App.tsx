import './App.css'
import WalletPage from "./pages/Wallets";
import FancyForms from "./pages/FancyForms";
import './output.css';
import './index.css';

function App() {

  return (
    <>
        <div>
            <h1 className="text-3xl font-bold underline">
                Hello world!
            </h1>
            <FancyForms/>
            <WalletPage/>
        </div>
    </>
  )
}

export default App
