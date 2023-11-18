import { NativeWindStyleSheet } from 'nativewind';
import { Provider } from 'react-redux';

import { AuthProvider } from './context/AuthContext';
import Navigator from './app/Navigator';
import { store } from '@/app/store';

NativeWindStyleSheet.setOutput({
  default: 'native',
});

export default function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Navigator />
      </AuthProvider>
    </Provider>
  );
}
