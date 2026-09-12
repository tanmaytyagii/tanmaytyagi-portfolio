/**
 * Research section content.
 *
 * Every number below is transcribed from the paper "Evaluating RAG and LLM
 * Architectures for Evidence-Grounded Healthcare AI" (Bennett University,
 * accepted at iSmartComp 2026):
 *
 *   metrics          → Table II, "Aggregated Comparative Performance of RAG vs.
 *                      LLM Systems (Normalized Scores)"
 *   findings         → Table III, "Comparative Evaluation ... " (R.G. column)
 *   confusionMatrix  → Table IV, "Conceptual Confusion Matrix for Factuality
 *                      Detection (LLM vs. RAG)"
 *   losses           → Section III-E, "Loss Function Comparison"
 *
 * Nothing here is estimated or extrapolated. The implementation stack is read
 * from github.com/tanmaytyagii/RAG-vs-LLM-Healthcare-Research.
 */

export const paper = {
  status: "IEEE Accepted",
  venue: "iSmartComp 2026",
  role: "First Author",
  title: "Evidence-Grounded Healthcare AI: Evaluating RAG and LLM Architectures",
  institution: "Bennett University · School of Computer Science and Technology",
  authors: [
    "Tanmay Tyagi",
    "Ashok Kumar Rai",
    "Khushi Saroha",
    "Rohan Sharma",
    "Jallipalli Pramod",
  ],
  repo: "https://github.com/tanmaytyagii/RAG-vs-LLM-Healthcare-Research",
  cta: "View research on GitHub",
  /**
   * Personal contribution. The paper's own survey base is wider (20 papers,
   * 2023–2025) — that figure belongs to the team, and is labelled as such
   * wherever it appears. This one is mine.
   */
  contribution: {
    value: "15",
    label: "Research papers reviewed",
    note: "my contribution",
  },
  surveyScope: "Paper-wide survey base: 20 papers (2023–2025), across the team.",
};

export interface NarrativeStep {
  index: string;
  kicker: string;
  body: string;
}

export const narrative: NarrativeStep[] = [
  {
    index: "01",
    kicker: "The question",
    body: "Can retrieval-grounded architectures improve reliability in healthcare AI?",
  },
  {
    index: "02",
    kicker: "The problem",
    body: "Language models generate fluent text that is not always supported by evidence. In a clinical setting, a confident wrong answer is the failure mode that matters.",
  },
  {
    index: "03",
    kicker: "The approach",
    body: "Compare a retrieval-augmented architecture against a standard LLM across healthcare research, holding the evaluation dimensions constant.",
  },
  {
    index: "04",
    kicker: "The evaluation",
    body: "Eight dimensions: factual accuracy, faithfulness, hallucination rate, retrieval relevance, fluency, response diversity, computational efficiency and clinical safety.",
  },
  {
    index: "05",
    kicker: "The findings",
    body: "RAG gives stronger grounding and clinical reliability. The standard LLM keeps an edge in fluency and computational efficiency.",
  },
  {
    index: "06",
    kicker: "The implication",
    body: "Retrieval buys evidence grounding, and pays for it in retrieval latency and inference cost. The trade is worth making where correctness is non-negotiable.",
  },
];

export interface MethodologyStage {
  title: string;
  detail: string;
  meta?: string;
}

export const methodology: MethodologyStage[] = [
  {
    title: "Papers reviewed",
    detail: "15 papers read and annotated as my share of the survey.",
    meta: "my contribution",
  },
  {
    title: "Literature selection",
    detail: "Healthcare-AI studies from 2023–2025 screened for comparable evaluation dimensions.",
  },
  {
    title: "Retrieval mechanism",
    detail: "Dense, hybrid and graph-based retrieval families compared across the surveyed systems.",
  },
  {
    title: "Generation model",
    detail: "Standard LLM generation set against retrieval-conditioned RAG integration.",
  },
  {
    title: "Evaluation",
    detail: "Quantitative scores normalized to [0, 1], read alongside qualitative review.",
  },
  {
    title: "Comparative synthesis",
    detail: "Aggregated into a single RAG-versus-LLM comparison across eight metrics.",
  },
];

export interface Metric {
  key: string;
  /** Short form used on the 3D axis. */
  short: string;
  name: string;
  llm: number;
  rag: number;
  /** true when a lower score is the better outcome. */
  lowerIsBetter?: boolean;
  blurb: string;
}

