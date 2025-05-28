import React, { useState } from "react";

type Transaccion = {
  tipo: string;
  descripcion: string;
  monto: number;
  fecha: string;
};

type Props = {
  transacciones: Transaccion[];
};

const TransaccionesTable: React.FC<Props> = ({ transacciones }) => {
  const [search, setSearch] = useState("");

  const filtered = transacciones.filter((t) =>
    `${t.tipo} ${t.descripcion} ${t.monto} ${t.fecha}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="overflow-x-auto mt-8 px-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
        <h2 className="text-xl font-semibold text-gray-700">Transacciones</h2>

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar por tipo, descripción, monto o fecha"
          className="w-full md:w-80 px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-300 bg-white/80 backdrop-blur placeholder:text-gray-500 text-gray-700"
        />
      </div>

      <table className="min-w-full border border-gray-200 rounded-2xl overflow-hidden shadow-md bg-white/60 backdrop-blur-sm">
        <thead className="bg-gradient-to-r from-green-100 to-purple-100 text-gray-700">
          <tr>
            <th className="text-left px-6 py-3 text-sm font-semibold">Tipo</th>
            <th className="text-left px-6 py-3 text-sm font-semibold">Descripción</th>
            <th className="text-left px-6 py-3 text-sm font-semibold">Monto (Bs)</th>
            <th className="text-left px-6 py-3 text-sm font-semibold">Fecha</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {filtered.map((t, index) => {
            const color = t.monto < 0 ? "text-red-600" : "text-green-600";
            const montoFormateado = t.monto.toLocaleString("es-VE", {
              minimumFractionDigits: 2,
            });

            return (
              <tr key={index} className="hover:bg-white/30 transition duration-200">
                <td className="px-6 py-4 text-sm font-medium text-gray-800">{t.tipo}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{t.descripcion}</td>
                <td className={`px-6 py-4 text-sm ${color}`}>{montoFormateado}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{t.fecha}</td>
              </tr>
            );
          })}
          {filtered.length === 0 && (
            <tr>
              <td colSpan={4} className="text-center text-sm py-6 text-gray-500">
                No se encontraron resultados.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TransaccionesTable;