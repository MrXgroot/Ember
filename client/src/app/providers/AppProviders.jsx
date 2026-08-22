import GoogleProvider from "./GoogleProvider";
import QueryProvider from "./QueryProvider";
import ThemeProvider from "./ThemeProvider";
import ToastProvider from "./ToastProvider";
import { ModalHost } from "../modal";
import { AuthProvider } from "./AuthProvider";
import { SocketProvider } from "./SocketProvider";
function AppProviders({ children }) {
  return (
    <GoogleProvider>
      <QueryProvider>
        <ThemeProvider>
          <SocketProvider>
            <ToastProvider>
              <AuthProvider>{children}</AuthProvider>
            </ToastProvider>
            <ModalHost />
          </SocketProvider>
        </ThemeProvider>
      </QueryProvider>
    </GoogleProvider>
  );
}

export default AppProviders;
