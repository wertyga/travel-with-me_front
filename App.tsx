import { NativeWindStyleSheet } from 'nativewind';
import { Provider } from 'react-redux';
import { Toast } from '@/components/Toast';
import { store } from '@/app/store';
import { AuthProvider } from './context/AuthContext';
import Navigator from './app/Navigator';

NativeWindStyleSheet.setOutput({
  default: 'native',
});

export default function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Navigator />
      </AuthProvider>
      <Toast />
    </Provider>
  );
}
