import { NativeWindStyleSheet } from "nativewind";

import { AuthProvider } from "./context/AuthContext";
import Navigator from "./components/Navigator";

NativeWindStyleSheet.setOutput({
  default: "native",
});

export default function App() {
  return (
    <AuthProvider>
      <Navigator />
    </AuthProvider>
  );
}
