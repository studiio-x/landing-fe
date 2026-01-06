import { Download } from "@/assets/icons";

const ProductTab = () => {
  return (
    <div className="relative w-full h-[35.1875rem] mt-[1.88rem] rounded-lg">
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

      <button className="w-full h-full rounded-lg bg-Grey-900 flex items-center justify-center">
        <div className="flex flex-col items-center gap-5">
          <Download className="w-7 h-7" />
          <span className="Body_1_medium text-Grey-200 text-center">
            클릭하여 상품 이미지를
            <br />
            업로드해 주세요.
          </span>
        </div>
      </button>
    </div>
  );
};

export default ProductTab;
