import { BillIcon, MoneyIcon, S_icon, B_icon } from "@/icons/CurrencyIcons";
import { items } from "../../config/currencyGet";
import { data } from "../../services/fetchPydolar";
import { useFetch } from "../../hooks/useFetch";

export default function Currency() {
  const getData = useFetch(data);

  if (!getData)
    return (
      <div className="top-10">
        <div className="flex items-center justify-center space-x-2">
          <div className="w-2 h-2 bg-gray-500/60 rounded-full animate-bounce delay-100"></div>
          <div className="w-2 h-2 bg-gray-400/60 rounded-full animate-bounce delay-200"></div>
          <div className="w-2 h-2 bg-gray-400/50 rounded-full animate-bounce delay-300"></div>
        </div>
      </div>
    );

  const createItem = items(getData);
  const firstDate = createItem[0]?.date || "Fecha no disponible";

  return (
    <div className="px-4 py-6 flex flex-col gap-10">
      {/* Precio principal */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-6">
        {/* Ícono */}
        <div className="flex items-center gap-x-3">
          <div className="border-2 border-gray-400/80 rounded-full p-3 text-gray-500/90">
            <BillIcon h={25} w={25} />
          </div>

          {/* Superposición de íconos */}
          <div className="flex -space-x-3">
            <B_icon h={25} w={25} />
            <div className="mt-1">
              <S_icon h={25} w={25} />
            </div>
          </div>
        </div>

        {/* Precio y tasa */}
        <div className="flex flex-col text-center md:text-left">
          <p className="text-4xl sm:text-5xl md:text-6xl font-abel text-gray-800">
            1<span className="text-gray-500">,575</span>
            <span className="text-gray-500 text-xl sm:text-2xl md:text-3xl align-bottom">.00</span>
          </p>

          <div className="flex items-center justify-center md:justify-start gap-x-1 mt-1">
            <MoneyIcon h={20} w={20} />
            <span className="text-gray-500 text-base sm:text-lg md:text-xl">60,99.00</span>
          </div>
        </div>
      </div>

      {/* Lista de tasas secundarias */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10 px-4 sm:px-8 md:px-20">
        {createItem.map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={i}
              className="flex items-center gap-4 bg-white/40 backdrop-blur-sm shadow-md rounded-xl p-4 border border-gray-300"
            >
              <div className="border-2 border-gray-400/80 rounded-full p-2 flex items-center justify-center text-gray-500/90">
                <Icon w={20} h={20} />
              </div>
              <div className="font-abel">
                <p className="text-sm sm:text-base text-gray-600">{item.title}</p>
                <span className="text-xl sm:text-2xl text-[#202020] font-semibold">{item.content}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Fecha de actualización (opcional) */}
      <p className="text-center text-xs text-gray-500 mt-4">{firstDate}</p>
    </div>
  );
}