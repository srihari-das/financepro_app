# 💸 FinancePro

In today's complicated economic landscape, financial clarity is more crucial than ever. It can feel overwhelming to juggle savings goals, paying off debt, and learning finance. We wanted to solve all these issues in one place, helping people achieve financial freedom and pursue their goals. We believe awareness and small dedicated effort go a long way!  
FinancePro was built to empower users with personalized tools and expert guidance to **plan, save, and achieve financial goals**.

FinancePro is a financial planning web app that helps users budget, set savings goals, create debt payoff strategies, manage subscriptions, and build financial literacy—all in one intuitive dashboard.

---

## 🚀 What It Does
FinancePro is a comprehensive **financial dashboard** that guides users to financial freedom through:

- **Personalized Profile & Assessment** – New users take a financial survey to personalize their experience. Data trends and background information drive curated advice.
- **Goal-Based Savings Planner** – Set multiple savings goals with categories, priority, and target dates. The app calculates the exact amount to save monthly.
- **Smart Debt Payoff** – Expenses are analyzed and categorized. “Nice-to-have” subscriptions are flagged so users can redirect funds toward debt repayment.
- **AI-Powered Strategy Generator** – Generates custom savings strategies to accelerate debt payoff and goal achievement.
- **Analytics Dashboard** – Provides a bird’s-eye view of net worth, debt, monthly income/expenses, and an overall financial health score.
- **Financial Literacy Hub** – Interactive learning modules with videos, AI-powered chat Q&A, and auto-generated quizzes.

---

## ⚙️ How We Built It
**Frontend**  
- [Next.js](https://nextjs.org/) (App Router) + [React](https://react.dev/) for UI  
- [TypeScript](https://www.typescriptlang.org/) for type-safe development  
- [Tailwind CSS](https://tailwindcss.com/) for fast, responsive styling  
- Warp was used to generate clean component templates

**Backend**  
- [Supabase](https://supabase.com/) for PostgreSQL database, authentication, and real-time data
- Service layer (`financial-data.ts`) encapsulates all DB access and business logic
- Hooks wrap service calls for easy component use


**Integrations & AI Stack**  
- [OpenAI API](https://openai.com/api/) powers the AI strategy generator and the Financial Literacy Hub’s interactive tutor  
- [Streamlit](https://streamlit.io/) hosts the Financial Literacy Hub and interactive quiz interface  
- [python-dotenv](https://pypi.org/project/python-dotenv/) (`load_dotenv`) for environment variable management  
- [PyPDF2](https://pypi.org/project/PyPDF2/) (`pypdf`) to extract text from financial PDF resources  
- [LangChain](https://www.langchain.com/) ecosystem for building the RAG pipeline:
  - `CharacterTextSplitter` for chunking PDF content
  - `OpenAIEmbeddings` for embedding generation
  - `FAISS` vector store for semantic search
  - `load_qa_chain` and `OpenAI` LLM wrapper for question answering
  - `PromptTemplate` for structured prompts
  - `get_openai_callback` for usage tracking and cost monitoring

---


---

## 💡 Developer Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/<your-org>/financepro_app.git
   cd financepro_app
    ```
   
2. **Install Node dependencies**
   ```bash
   npm install
   or
   pnpm install
   ```
3. **Setting up the environment variable**

 ```bash

# Supabase keys
NEXT_PUBLIC_SUPABASE_URL=<your_supabase_url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your_supabase_anon_key>

# Optional: enables AI features
OPENAI_API_KEY=<your_openai_key>

 ```
3. **Starting the Next.js development server**
 
 ```bash
npm run dev
```
