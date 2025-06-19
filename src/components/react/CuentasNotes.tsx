import { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

type Plan = {
  id: number;
  descripcion: string;
  saldoInicial: number;
  tipoCuenta: string;
  moneda: string;
  creado: string;
  fechaFin: string;
};

const COLORS = ["#8884d8", "#82ca9d"];
const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  outerRadius,
  name,
  value,
}) => {
  const radius = outerRadius + 30;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#333"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      className="text-sm"
    >
      {`${name}: $${value.toFixed(2)}`}
    </text>
  );
};

export default function PlanNotes() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [formVisible, setFormVisible] = useState(false);
  const [form, setForm] = useState({
    descripcion: "",
    saldoInicial: "",
    tipoCuenta: "",
    moneda: "",
    tipoCuentaPersonalizado: "",
    fechaFin: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddPlan = () => {
    const now = new Date();
    const tipoCuentaFinal = form.tipoCuenta === "Otro" ? form.tipoCuentaPersonalizado : form.tipoCuenta;

    const newPlan: Plan = {
      id: Date.now(),
      descripcion: form.descripcion,
      saldoInicial: parseFloat(form.saldoInicial),
      tipoCuenta: tipoCuentaFinal,
      moneda: form.moneda,
      creado: now.toISOString(),
      fechaFin: new Date(form.fechaFin).toISOString(),
    };

    setPlans([...plans, newPlan]);
    setForm({
      descripcion: "",
      saldoInicial: "",
      tipoCuenta: "",
      moneda: "",
      tipoCuentaPersonalizado: "",
      fechaFin: "",
    });
    setFormVisible(false);
  };

  const calcularDiasRestantes = (fechaFinStr: string) => {
    const hoy = new Date();
    const fechaFin = new Date(fechaFinStr);
    const diferencia = fechaFin.getTime() - hoy.getTime();
    return Math.ceil(diferencia / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="p-6 max-w-6xl mx-auto font-sans">
      <button
        onClick={() => setFormVisible(!formVisible)}
        className="mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {formVisible ? "Cerrar formulario" : "Agregar Cuenta"}
      </button>

      {formVisible && (
        <div className="mb-10 p-6 bg-white rounded-xl shadow space-y-4 border">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <select
              name="tipoCuenta"
              value={form.tipoCuenta}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Selecciona tipo de cuenta</option>
              <option value="Ingreso">Ingreso</option>
              <option value="Egreso">Egreso</option>
              <option value="Otro">Otro</option>
            </select>

            {form.tipoCuenta === "Otro" && (
              <input
                type="text"
                name="tipoCuentaPersonalizado"
                placeholder="Especificar tipo"
                value={form.tipoCuentaPersonalizado}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            )}

            <input
              type="text"
              name="descripcion"
              placeholder="Descripción"
              value={form.descripcion}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            <input
              type="number"
              name="saldoInicial"
              placeholder="Saldo inicial"
              value={form.saldoInicial}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            <select
  name="moneda"
  value={form.moneda}
  onChange={handleChange}
  className="w-full p-2 border rounded"
>
  <option value="">Selecciona una moneda</option>
  <option value="USD">USD - Dólar estadounidense</option>
  <option value="EUR">EUR - Euro</option>
  <option value="GBP">GBP - Libra esterlina</option>
  <option value="JPY">JPY - Yen japonés</option>
  <option value="MXN">MXN - Peso mexicano</option>
  <option value="ARS">ARS - Peso argentino</option>
  <option value="BRL">BRL - Real brasileño</option>
  <option value="COP">COP - Peso colombiano</option>
  <option value="BS">BS - Bolívar</option>
</select>
            <input
              type="date"
              name="fechaFin"
              value={form.fechaFin}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <button
            onClick={handleAddPlan}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Guardar
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan) => {
          const diasRestantes = calcularDiasRestantes(plan.fechaFin);
          const mesFin = new Date(plan.fechaFin).toLocaleDateString("es-ES", {
            day: "numeric",
            month: "long",
            year: "numeric",
          });

          return (
            <div
              key={plan.id}
              className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm flex flex-col justify-between"
            >
              <div>
                <h3 className="font-semibold text-lg mb-2">{plan.descripcion}</h3>
                <p className="text-sm">Saldo inicial: <strong>${plan.saldoInicial.toFixed(2)}</strong></p>
                <p className="text-sm">Tipo de cuenta: {plan.tipoCuenta}</p>
                <p className="text-sm">Moneda: {plan.moneda}</p>
                <p className="text-sm">Finaliza el: {mesFin}</p>
                <p className="text-sm text-red-600 font-semibold mt-1">
                  Faltan {diasRestantes} días
                </p>
              </div>

              <div className="mt-4">
                <PieChart width={360} height={360}>
                  <Pie
                    data={[
                      { name: "Saldo Inicial", value: plan.saldoInicial },
                      { name: "Sin cambios", value: 0 }, // placeholder para visual
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    labelLine={true}
                    label={renderCustomizedLabel}
                  >
                    {COLORS.map((color, index) => (
                      <Cell key={`cell-${index}`} fill={color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
