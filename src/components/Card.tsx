interface CardProps {
  title: string;
  description: string;
  imageSrc: string;
}

const Card: React.FC<CardProps> = ({ title, description, imageSrc }) => {
  return (
    <div className="relative flex flex-col justify-between w-full mb-[5.5rem]">
      <div className="text-center font-calSans text-[1.4rem] lg:text-[1.75rem] mb-7">
        {title}
      </div>
      <img
        src={imageSrc}
        alt={title}
        className="w-full aspect-[608/460] rounded-2xl object-cover"
      />
      <div
        style={{
          background:
            "linear-gradient(180deg, rgba(255, 134, 134, 0.25) 0%, #FF5252 100%)",
          backdropFilter: "blur(8px)",
        }}
        className="lg:Subhead_2_medium  sm:Body_2_medium Body_3_medium absolute bottom-0 rounded-b-2xl px-7 py-8 text-center w-full "
      >
        {description}
      </div>
    </div>
  );
};

export default Card;
