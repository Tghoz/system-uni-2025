import { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

type Plan = {
  id: number;
  descripcion: string;
  monto: number;
  servicio: string;
  valor: string;
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
    monto: "",
    servicio: "",
    valor: "",
    servicioPersonalizado: "",
    fechaFin: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddPlan = () => {
    const now = new Date();
    const servicioFinal = form.servicio === "Otro" ? form.servicioPersonalizado : form.servicio;

    const newPlan: Plan = {
      id: Date.now(),
      descripcion: form.descripcion,
      monto: parseFloat(form.monto),
      servicio: servicioFinal,
      valor: form.valor,
      creado: now.toISOString(),
      fechaFin: new Date(form.fechaFin).toISOString(),
    };

    setPlans([...plans, newPlan]);
    setForm({
      descripcion: "",
      monto: "",
      servicio: "",
      valor: "",
      servicioPersonalizado: "",
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
        {formVisible ? "Cerrar formulario" : "Agregar Plan"}
      </button>

      {formVisible && (
        <div className="mb-10 p-6 bg-white rounded-xl shadow space-y-4 border">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <select
              name="servicio"
              value={form.servicio}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Selecciona un servicio</option>
              <option value="Comida">Comida</option>
              <option value="Salidas">Salidas</option>
              <option value="Viajes">Viajes</option>
              <option value="Entretenimiento">Entretenimiento</option>
              <option value="Educación">Educación</option>
              <option value="Transporte">Transporte</option>
              <option value="Salud">Salud</option>
              <option value="Ahorro">Ahorro</option>
              <option value="Tecnología">Tecnología</option>
              <option value="Mascotas">Mascotas</option>
              <option value="Deudas">Deudas</option>
              <option value="Hogar">Hogar</option>
              <option value="Ropa">Ropa</option>
              <option value="Regalos">Regalos</option>
              <option value="Suscripciones">Suscripciones</option>
              <option value="Impuestos">Impuestos</option>
              <option value="Donaciones">Donaciones</option>
              <option value="Inversiones">Inversiones</option>
              <option value="Eventos">Eventos</option>
              <option value="Auto">Mantenimiento del auto</option>
              <option value="Digital">Entretenimiento digital</option>
              <option value="Cafetería">Cafetería</option>
              <option value="Gimnasio">Gimnasio</option>
              <option value="Otro">Otro</option>
            </select>

            {form.servicio === "Otro" && (
              <input
                type="text"
                name="servicioPersonalizado"
                placeholder="Especificar servicio"
                value={form.servicioPersonalizado}
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
              name="monto"
              placeholder="Monto"
              value={form.monto}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              name="valor"
              placeholder="Valor total disponible"
              value={form.valor}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
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
                <p className="text-sm">Monto asignado: <strong>${plan.monto.toFixed(2)}</strong></p>
                <p className="text-sm">Servicio: {plan.servicio}</p>
                <p className="text-sm">Total disponible: ${plan.valor}</p>
                <p className="text-sm">Finaliza el: {mesFin}</p>
                <p className="text-sm text-red-600 font-semibold mt-1">
                  Faltan {diasRestantes} días
                </p>
              </div>

              <div className="mt-4">
                <PieChart width={360} height={360}>
                  <Pie
                    data={[
                      { name: "Asignado", value: plan.monto },
                      {
                        name: "Disponible restante",
                        value: Math.max(parseFloat(plan.valor) - plan.monto, 0),
                      },
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
