import GoogleProvider from "./GoogleProvider";
import QueryProvider from "./QueryProvider";
import ThemeProvider from "./ThemeProvider";
import ToastProvider from "./ToastProvider";
import { ModalHost } from "../modal";
import { AuthProvider } from "./AuthProvider";
import { SocketProvider } from "./SocketProvider";
import { NotificationProvider } from "./NotificationProvider";
function AppProviders({ children }) {
  return (
    <GoogleProvider>
      <QueryProvider>
        <ThemeProvider>
          <SocketProvider>
            <NotificationProvider>
              <ToastProvider>
                <AuthProvider>{children}</AuthProvider>
              </ToastProvider>

              <ModalHost />
            </NotificationProvider>
          </SocketProvider>
        </ThemeProvider>
      </QueryProvider>
    </GoogleProvider>
  );
}

export default AppProviders;
