import GoogleProvider from "./GoogleProvider";
import QueryProvider from "./QueryProvider";
import ThemeProvider from "./ThemeProvider";
import ToastProvider from "./ToastProvider";
import { ModalHost } from "../modal";
import { AuthProvider } from "./AuthProvider";
function AppProviders({ children }) {
  return (
    <GoogleProvider>
      <QueryProvider>
        <ThemeProvider>
          <ToastProvider>
            <AuthProvider>{children}</AuthProvider>
          </ToastProvider>
          <ModalHost />
        </ThemeProvider>
      </QueryProvider>
    </GoogleProvider>
  );
}

export default AppProviders;
