export const SectionPage = ({
  children,
  sectionLayoutType,
  bgColor,
}: {
  children: React.ReactNode;
  sectionLayoutType: string;
  bgColor?: string;
}) => {
  return (
    <div
      className={`relative w-screen -mx-4
         ${bgColor} `}
    >
      <div
        className={`${
          sectionLayoutType === "Full Width"
            ? "w-[90%] mx-auto lg:w-screen lg:px-4" // Ajusta el contenido en Full Width
            : "w-[90%] lg:max-w-[1140px] mx-auto" // Ajusta el contenido en Boxed
        }`}
      >
        {children}
      </div>
    </div>
  );
};
