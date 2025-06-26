import { TitleData } from "../../../utils/staticData";

export default function HeaderTitle() {
  return (
    <div className="h-full flex w-full justify-center items-center ">
      {TitleData.map((e) => (
        <div key={e.title} className="flex flex-col items-center  w-full">
          {/* Contenedor de la imagen */}
          <div className="w-12 h-12 sm:w-20 sm:h-20 flex items-center justify-center overflow-hidden rounded ">
            <img src={e.img} className="w-full h-full object-contain p-1" />
          </div>
          <div className="text-[17px] text-center font-mono text-[var(--text)]">
            {e.title}
          </div>
        </div>
      ))}
    </div>
  );
}