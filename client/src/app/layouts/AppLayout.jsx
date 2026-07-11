import Navbar from "../components/Navbar";
import AppBody from "../components/AppBody";

function AppLayout() {
  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-slate-50 text-slate-900">
      <Navbar />
      <AppBody />
    </div>
  );
}

export default AppLayout;
