import { useState } from "react"
import { motion } from "framer-motion"

const INCOME_FIELDS = [
  { key: "stipend", label: "Стипендия" },
  { key: "parttime", label: "Подработка" },
  { key: "parents", label: "Помощь родителей" },
]

const EXPENSE_FIELDS = [
  { key: "rent", label: "Аренда жилья" },
  { key: "food", label: "Еда" },
  { key: "transport", label: "Транспорт" },
  { key: "study", label: "Учёба и книги" },
  { key: "fun", label: "Развлечения" },
  { key: "phone", label: "Связь и интернет" },
]

type FieldValues = Record<string, string>

export default function BudgetCalculator() {
  const [income, setIncome] = useState<FieldValues>({})
  const [expenses, setExpenses] = useState<FieldValues>({})

  const total = (fields: typeof INCOME_FIELDS, values: FieldValues) =>
    fields.reduce((sum, f) => sum + (parseFloat(values[f.key]) || 0), 0)

  const totalIncome = total(INCOME_FIELDS, income)
  const totalExpenses = total(EXPENSE_FIELDS, expenses)
  const balance = totalIncome - totalExpenses

  const topExpense = EXPENSE_FIELDS.reduce(
    (max, f) => {
      const val = parseFloat(expenses[f.key]) || 0
      return val > max.val ? { label: f.label, val } : max
    },
    { label: "", val: 0 }
  )

  return (
    <motion.div
      className="w-full max-w-2xl mt-8"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <p className="text-xs uppercase tracking-widest text-neutral-500 mb-3">Доходы, ₽</p>
          <div className="flex flex-col gap-2">
            {INCOME_FIELDS.map((f) => (
              <label key={f.key} className="flex items-center justify-between gap-3">
                <span className="text-neutral-400 text-sm w-36 shrink-0">{f.label}</span>
                <input
                  type="number"
                  min={0}
                  placeholder="0"
                  value={income[f.key] ?? ""}
                  onChange={(e) => setIncome((p) => ({ ...p, [f.key]: e.target.value }))}
                  className="w-full bg-transparent border-b border-neutral-700 focus:border-[#22c55e] text-white text-right outline-none py-1 text-sm transition-colors"
                />
              </label>
            ))}
          </div>
          <div className="mt-3 pt-3 border-t border-neutral-800 flex justify-between text-sm">
            <span className="text-neutral-500">Итого доходов</span>
            <span className="text-[#22c55e] font-semibold">{totalIncome.toLocaleString("ru-RU")} ₽</span>
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-widest text-neutral-500 mb-3">Расходы, ₽</p>
          <div className="flex flex-col gap-2">
            {EXPENSE_FIELDS.map((f) => (
              <label key={f.key} className="flex items-center justify-between gap-3">
                <span className="text-neutral-400 text-sm w-36 shrink-0">{f.label}</span>
                <input
                  type="number"
                  min={0}
                  placeholder="0"
                  value={expenses[f.key] ?? ""}
                  onChange={(e) => setExpenses((p) => ({ ...p, [f.key]: e.target.value }))}
                  className="w-full bg-transparent border-b border-neutral-700 focus:border-red-500 text-white text-right outline-none py-1 text-sm transition-colors"
                />
              </label>
            ))}
          </div>
          <div className="mt-3 pt-3 border-t border-neutral-800 flex justify-between text-sm">
            <span className="text-neutral-500">Итого расходов</span>
            <span className="text-red-400 font-semibold">{totalExpenses.toLocaleString("ru-RU")} ₽</span>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 border border-neutral-800 rounded-lg bg-white/5 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <span className="text-neutral-400 text-sm">Остаток в месяц</span>
          <span className={`text-2xl font-bold ${balance >= 0 ? "text-[#22c55e]" : "text-red-400"}`}>
            {balance >= 0 ? "+" : ""}{balance.toLocaleString("ru-RU")} ₽
          </span>
        </div>
        {topExpense.val > 0 && (
          <p className="text-neutral-500 text-xs mt-2">
            Больше всего тратится на <span className="text-neutral-300">{topExpense.label}</span> — {topExpense.val.toLocaleString("ru-RU")} ₽
            {totalExpenses > 0 && ` (${Math.round((topExpense.val / totalExpenses) * 100)}% расходов)`}
          </p>
        )}
        {balance < 0 && (
          <p className="text-red-400 text-xs mt-1">Расходы превышают доходы — стоит пересмотреть бюджет</p>
        )}
        {balance > 0 && totalIncome > 0 && (
          <p className="text-neutral-500 text-xs mt-1">
            Норма сбережений: <span className="text-[#22c55e]">{Math.round((balance / totalIncome) * 100)}%</span> — {balance >= totalIncome * 0.2 ? "отличный результат!" : "можно улучшить"}
          </p>
        )}
      </div>
    </motion.div>
  )
}
