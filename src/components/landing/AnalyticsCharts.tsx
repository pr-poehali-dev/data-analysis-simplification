import { motion } from "framer-motion"
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend
} from "recharts"

const pieData = [
  { name: "Аренда", value: 15000 },
  { name: "Еда", value: 9000 },
  { name: "Транспорт", value: 3000 },
  { name: "Учёба", value: 2500 },
  { name: "Развлечения", value: 3500 },
  { name: "Связь", value: 1000 },
]

const PIE_COLORS = ["#f9a8d4", "#fdba74", "#fde68a", "#a7f3d0", "#93c5fd", "#c4b5fd"]

const barData = [
  { month: "Янв", экономно: 28000, обычно: 38000 },
  { month: "Фев", экономно: 27000, обычно: 36000 },
  { month: "Мар", экономно: 29000, обычно: 40000 },
  { month: "Апр", экономно: 26000, обычно: 37000 },
  { month: "Май", экономно: 28500, обычно: 39000 },
  { month: "Июн", экономно: 27500, обычно: 41000 },
]

interface TooltipPayloadItem { color: string; name: string; value: number }
interface TooltipProps { active?: boolean; payload?: TooltipPayloadItem[]; label?: string }

const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-xs">
        {label && <p className="text-neutral-400 mb-1">{label}</p>}
        {payload.map((p, i) => (
          <p key={i} style={{ color: p.color }}>{p.name}: {p.value.toLocaleString("ru-RU")} ₽</p>
        ))}
      </div>
    )
  }
  return null
}

export default function AnalyticsCharts() {
  return (
    <motion.div
      className="w-full max-w-3xl mt-8 grid grid-cols-1 md:grid-cols-2 gap-8"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div>
        <p className="text-xs uppercase tracking-widest text-neutral-500 mb-4">Структура расходов</p>
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={90}
              paddingAngle={3}
              dataKey="value"
            >
              {pieData.map((_, i) => (
                <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
          {pieData.map((item, i) => (
            <span key={i} className="flex items-center gap-1 text-xs text-neutral-400">
              <span className="w-2 h-2 rounded-full inline-block" style={{ background: PIE_COLORS[i] }} />
              {item.name}
            </span>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs uppercase tracking-widest text-neutral-500 mb-4">Экономный vs обычный месяц</p>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={barData} barSize={10}>
            <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
            <XAxis dataKey="month" tick={{ fill: "#737373", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#737373", fontSize: 10 }} axisLine={false} tickLine={false} width={48}
              tickFormatter={(v) => `${(v / 1000).toFixed(0)}к`} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="экономно" fill="#a7f3d0" radius={[4, 4, 0, 0]} />
            <Bar dataKey="обычно" fill="#fca5a1" radius={[4, 4, 0, 0]} />
            <Legend wrapperStyle={{ fontSize: 11, color: "#737373" }} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  )
}