// app/pages/home/sidebar/HomeSidebar.jsx

import { WelcomeCard, TipCard, ContributionCard } from "./ui";

export function HomeSidebar() {
  return (
    <aside className="space-y-4">
      <WelcomeCard />
      <ContributionCard />
    </aside>
  );
}
