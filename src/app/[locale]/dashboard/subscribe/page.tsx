import Header from "@/components/dashboard/Header";
import PriceHeroSection from "@/components/landing/price/PriceHeroSection";

const SubscribePage = () => {
  return (
    <main className="relative min-h-dvh w-full flex flex-col">
      <div className="fixed inset-0 bg-[url('/images/dashboard/background.png')] bg-cover bg-center -z-10 pointer-events-none" />
      <Header />
      <PriceHeroSection />
    </main>
  );
};

export default SubscribePage;
