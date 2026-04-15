import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
  sepolia,
  localhost,
  mainnet
} from 'wagmi/chains';

const projectId = '76eec4cfb57af4ae3eb28eb8a3790515'; // Public default Web3Modal/RainbowKit project ID, for demo purposes

export const config = getDefaultConfig({
  appName: 'Nova DApp',
  projectId,
  chains: [sepolia, localhost, mainnet],
  ssr: false, // Turn off SSR for simple Vite app
});
