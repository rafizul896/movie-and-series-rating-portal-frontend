import MovieSalesTable from "@/components/modules/adminDashboard/Dashboard/MovieSalesTable";
import { SectionCards } from "@/components/modules/adminDashboard/Dashboard/section-cards";
import { getPurchaseAnalytics } from "@/services/dashboardHome";

const DashboardPage = async () => {
  const sectionCardsData = await getPurchaseAnalytics();
  return (
    <div>
      <SectionCards data={sectionCardsData?.data} />
      <div className="mt-5">
        <h1 className="text-xl font-semibold mb-4">Movie Sales Analytics</h1>
        <MovieSalesTable />
      </div>
    </div>
  );
};

export default DashboardPage;
