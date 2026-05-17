import { Badge } from "@/components/ui/badge"
import BudgetCalculator from "./BudgetCalculator"

export const sections = [
  {
    id: 'hero',
    subtitle: <Badge variant="outline" className="text-white border-white/40">Учебный проект · Экономический факультет · РУТ МИИТ</Badge>,
    title: (
      <span>
        {'Экономика студента!'.split('').map((char, i) => {
          const colors = [
            '#f9a8d4','#fca5a1','#fdba74','#fde68a',
            '#a7f3d0','#99f6e4','#93c5fd','#c4b5fd',
            '#f9a8d4','#fca5a1','#fdba74','fde68a',
            '#a7f3d0','#99f6e4','#93c5fd','#c4b5fd',
            '#f9a8d4','#fca5a1','#fdba74'
          ]
          return char === ' '
            ? <span key={i}>&nbsp;</span>
            : <span key={i} style={{ color: colors[i % colors.length] }}>{char}</span>
        })}
      </span>
    ),
    showButton: true,
    buttonText: 'Начать анализ бюджета'
  },
  {
    id: 'budget',
    title: 'Мой бюджет.',
    extra: <BudgetCalculator />
  },
  {
    id: 'calculators',
    title: 'Калькуляторы.',
    content: 'Калькулятор накоплений, переплаты по кредиту, влияния инфляции и выгоды скидки. Считай финансовые решения до того, как их принять.'
  },
  {
    id: 'analytics',
    title: 'Аналитика.',
    content: 'Круговые диаграммы расходов, столбчатые графики по месяцам, сравнение «экономного» и «обычного» месяца — всё наглядно и понятно.'
  },
  {
    id: 'tips',
    title: 'Советы.',
    content: 'Как сократить необязательные расходы, формировать финансовую подушку и оценивать — выгодна ли рассрочка. Практика, не теория.'
  },
  {
    id: 'about',
    title: 'О проекте.',
    content: 'Сайт создан студентами экономического факультета, как учебный проект по теме личных финансов и финансовой грамотности. Над проектом работали Туманс Анастасия, Васильев Александр, Веселова Юлия, Чепанова Анастасия и Финаев Никита. Экономика повседневной жизни - ближе, чем кажется :)',
    showButton: true,
    buttonText: 'Открыть бюджет'
  },
]