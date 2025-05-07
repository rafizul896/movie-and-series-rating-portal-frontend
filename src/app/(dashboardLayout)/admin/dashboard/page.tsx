import { SectionCards } from "@/components/modules/adminDashboard/Dashboard/section-cards";
import { getPurchaseAnalytics } from "@/services/dashboardHome";

const DashboardPage = async () => {
  const sectionCardsData = await getPurchaseAnalytics();

  return (
    <div>
      <SectionCards data={sectionCardsData?.data} />
    </div>
  );
};

export default DashboardPage;
