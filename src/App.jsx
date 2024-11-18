import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreateAccount from "./components/CreateAccount";
import GetStarted from "./components/GetStarted";
import CreateAccountPassword from "./components/CreateEmail";
import CreateWallet from "./components/CreateWallet";
import GeneratePrivateKey from "./components/GeneratePrivateKey";
import PrivateKeyPage from "./pages/PrivateKeyPage";
import PublicAddressPage from "./pages/PublicAddressPage";
import BackupKeyPage from "./pages/RecoveryPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GetStarted />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/create-email" element={<CreateAccountPassword />} />
        <Route path="/connect-wallet" element={<CreateWallet />} />
        <Route path="/private-key" element={<GeneratePrivateKey />} />
        <Route path="/copy-key" element={<PrivateKeyPage />} />
        <Route path="/public-address" element={<PublicAddressPage />} />
        <Route path="/recovery-phrase" element={<BackupKeyPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
