import DashboardCard from "@/components/dashboard/DashboardCard";
import { DASHBOARD_CARDS } from "@/constants/dashboard/card";

const DashboardPage = () => {
  return (
    <main className="min-h-screen w-full flex">
      <aside className="w-[17.625rem]">
        {/* 추후 사이드바 컴포넌트 추가 */}
      </aside>

      <div className="mx-auto mt-[3.25rem]">
        <div className="w-full flex flex-col pr-[2.125rem]">
          <h1 className="Heading_1_bold bg-gradient-to-b from-Red-300 to-Red-500 bg-clip-text text-transparent mb-[1.94rem]">
            대시보드
          </h1>

          <div className="flex items-center gap-9">
            {DASHBOARD_CARDS.map((card) => (
              <DashboardCard
                key={card.imageSrc}
                title={card.title}
                content={card.content}
                imageSrc={card.imageSrc}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashboardPage;
