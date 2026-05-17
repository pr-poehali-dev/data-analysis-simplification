import { useState } from "react"
import { motion } from "framer-motion"

type CalcId = "savings" | "credit" | "inflation" | "discount"

interface Tab { id: CalcId; label: string; emoji: string }

const TABS: Tab[] = [
  { id: "savings",   label: "Накопления",  emoji: "💰" },
  { id: "credit",    label: "Кредит",      emoji: "💳" },
  { id: "inflation", label: "Инфляция",    emoji: "📈" },
  { id: "discount",  label: "Скидка",      emoji: "🏷️" },
]

function Field({ label, value, onChange, suffix = "₽" }: {
  label: string; value: string; onChange: (v: string) => void; suffix?: string
}) {
  return (
    <label className="flex items-center justify-between gap-4">
      <span className="text-neutral-400 text-sm shrink-0">{label}</span>
      <div className="flex items-center gap-1 border-b border-neutral-700 focus-within:border-[#22c55e] transition-colors">
        <input
          type="number" min={0} placeholder="0" value={value}
          onChange={e => onChange(e.target.value)}
          className="w-28 bg-transparent text-white text-right outline-none py-1 text-sm"
        />
        <span className="text-neutral-500 text-sm">{suffix}</span>
      </div>
    </label>
  )
}

function Result({ label, value, positive = true }: { label: string; value: string; positive?: boolean }) {
  return (
    <div className="mt-5 pt-4 border-t border-neutral-800 flex justify-between items-center">
      <span className="text-neutral-500 text-sm">{label}</span>
      <span className={`text-xl font-bold ${positive ? "text-[#22c55e]" : "text-red-400"}`}>{value}</span>
    </div>
  )
}

function SavingsCalc() {
  const [monthly, setMonthly] = useState("")
  const [months, setMonths] = useState("")
  const [rate, setRate] = useState("")

  const m = parseFloat(monthly) || 0
  const n = parseFloat(months) || 0
  const r = (parseFloat(rate) || 0) / 100 / 12

  const total = r > 0
    ? m * ((Math.pow(1 + r, n) - 1) / r)
    : m * n

  return (
    <div className="flex flex-col gap-3">
      <Field label="Ежемесячный взнос" value={monthly} onChange={setMonthly} />
      <Field label="Срок (месяцев)" value={months} onChange={setMonths} suffix="мес" />
      <Field label="Ставка в год" value={rate} onChange={setRate} suffix="%" />
      <Result label="Накоплю за период" value={`${total.toLocaleString("ru-RU", { maximumFractionDigits: 0 })} ₽`} />
    </div>
  )
}

function CreditCalc() {
  const [amount, setAmount] = useState("")
  const [rate, setRate] = useState("")
  const [months, setMonths] = useState("")

  const P = parseFloat(amount) || 0
  const r = (parseFloat(rate) || 0) / 100 / 12
  const n = parseFloat(months) || 0

  const payment = r > 0 && n > 0
    ? P * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
    : P / (n || 1)

  const overpay = payment * n - P

  return (
    <div className="flex flex-col gap-3">
      <Field label="Сумма кредита" value={amount} onChange={setAmount} />
      <Field label="Ставка в год" value={rate} onChange={setRate} suffix="%" />
      <Field label="Срок (месяцев)" value={months} onChange={setMonths} suffix="мес" />
      <div className="mt-5 pt-4 border-t border-neutral-800 flex flex-col gap-1">
        <div className="flex justify-between text-sm">
          <span className="text-neutral-500">Платёж в месяц</span>
          <span className="text-white font-semibold">{payment.toLocaleString("ru-RU", { maximumFractionDigits: 0 })} ₽</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-neutral-500">Переплата</span>
          <span className="text-red-400 font-semibold">{overpay.toLocaleString("ru-RU", { maximumFractionDigits: 0 })} ₽</span>
        </div>
      </div>
    </div>
  )
}

function InflationCalc() {
  const [amount, setAmount] = useState("")
  const [rate, setRate] = useState("")
  const [years, setYears] = useState("")

  const A = parseFloat(amount) || 0
  const r = (parseFloat(rate) || 0) / 100
  const n = parseFloat(years) || 0

  const future = A * Math.pow(1 + r, n)
  const loss = A - A / Math.pow(1 + r, n)

  return (
    <div className="flex flex-col gap-3">
      <Field label="Сумма сегодня" value={amount} onChange={setAmount} />
      <Field label="Инфляция в год" value={rate} onChange={setRate} suffix="%" />
      <Field label="Через (лет)" value={years} onChange={setYears} suffix="лет" />
      <div className="mt-5 pt-4 border-t border-neutral-800 flex flex-col gap-1">
        <div className="flex justify-between text-sm">
          <span className="text-neutral-500">Нужно будет иметь</span>
          <span className="text-white font-semibold">{future.toLocaleString("ru-RU", { maximumFractionDigits: 0 })} ₽</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-neutral-500">Потеря покупательной силы</span>
          <span className="text-red-400 font-semibold">{loss.toLocaleString("ru-RU", { maximumFractionDigits: 0 })} ₽</span>
        </div>
      </div>
    </div>
  )
}

function DiscountCalc() {
  const [price, setPrice] = useState("")
  const [discount, setDiscount] = useState("")

  const P = parseFloat(price) || 0
  const d = parseFloat(discount) || 0

  const saved = P * d / 100
  const final = P - saved

  return (
    <div className="flex flex-col gap-3">
      <Field label="Цена до скидки" value={price} onChange={setPrice} />
      <Field label="Скидка" value={discount} onChange={setDiscount} suffix="%" />
      <div className="mt-5 pt-4 border-t border-neutral-800 flex flex-col gap-1">
        <div className="flex justify-between text-sm">
          <span className="text-neutral-500">Цена со скидкой</span>
          <span className="text-[#22c55e] font-semibold">{final.toLocaleString("ru-RU", { maximumFractionDigits: 0 })} ₽</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-neutral-500">Экономия</span>
          <span className="text-white font-semibold">{saved.toLocaleString("ru-RU", { maximumFractionDigits: 0 })} ₽</span>
        </div>
      </div>
    </div>
  )
}

const CALC_MAP: Record<CalcId, React.ReactNode> = {
  savings: <SavingsCalc />,
  credit: <CreditCalc />,
  inflation: <InflationCalc />,
  discount: <DiscountCalc />,
}

export default function Calculators() {
  const [active, setActive] = useState<CalcId>("savings")

  return (
    <motion.div
      className="w-full max-w-lg mt-8"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="flex gap-2 flex-wrap mb-6">
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setActive(t.id)}
            className={`px-3 py-1.5 rounded-full text-sm transition-all border ${
              active === t.id
                ? "border-[#22c55e] text-[#22c55e] bg-[#22c55e]/10"
                : "border-neutral-700 text-neutral-500 hover:border-neutral-500"
            }`}
          >
            {t.emoji} {t.label}
          </button>
        ))}
      </div>
      <div className="p-5 border border-neutral-800 rounded-xl bg-white/5 backdrop-blur-sm">
        {CALC_MAP[active]}
      </div>
    </motion.div>
  )
}
