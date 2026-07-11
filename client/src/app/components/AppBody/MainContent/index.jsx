import { Outlet } from "react-router-dom";

function MainContent() {
  return (
    <main className="flex-1 overflow-y-auto p-6 md:p-8">
      <div className="mx-auto max-w-7xl">
        <Outlet />
      </div>
    </main>
  );
}

export default MainContent;
