import { useState } from 'react';
import { WalletService } from '../services/wallet';

const WalletConnect = ({ onWalletConnected }) => {
    const [connecting, setConnecting] = useState(false);
    const [error, setError] = useState('');

    const walletService = new WalletService();

    const connectWallet = async () => {
        setConnecting(true);
        setError('');

        try {
            const { address } = await walletService.connectMetaMask();
            const nonce = walletService.generateNonce();
            const message = `Sign this message to authenticate: ${nonce}`;
            const signature = await walletService.signMessage(message);

            onWalletConnected({
                address,
                signature,
                nonce
            });
        } catch (error) {
            setError(error.message);
        } finally {
            setConnecting(false);
        }
    };

    return (
        <div className="wallet-connect">
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            <button
                onClick={connectWallet}
                disabled={connecting}
                className="w-full bg-primary text-white py-3 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
            >
                {connecting ? 'Connecting...' : 'Connect MetaMask Wallet'}
            </button>
        </div>
    );
};

export default WalletConnect;