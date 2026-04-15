import { useState, useEffect } from 'react';
import { 
  useReadContract, 
  useWriteContract, 
  useWaitForTransactionReceipt 
} from 'wagmi';
import { simpleStorageABI } from '../contracts/StorageABI';
import { formatUnits } from 'viem';

// Default SimpleStorage contract on Sepolia
const DEFAULT_CONTRACT = '0x0000000000000000000000000000000000000000'; 

export function ContractInteraction() {
  const [contractAddress, setContractAddress] = useState<string>(DEFAULT_CONTRACT);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [inputValue, setInputValue] = useState('');

  // Read data
  const { data: storedValue, refetch } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi: simpleStorageABI,
    functionName: 'retrieve',
    query: {
      enabled: contractAddress.startsWith('0x') && contractAddress.length === 42,
    }
  });

  // Write data
  const { 
    writeContract, 
    data: hash,
    error: writeError,
    isPending: isWritePending 
  } = useWriteContract();

  // Wait for transaction
  const { 
    isLoading: isConfirming, 
    isSuccess: isConfirmed,
    error: receiptError
  } = useWaitForTransactionReceipt({
    hash,
  });

  const handleStore = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue) return;
    
    writeContract({
      address: contractAddress as `0x${string}`,
      abi: simpleStorageABI,
      functionName: 'store',
      args: [BigInt(inputValue)],
    });
  };

  useEffect(() => {
    if (isConfirmed) {
      refetch();
      setInputValue('');
    }
  }, [isConfirmed, refetch]);

  return (
    <div className="glass-panel p-6 sm:p-8 mt-8 w-full max-w-2xl mx-auto space-y-8 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-indigo-400">
            Smart Contract
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Interact with a SimpleStorage contract
          </p>
        </div>
        
        {/* Dynamic Contract Address Setting */}
        <div className="w-full sm:w-auto">
          {isEditingAddress ? (
            <div className="flex gap-2">
              <input
                type="text"
                value={contractAddress}
                onChange={(e) => setContractAddress(e.target.value)}
                className="input-field text-sm py-1.5 px-3 min-w-[200px]"
                placeholder="0x..."
              />
              <button 
                onClick={() => setIsEditingAddress(false)}
                className="btn-secondary text-sm py-1.5 px-3"
              >
                Save
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setIsEditingAddress(true)}
              className="text-xs text-primary-400 hover:text-primary-300 transition-colors flex items-center gap-1 bg-slate-800/50 rounded-full px-3 py-1 border border-primary-500/20"
              title={contractAddress}
            >
              <span className="w-2 h-2 rounded-full bg-green-500 mr-1 animate-pulse"></span>
              {contractAddress.substring(0, 6)}...{contractAddress.substring(38)}
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Read Section */}
        <div className="bg-slate-800/40 rounded-xl p-5 border border-slate-700/50 flex flex-col justify-center items-center text-center min-h-[160px] relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <p className="text-slate-400 text-sm mb-2 z-10">Current Value</p>
          <div className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-br from-white to-slate-400 z-10 drop-shadow-md">
            {storedValue !== undefined ? storedValue.toString() : '---'}
          </div>
          <button 
            onClick={() => refetch()} 
            className="mt-4 text-xs text-primary-400 hover:text-primary-300 z-10 underline decoration-primary-500/30 underline-offset-4"
          >
            Refresh Data
          </button>
        </div>

        {/* Write Section */}
        <div className="bg-slate-800/40 rounded-xl p-5 border border-slate-700/50 flex flex-col justify-center min-h-[160px] relative">
          <form onSubmit={handleStore} className="space-y-4">
            <div>
              <label className="block text-slate-400 text-sm mb-2">Update Value</label>
              <input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter a new number..."
                className="input-field"
                required
              />
            </div>
            <button 
              type="submit" 
              disabled={isWritePending || isConfirming}
              className="btn-primary w-full flex justify-center items-center gap-2"
            >
              {isWritePending ? (
                <>
                   <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                   Confirming in Wallet...
                </>
              ) : isConfirming ? (
                <>
                   <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                   Mining Block...
                </>
              ) : (
                'Send Transaction'
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Transaction Status Alerts */}
      <div className="space-y-3">
        {hash && (
          <div className="bg-slate-800/80 border border-slate-700/80 rounded-lg p-3 text-sm flex items-center justify-between">
            <span className="text-slate-300">Transaction Hash:</span>
            <a 
              href={`https://sepolia.etherscan.io/tx/${hash}`} 
              target="_blank" 
              rel="noreferrer"
              className="text-primary-400 hover:text-primary-300 font-mono truncate max-w-[200px] sm:max-w-xs"
            >
              {hash}
            </a>
          </div>
        )}
        
        {isConfirmed && (
          <div className="bg-emerald-900/30 border border-emerald-500/30 text-emerald-400 rounded-lg p-4 text-sm flex items-start gap-3">
            <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <div>
              <p className="font-medium">Transaction Successful!</p>
              <p className="opacity-80 mt-1">The smart contract data has been updated.</p>
            </div>
          </div>
        )}

        {(writeError || receiptError) && (
          <div className="bg-red-900/30 border border-red-500/30 text-red-400 rounded-lg p-4 text-sm flex items-start gap-3">
            <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <div className="overflow-hidden">
              <p className="font-medium">Transaction Failed</p>
              <p className="opacity-80 mt-1 truncate">
                {(writeError as Error)?.message || (receiptError as Error)?.message || 'An unknown error occurred.'}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
