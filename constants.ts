import { Question, Guna } from './types';

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "How do you approach your daily routine and lifestyle choices?",
    options: [
      {
        id: 'A',
        text: "You structure habits to maximize performance and achievement, ensuring they align with your values and health, but tend to abandon complex routines when they become inconvenient or time-consuming.",
        guna: Guna.Rajas
      },
      {
        id: 'B',
        text: "You prefer consistent, low-maintenance routines that don't require much planning, genuinely caring about sustainable health practices, but sometimes dramatically overhaul everything when inspired by others' success stories.",
        guna: Guna.Tamas
      },
      {
        id: 'C',
        text: "You value balanced, evidence-based approaches that support long-term wellbeing, periodically get enthusiastic about optimizing your systems, but often default to whatever requires the least daily decision-making.",
        guna: Guna.Sattva
      }
    ]
  },
  {
    id: 2,
    text: "When taking on new leadership initiatives, what is your primary driving force?",
    options: [
      {
        id: 'A',
        text: "Sense of duty and responsibility to contribute, some competitive drive when others are also involved, but mostly drawn to roles that build on your existing strengths and experience.",
        guna: Guna.Tamas
      },
      {
        id: 'B',
        text: "Deep conviction about the meaningful impact you can make, excitement about the challenge and potential recognition, but sometimes hesitate to begin because the scope feels overwhelming.",
        guna: Guna.Sattva
      },
      {
        id: 'C',
        text: "The opportunity to achieve significant results and advance your capabilities, ensuring the work serves a genuine purpose, but preferring initiatives with clear precedents rather than completely uncharted territory.",
        guna: Guna.Rajas
      }
    ]
  },
  {
    id: 3,
    text: "Your deepest respect and inspiration comes from",
    options: [
      {
        id: 'A',
        text: "Reliable, consistent leaders who steadily do good work without drama, showing genuine care for people and principles, especially those who can step up decisively when situations truly require it.",
        guna: Guna.Tamas
      },
      {
        id: 'B',
        text: "Those who embody wisdom, authenticity, and genuine care for others' wellbeing, especially when they also demonstrate courage and take meaningful action, though you sometimes admire people more for their ideals than their practical results.",
        guna: Guna.Sattva
      },
      {
        id: 'C',
        text: "Leaders who achieve remarkable results while maintaining ethical standards, demonstrating both wisdom and effectiveness, particularly those who make complex leadership look effortless and natural.",
        guna: Guna.Rajas
      }
    ]
  },
  {
    id: 4,
    text: "When facing challenges, you naturally:",
    options: [
      {
        id: 'A',
        text: "Actively seek practical solutions from successful people and proven methods, ensuring approaches align with your core values and ethics, but generally prefer challenges that are similar to ones you've handled before.",
        guna: Guna.Rajas
      },
      {
        id: 'B',
        text: "Turn to established wisdom, principles, and trusted mentors for guidance, feel motivated to find innovative solutions and prove your capabilities, but sometimes postpone action while researching the \"perfect\" approach.",
        guna: Guna.Sattva
      },
      {
        id: 'C',
        text: "Rely on tried-and-true methods that have worked in the past, maintaining commitment to doing what's right and fair, but can become quite determined and even stubborn when your approach is questioned.",
        guna: Guna.Tamas
      }
    ]
  },
  {
    id: 5,
    text: "How do you respond to success and failure?",
    options: [
      {
        id: 'A',
        text: "You accept both as natural parts of life without getting too emotionally invested, maintaining genuine gratitude and learning orientation, but sometimes react more intensely than expected when outcomes affect your reputation or security.",
        guna: Guna.Tamas
      },
      {
        id: 'B',
        text: "You quickly analyze both for strategic insights and improvement opportunities, maintaining perspective that both are part of growth, but prefer to move past uncomfortable feelings rather than fully experiencing them.",
        guna: Guna.Rajas
      },
      {
        id: 'C',
        text: "You seek to understand the deeper meaning and lessons in both experiences, feel energized to either build on success or recover from failure, but sometimes spend so much time processing that you miss timing for next steps.",
        guna: Guna.Sattva
      }
    ]
  },
  {
    id: 6,
    text: "When facing failure or setbacks:",
    options: [
      {
        id: 'A',
        text: "Immediately focus on what can be learned and improved for next time, honest acknowledgment of mistakes without ego defensiveness, but tendency to move quickly past the failure rather than sitting with uncomfortable feelings.",
        guna: Guna.Rajas
      },
      {
        id: 'B',
        text: "Have practical acceptance for what happened as part of life, have genuine desire to learn and do better, but sometimes become intensely frustrated when the same problems repeat.",
        guna: Guna.Tamas
      },
      {
        id: 'C',
        text: "Deep reflection on lessons and meaning for future growth, initial bursts of energy to analyze and plan improvements, but sometimes get stuck in contemplation rather than taking corrective action.",
        guna: Guna.Sattva
      }
    ]
  },
  {
    id: 7,
    text: "Your communication style in leadership situations:",
    options: [
      {
        id: 'A',
        text: "You communicate with energy and purpose to drive results, always trying to be fair and constructive, but tend to keep interactions efficient rather than diving deep into complex emotional territory.",
        guna: Guna.Rajas
      },
      {
        id: 'B',
        text: "You prefer straightforward, uncomplicated communication, with genuine care for people's feelings, but can become quite insistent when your practical approach is questioned.",
        guna: Guna.Tamas
      },
      {
        id: 'C',
        text: "You strive for honest, thoughtful communication that serves others, can become quite animated when discussing important topics, but sometimes avoid difficult conversations until they become unavoidable.",
        guna: Guna.Sattva
      }
    ]
  },
  {
    id: 8,
    text: "When allocating budget for team development, you typically:",
    options: [
      {
        id: 'A',
        text: "Prefer straightforward, practical approaches that won't create complications while genuinely caring about team growth, but sometimes get caught up in competitive benchmarking against other departments.",
        guna: Guna.Tamas
      },
      {
        id: 'B',
        text: "Research evidence-based programs that genuinely benefit people, but get excited about impressive, cutting-edge options while often procrastinating on the detailed budget analysis until deadlines approach.",
        guna: Guna.Sattva
      },
      {
        id: 'C',
        text: "Actively pursue programs that deliver measurable results and recognition, ensuring they align with organizational values, but tend to avoid complex evaluation processes by defaulting to familiar, proven options.",
        guna: Guna.Rajas
      }
    ]
  },
  {
    id: 9,
    text: "When sharing knowledge and expertise:",
    options: [
      {
        id: 'A',
        text: "You share what seems immediately useful without much complexity, with sincere intentions to help, but sometimes get competitive about maintaining your knowledge advantage.",
        guna: Guna.Tamas
      },
      {
        id: 'B',
        text: "You believe deeply in knowledge sharing for everyone's benefit, get passionate about topics you care about, but sometimes hold back because explaining things thoroughly feels overwhelming.",
        guna: Guna.Sattva
      },
      {
        id: 'C',
        text: "You actively share insights that demonstrate your expertise, genuinely wanting to help others grow, but often stick to familiar topics rather than exploring new areas that require more preparation.",
        guna: Guna.Rajas
      }
    ]
  },
  {
    id: 10,
    text: "Your approach to receiving constructive feedback:",
    options: [
      {
        id: 'A',
        text: "You actively seek feedback that can accelerate your development, appreciating honest insights that help you grow, but tend to focus on feedback that's easier to act on while avoiding more challenging areas.",
        guna: Guna.Rajas
      },
      {
        id: 'B',
        text: "You deeply value authentic feedback for genuine growth, initially feel energized about improvement opportunities, but then sometimes get overwhelmed by the complexity of implementing changes.",
        guna: Guna.Sattva
      },
      {
        id: 'C',
        text: "You listen respectfully and want to do the right thing, sometimes feel defensive about criticism, but generally prefer feedback that doesn't require major changes to your established patterns.",
        guna: Guna.Tamas
      }
    ]
  }
];

export const GUNA_DESCRIPTIONS = {
  [Guna.Sattva]: {
    keywords: "Balance, Harmony, Intelligence, Joy, Purity",
    description: "Sattva is the quality of balance, harmony, and intelligence. A Sattva-dominant leader is often visionary, calm under pressure, and driven by wisdom and genuine care for the whole.",
    color: "#60a5fa" // Blue-ish
  },
  [Guna.Rajas]: {
    keywords: "Activity, Passion, Movement, Change, Creation",
    description: "Rajas is the quality of passion, activity, and movement. A Rajas-dominant leader is driven, goal-oriented, and excellent at executing plans and motivating others towards specific achievements.",
    color: "#d64045" // Red-ish
  },
  [Guna.Tamas]: {
    keywords: "Stability, Inertia, Structure, Preservation, Matter",
    description: "Tamas is the quality of stability and consistency. A Tamas-dominant leader excels in maintaining structures, providing reliability, and ensuring safety, though may sometimes resist necessary change.",
    color: "#4b5563" // Grey-ish
  }
}
