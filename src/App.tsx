import './App.css';
import WalletPage from './pages/Wallets';
import FancyForm from './pages/FancyForms';
import './output.css';
import './index.css';
import SumByNums from './pages/SumByNums';

function App() {
    return (
        <>
            <div>
                <h1 className="text-3xl font-bold underline">Code Challenge</h1>
                <FancyForm />
                <WalletPage />
                <SumByNums />
            </div>
        </>
    );
}

export default App;
