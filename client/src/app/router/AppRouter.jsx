import { BrowserRouter, Routes, Route } from "react-router-dom";

import PublicRoutes from "./PublicRoutes";
import ProtectedRoutes from "./ProtectedRoutes";
import RootLayout from "../layouts/RootLayout";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/*" element={<PublicRoutes />} />
          <Route path="/app/*" element={<ProtectedRoutes />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
