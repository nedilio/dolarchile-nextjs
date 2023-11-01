import Input from "./components/Input";

interface Indicator {
  valor: number;
  codigo: "uf" | "dolar";
  fecha: string;
  nombre: string;
}
async function getIndicators(): Promise<Indicator[]> {
  const res = await fetch("https://mindicador.cl/api", {
    next: { revalidate: 3600 },
  });
  const { dolar, uf } = await res.json();
  return [dolar, uf];
}

const getFirstDay = async () => {
  const today = new Date();
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
  const formattedDate = firstDay.toLocaleString("es-CL", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
  const res = await fetch(`https://mindicador.cl/api/dolar/${formattedDate}`);
  const { serie } = await res.json();
  const [dolar] = serie;
  return dolar;
};

const toCurrency = (value: number) => {
  return value.toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
  });
};
export default async function Home() {
  const indicadores = await getIndicators();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 gap-8">
      <h1 className="text-5xl font-bold text-purple-400 max-w-md mx-auto text-center">
        Indicadores Económicos
      </h1>
      {indicadores.map((indicador) => (
        <article
          key={indicador.codigo}
          className="
          bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-purple-800 via-violet-900 to-purple-800
          px-4 py-6 rounded-2xl w-60"
        >
          <h2 className="text-slate-300 font-mono">{indicador.nombre}</h2>
          <p className="font-semibold text-2xl text-slate-200">
            {toCurrency(indicador.valor)}
          </p>
          <p className="text-slate-400 text-xs">
            {new Date(indicador.fecha).toLocaleDateString("es-CL", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
              second: "numeric",
            })}
          </p>
        </article>
      ))}
      <Input dolarValue={indicadores[0].valor} />
      {/* <p>aumento desd inicio de mes: {variation}%</p> */}
    </main>
  );
}
