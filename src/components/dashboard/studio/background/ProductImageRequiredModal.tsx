import clsx from "clsx";
import { Close, Download } from "@/assets/icons";
import { TABS } from "@/constants/dashboard/tab";
import ModalOverlay from "@/components/common/ModalOverlay";

const ProductImageRequiredModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <ModalOverlay onClose={onClose}>
      <div className="relative w-[30rem] h-[31.0625rem] rounded-lg bg-Grey-700/90 p-5 flex flex-col items-center justify-center">
        <button
          onClick={onClose}
          className="absolute top-5 right-5"
          aria-label="닫기"
        >
          <Close className="w-6 h-6" />
        </button>

        <p className="Subhead_1_semibold text-White text-center">
          제품 이미지를
          <br />
          먼저 업로드해 주세요
        </p>

        <p className="Body_2_medium text-Grey-300 mt-4">
          배경 이미지를 적용하려면 제품 이미지가 필요해요.
        </p>

        <div className="relative mt-8 w-[20.15rem]">
          <div className="absolute left-0 right-0 bottom-[-1px] h-px bg-Grey-400" />

          <div className="flex">
            {TABS.map((label, idx) => {
              const isActive = idx === 0;

              return (
                <div
                  key={label}
                  className={clsx(
                    "Body_2_medium !text-[1.0176rem] text-center relative pb-[5.51px] flex-1",
                    isActive ? "text-Red-400" : "text-Grey-400"
                  )}
                >
                  {label}
                  <span
                    className={clsx(
                      "absolute left-0 bottom-[-1px] h-px w-full",
                      isActive ? "bg-Red-400" : "bg-transparent"
                    )}
                  />
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex gap-[1.53rem] w-[20.15rem] flex-col items-center justify-center  mt-[1.53rem]">
          <div className="relative w-full h-[11.63rem] rounded-lg">
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <rect
                x="0.2"
                y="0.15"
                width="99.6"
                height="99.7"
                rx="1.5"
                ry="1"
                fill="none"
                stroke="#4B5362"
                strokeWidth="1"
                strokeDasharray="8 4"
                vectorEffect="non-scaling-stroke"
              />
            </svg>

            <div className="w-full h-full rounded-lg flex justify-center pt-[2.37rem] bg-Grey-900">
              <div className="flex flex-col items-center gap-[1.02rem]">
                <Download className="w-[1.3815rem] h-[1.3834rem]" />
                <span className="Body_1_medium !text-[0.9159rem] text-Grey-200 text-center">
                  클릭하여 상품 이미지를
                  <br />
                  업로드해 주세요.
                </span>
              </div>
              <div className="absolute w-full h-[3.875rem] bottom-0 bg-gradient-to-b from-Grey-700/0 to-Grey-700" />
            </div>
          </div>
        </div>
      </div>
    </ModalOverlay>
  );
};

export default ProductImageRequiredModal;
