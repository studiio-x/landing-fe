import OpenBtn from "./OpenBtn";

const MainVideo = () => {
  return (
    <div className="relative flex h-[40rem] flex-col items-center justify-center">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/videos/main.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-4 sm:px-6 lg:px-8 2xl:px-[6.12rem]">
        <div className="mb-14 space-y-2 text-center">
          <div className="font-calSans text-[2rem] lg:text-[2.5rem] text-white">
            Chat Your Way to perfect Ads
          </div>
          <div className="Body_2_medium lg:Subhead_1_medium text-Grey-300">
            Upload, generate, and refine ads in real-time with StudioX.
          </div>
        </div>

        <div className="flex h-56 max-w-[54.75rem] w-full rounded-[2rem] bg-gradient-to-b from-Grey-50/40 to-Grey-800/70 p-[1px]">
          <div className="flex h-full w-full flex-col items-end justify-between rounded-[2rem] bg-[rgba(22,24,29,0.9)] pb-7 pl-14 pr-8 pt-10">
            <div className="Body/Body_2_medium sm:Subhead_2_medium self-start text-Grey-400">
              Chat your ad idea - we’ll create it.
            </div>
            <OpenBtn />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainVideo;
