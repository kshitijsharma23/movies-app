import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';

export default defineConfig({
  base: '/movies-app',
  plugins: [react()],
  resolve: {
    alias: {
      '@assets': resolve(__dirname, './src/assets/'),
      '@async-actions': resolve(__dirname, './src/async-actions/'),
      '@components': resolve(__dirname, './src/components/'),
      '@constants': resolve(__dirname, './src/constants/'),
      '@context': resolve(__dirname, './src/context/'),
      '@hooks': resolve(__dirname, './src/hooks/'),
      '@mocks': resolve(__dirname, './src/mocks/'),
      '@reducers': resolve(__dirname, './src/reducers/'),
      '@screens': resolve(__dirname, './src/screens/'),
      '@src': resolve(__dirname, './src/'),
      '@utils': resolve(__dirname, './src/utils/'),
    },
  },
});
