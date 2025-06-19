import StaticGlobalMetrics from "@/components/StaticGlobalMetrics";
import DashboardTiles from "@/components/DashboardTiles";
import TopCoinsTable from "@/components/TopCoinsTable";
import LocalAnalytics from "@/components/LocalAnalytics";
import CryptoBubbles from "@/components/CryptoBubbles";
import WatchlistDrawer from "@/components/WatchlistDrawer";
import ShareSnapshotButton from "@/components/ShareSnapshotButton";


export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <DashboardTiles />
      <StaticGlobalMetrics />
      <TopCoinsTable />
      <LocalAnalytics />
      <CryptoBubbles />
      <WatchlistDrawer />
      <ShareSnapshotButton />
    </main>
  );
}