/** Table II — normalized scores. */
export const metrics: Metric[] = [
  {
    key: "accuracy",
    short: "Accuracy",
    name: "Factual Accuracy",
    llm: 0.72,
    rag: 0.88,
    blurb: "Share of responses matching verified ground truth.",
  },
  {
    key: "grounding",
    short: "Grounding",
    name: "Faithfulness / Groundedness",
    llm: 0.68,
    rag: 0.87,
    blurb: "How far the output is actually supported by retrieved evidence.",
  },
  {
    key: "hallucination",
    short: "Hallucination",
    name: "Hallucination Rate",
    llm: 0.27,
    rag: 0.09,
    lowerIsBetter: true,
    blurb: "Fraction of generated facts no evidence supports.",
  },
  {
    key: "relevance",
    short: "Relevance",
    name: "Relevance (Retrieval)",
    llm: 0.7,
    rag: 0.83,
    blurb: "Quality of retrieved context against what was actually asked.",
  },
  {
    key: "fluency",
    short: "Fluency",
    name: "Fluency and Coherence",
    llm: 0.89,
    rag: 0.84,
    blurb: "Linguistic quality and logical flow — the one dimension the LLM leads.",
  },
  {
    key: "diversity",
    short: "Diversity",
    name: "Response Diversity",
    llm: 0.76,
    rag: 0.8,
    blurb: "Semantic and lexical variety across generated answers.",
  },
  {
    key: "efficiency",
    short: "Efficiency",
    name: "Computational Efficiency",
    llm: 0.85,
    rag: 0.73,
    blurb: "Response time and inference cost per query, retrieval included.",
  },
  {
    key: "safety",
    short: "Safety",
    name: "Clinical Safety",
    llm: 0.71,
    rag: 0.92,
    blurb: "Risk profile of the answer in a clinical setting — the largest gain.",
  },
];

/** Table III — reported relative change, RAG against the LLM baseline. */
export const findings = [
  { value: "+22.2%", label: "Factual accuracy" },
  { value: "+29.6%", label: "Clinical safety" },
  { value: "−66.7%", label: "Hallucination rate" },
];

/** Table IV — the paper labels this a conceptual comparison, not a new dataset. */
export const confusionMatrix = {
  label: "Conceptual factuality-detection comparison",
  note: "Table IV of the paper: 1,000 QA instances aggregated from surveyed studies — a conceptual comparison, not a dataset collected for this work.",
  cells: [
    {
      key: "tp",
      code: "TP",
      name: "True Positive",
      llm: 640,
      rag: 830,
      good: true,
      blurb: "A true fact, correctly accepted as correct.",
    },
    {
      key: "fp",
      code: "FP",
      name: "False Positive",
      llm: 160,
      rag: 70,
      good: false,
      blurb: "A hallucinated claim, wrongly accepted as correct.",
    },
    {
      key: "fn",
      code: "FN",
      name: "False Negative",
      llm: 120,
      rag: 60,
      good: false,
      blurb: "A true fact, wrongly rejected as incorrect.",
    },
    {
      key: "tn",
      code: "TN",
      name: "True Negative",
      llm: 80,
      rag: 40,
      good: true,
      blurb: "A hallucinated claim, correctly rejected.",
    },
  ],
};

/** Conceptual data path, not an implementation diagram. */
export const architectures = [
  {
    key: "llm",
    name: "LLM",
    caption: "Generates from parametric knowledge alone.",
    steps: ["Input", "Model", "Generated response"],
  },
  {
    key: "rag",
    name: "RAG",
    caption: "Conditions generation on retrieved evidence.",
    steps: [
      "Input",
      "Retrieval",
      "Relevant evidence",
      "Context",
      "Generation",
      "Grounded response",
    ],
  },
];

/** Section III-E — training objectives, stated conceptually. */
export const losses = [
  {
    key: "llm",
    name: "LLM",
    formula: "ℒ_LLM = − Σ_t log P_θ( y_t | y_<t , x )",
    note: "Cross-entropy over the next token, conditioned only on the input.",
  },
  {
    key: "rag",
    name: "RAG",
    formula: "ℒ_RAG = − 𝔼_{d∼p_φ(d|x)} Σ_t log P_θ( y_t | y_<t , x, d )",
    note: "The same objective, taken in expectation over retrieved documents d.",
  },
];

/** Read from the research repository, not from its README prose. */
export const implementation = {
  summary:
    "The companion repository runs the comparison rather than describing it: both branches share one Llama 3 8B Instruct backbone and one prompt style, so retrieval is the only variable. Medical PDFs are chunked, embedded and indexed in FAISS; the baseline answers from parametric knowledge alone.",
  stack: [
    "Python",
    "LangChain",
    "FAISS",
    "Sentence Transformers",
    "Llama 3 8B Instruct",
    "Streamlit",
  ],
};
