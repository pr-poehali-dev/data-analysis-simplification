import { motion } from "framer-motion"

const tips = [
  {
    emoji: "✂️",
    title: "Сократи необязательные расходы",
    text: "Подписки, доставка еды, спонтанные покупки — раз в месяц проверяй, чем реально пользуешься. Отмена 2-3 подписок легко освобождает 500–1500 ₽.",
  },
  {
    emoji: "📒",
    title: "Веди учёт трат",
    text: "Записывай расходы хотя бы первые 2 месяца. Большинство людей недооценивают траты на еду и развлечения в 1,5–2 раза.",
  },
  {
    emoji: "🛡️",
    title: "Финансовая подушка",
    text: "Цель — 3 месяца обязательных расходов в резерве. Начни с малого: откладывай 5–10% дохода каждый месяц автоматически.",
  },
  {
    emoji: "💳",
    title: "Рассрочка или кредит?",
    text: "Беспроцентная рассрочка выгодна, если платежи комфортны. Кредит под 20%+ год — переплата огромная. Считай через калькулятор выше.",
  },
  {
    emoji: "🛒",
    title: "Правило 24 часов",
    text: "Перед покупкой дороже 1000 ₽ подожди сутки. 80% импульсивных желаний проходят сами — деньги остаются у тебя.",
  },
  {
    emoji: "📊",
    title: "Правило 50/30/20",
    text: "50% дохода — на обязательные расходы, 30% — на желания, 20% — на сбережения. Простая формула для здорового бюджета.",
  },
]

export default function Tips() {
  return (
    <motion.div
      className="w-full max-w-2xl mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      {tips.map((tip, i) => (
        <motion.div
          key={i}
          className="p-4 border border-neutral-800 rounded-xl bg-white/5 backdrop-blur-sm hover:border-neutral-600 transition-colors"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 + i * 0.07 }}
        >
          <span className="text-2xl">{tip.emoji}</span>
          <p className="text-white font-semibold text-sm mt-2 mb-1">{tip.title}</p>
          <p className="text-neutral-500 text-xs leading-relaxed">{tip.text}</p>
        </motion.div>
      ))}
    </motion.div>
  )
}
