import { useState, useEffect } from "react";
import { NavData } from "../../../utils/staticData";

import HeaderTitle from "../sidebar/HeaderTitle";


const useActiveLink = (url) => {
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    // Solo se ejecuta en el cliente después del montaje
    setIsActive(window.location.pathname === url);
  }, [url]);
  return isActive;
};

export const Sidebar = () => {


  return (
    <>
      <aside
        className={`max-md:backdrop-blur-sm flex  ml-5 flex-col fixed md:relative h-screen md:h-full w-[260px] md:w-[200px] transition-all duration-200`}>


        {/* Encabezado */}
        <div className="flex justify-center items-center p-4 mb-1">
          <HeaderTitle />
        </div>

        <div className="flex-1 overflow-y-auto px-2 mb-4">
          {NavData.map((e) => {
            const isActive = useActiveLink(e.url);

            return (
              <div
                className={`w-full p-4 my-2 rounded-lg group transition-all  ${isActive
                    ? "bg-[var(--bg-secundary)]"
                    : "hover:bg-[var(--bg-secundary)]"
                  } ${isActive ? "!duration-300" : ""}`}>
                <a href={e.url} className="hover:no-underline block relative">
                  <div
                    className={`w-full flex items-center gap-1 transition-transform duration-500 ${isActive
                        ? "translate-x-4 duration-[0ms]"
                        : "group-hover:translate-x-4"
                      }`}>
                    <div className="w-8 flex-shrink-0">
                      <div className="text-[var(--text)]">
                        {e.icon}
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <p
                        className={`font-mono text-[16px] md:text-[18px] truncate ${isActive
                            ? "text-white"
                            : "text-[var(--text-main)] group-hover:text-white"
                          }`}>
                        {e.title}
                      </p>
                      <span
                        className={`absolute bottom-0 left-0 h-[2px] bg-white transition-all duration-300 ${isActive ? "w-[70%]" : "w-0 group-hover:w-[70%]"
                          }`}
                      />
                    </div>
                  </div>
                </a>
              </div>
            );
          })}
        </div>
      </aside>
    </>
  );
};
