import Sidebar from "./Sidebar";
import MainContent from "./MainContent";

function AppBody() {
  return (
    <div className="flex flex-1 overflow-hidden">
      <Sidebar />
      <MainContent />
    </div>
  );
}

export default AppBody;
