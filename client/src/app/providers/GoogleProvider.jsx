import { GoogleOAuthProvider } from "@react-oauth/google";

export default function GoogleProvider({ children }) {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      {children}
    </GoogleOAuthProvider>
  );
}
