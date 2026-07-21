import { useEffect } from "react";

import useTheme from "./useTheme";

function ThemeProvider({ children }) {
  const { theme } = useTheme();

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return children;
}

export default ThemeProvider;
