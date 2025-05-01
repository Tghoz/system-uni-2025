import { BillIcon, MoneyIcon, S_icon, B_icon} from "@/icons/CurrencyIcons";
import { items } from "../../config/currencyGet";
import { data } from "../../services/fetchPydolar";
import { useFetch } from "../../hooks/useFetch"


export default function Currency() {

  const getData = useFetch(data)
  if (!getData) return (
    <div className="top-10">
      <div className="flex items-center justify-center space-x-2">
        <div className="w-2 h-2 bg-gray-500/60 rounded-full animate-bounce delay-100"></div>
        <div className="w-2 h-2 bg-gray-400/60 rounded-full animate-bounce delay-200"></div>
        <div className="w-2 h-2 bg-gray-400/50 rounded-full animate-bounce delay-300"></div>
      </div>
    </div>
  )
  const createItem = items(getData)

  const firstDate = createItem[ 0 ]?.date || "Fecha no disponible";
  return (
    <div className="p-4 flex flex-col md:flex-row items-center justify-center gap-8">
      <div className="flex items-center gap-x-2 md:gap-x-4">

        <div className="border-2 border-gray-400/80 rounded-full p-2 md:p-3 text-gray-500/90">
          <BillIcon h={25} w={25} />
        </div>

        {/* Contenedor principal de precio */}
        <div className="flex items-baseline">
          {/* Contenedor de íconos superpuestos */}
          <div className="flex -space-x-3 mr-4 md:mr-2">
            <B_icon h={25} w={25} />      
            <div  className="mt-1">
              <S_icon h={25} w={25} />
          </div>
        </div>

          {/* Texto y precio */}
          <div className="flex flex-col leading-none">
            <div className="flex items-baseline">
              <p className="text-5xl md:text-7xl font-abel text-gray-800">
                1<span className="text-gray-500">,575</span>
                <span className="text-gray-500 text-xl md:text-3xl align-bottom">.00</span>
              </p>
            </div>
            
            {/* Fila de precio inferior */}
            <div className="flex items-center gap-x-1.5 mt-[-4px]">
              <MoneyIcon h={20} w={20}  />
              <span className="text-gray-500 text-lg md:text-xl">60,99.00</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-10 mx-4 top-0 sm:mx-20 mb-7">
        {createItem.map((item, i) => {
          const Icon = item.icon;
          return (
            <div key={i} className="flex items-center justify-start sm:mt-0">
              <div className="border-2 border-gray-400/80 rounded-full p-2 mt-5 flex items-center justify-center text-gray-500/90 ">
                <Icon w={17} h={17} />
              </div>
              <div className="px-2 mb-5 sm:mb-0 font-abel">
                <p className="text-xl border-gray-400/80">{item.title}</p>
                <span className="text-4xl text-[#202020]">{item.content}</span>
              </div>
            </div>
          );
        })}
        
      </div>
    </div>
  );
}