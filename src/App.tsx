import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { ContractInteraction } from './components/ContractInteraction';

function App() {
  const { isConnected } = useAccount();

  return (
    <div className="min-h-screen bg-dark relative flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Background decorations */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />

      <main className="w-full max-w-4xl relative z-10 flex flex-col items-center">
        {/* Header */}
        <header className="w-full flex flex-col sm:flex-row justify-between items-center gap-6 mb-12 glass-panel p-4 px-6 rounded-3xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-primary-500/30">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h1 className="text-xl font-bold tracking-tight text-white">Nova DApp</h1>
          </div>
          
          <ConnectButton 
            chainStatus="icon" 
            showBalance={false} 
            accountStatus={{
              smallScreen: 'avatar',
              largeScreen: 'full',
            }}
          />
        </header>

        {/* Hero Section */}
        <div className="text-center max-w-2xl mx-auto space-y-6 mt-8">
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Discover the Future of <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-indigo-400">
              Decentralized Apps
            </span>
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed">
            Connect your wallet to interact with smart contracts on the Sepolia testnet. Read and write data securely onto the blockchain.
          </p>
        </div>

        {/* Dynamic Content based on connection state */}
        <div className="w-full transition-all duration-500 mt-8 flex flex-col items-center">
          {!isConnected ? (
            <div className="glass-panel p-8 sm:p-12 text-center max-w-lg mt-8 border-dashed border-2 border-slate-700/50">
              <svg className="w-16 h-16 mx-auto text-slate-500 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <h3 className="text-xl font-semibold mb-2">Wallet Disconnected</h3>
              <p className="text-slate-400 mb-8">
                Please connect your Web3 wallet using the button above to access the smart contract features.
              </p>
              <div className="flex justify-center">
                <ConnectButton />
              </div>
            </div>
          ) : (
            <ContractInteraction />
          )}
        </div>
      </main>

      <footer className="mt-auto pt-16 pb-8 text-center text-slate-500 text-sm w-full relative z-10">
        <p>Built with Vite, React, Tailwind & Wagmi.</p>
      </footer>
    </div>
  );
}

export default App;
