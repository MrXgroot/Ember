import { useGoogleLogin } from "@react-oauth/google";

export function useGoogleSignIn(options) {
  return useGoogleLogin({
    ...options,
    onError: (error) => {
      console.error(error);
    },
  });
}
