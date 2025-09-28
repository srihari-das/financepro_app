# WARP.md - Capital Compass Project Context

## 1. Project Overview
- **Project Name:** financepro_app (now branded as "Capital Compass")
- **Description:** A modern, comprehensive financial planning web application built using Next.js
- The app aids users with budgeting, debt management, financial literacy, savings planning, subscription management, and financial goal tracking
- The project leverages React, TypeScript, Next.js (v15.5.4), Tailwind CSS, and Supabase for the backend
- Font customization uses Raleway for general text and Nunito Sans specifically for numeric data for better readability
- OpenAI API is integrated for intelligent features; API keys stored in `.env.local`

## 2. Project Structure
- Main application code is under `src/app/` directory
- Pages include: savings-planner, debt-payoff, profile, financial-literacy, survey, and home dashboard
- Tailwind CSS is heavily used for styling with custom configurations in `tailwind.config.js`
- Global styles are in `src/app/globals.css`
- Custom hooks and types exist in `src/hooks` and `src/types`
- Backend integration via Supabase is configured with keys in `.env.local`
- OpenAI API key expected in `.env.local` as `OPENAI_API_KEY`

## 3. Development Details
- Bootstrapped with `create-next-app`
- Packages include React 19.x, Next.js 15.x, Tailwind 3.x, Supabase JS SDK
- Font usage:
  - Raleway (Matt McInerney) as default sans font
  - Nunito Sans (Vernon Adams) applied specifically to numeric fields via a custom Tailwind font family named `numeric` and CSS utility class `.font-numeric` with tabular figures for alignment
- APIs used:
  - Supabase for backend storage and authentication
  - OpenAI API for intelligent functionalities (still requires API key configuration)
- Environment variables for external services managed via `.env.local`
- Application runs on port 3000 locally during development

## 4. Current Development Status
- App compiles and runs successfully
- All runtime and linting issues addressed
- Fonts updated and applied consistently across all financial display data
- Cleanups of unused variables and imports completed
- Development server debugging and testing ongoing
- Successfully migrated from Nessie API mock data to live Supabase backend

## 5. Known Configurations and Files
- `.env.local` holds API keys including:
  - `NEXT_PUBLIC_NESSIE_API_KEY`, `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `OPENAI_API_KEY` (to be added by user)
- `src/app/layout.tsx` imports fonts and sets body font classes
- `tailwind.config.js` extends fonts with `sans` as Raleway and `numeric` as Nunito Sans
- `src/app/globals.css` defines the `.font-numeric` utility class
- GitHub repo: https://github.com/srihari-das/financepro_app

## 6. Architecture & Data Flow
- **Frontend:** Next.js 15 with React 19, TypeScript, Tailwind CSS
- **Backend:** Supabase (PostgreSQL database, authentication, real-time subscriptions)
- **Data Management:** Custom React hooks for data fetching and mutations
- **State Management:** React hooks and Supabase real-time subscriptions
- **UI Components:** Custom components with Heroicons for icons
- **Styling:** Tailwind CSS with custom font configurations for numeric data

## 7. Key Features Implemented
- **Dashboard:** Financial overview with summary cards, charts, and recent transactions
- **Profile Management:** User profile editing with live data sync to Supabase
- **Savings Planner:** Goal tracking with progress visualization and timeline calculations
- **Debt Payoff:** Debt management with payoff strategies and progress tracking
- **Financial Literacy:** Educational content and interactive learning modules
- **Survey System:** Financial assessment with results saved to database
- **Subscription Management:** Track and manage recurring subscriptions
- **Real-time Data:** All pages use live data from Supabase with proper error handling

## 8. Database Schema (Supabase)
Key tables include:
- `userprofile` - User account information and preferences
- `financialdata` - Income, expenses, and financial metrics
- `debtinfo` - Debt accounts with balances and payment info
- `subscriptiondata` - Recurring subscription tracking
- `goalsavings` - Savings goals with target amounts and deadlines
- `surveyresults` - Financial assessment responses

## 9. Development Notes from Conversation
- Multiple patches have been applied to fix type safety issues, font application, and code quality
- The user desired a more professional and readable numeric font, implemented via Nunito Sans for numbers
- App has been rebranded from "FinancePro" to "Capital Compass"
- User environment is Windows 10+, uses pwsh terminal
- OpenAI API key management recommended strictly on server side via `.env.local`
- All mock data has been replaced with live Supabase integration
- TypeScript strict mode enabled with proper error handling throughout

## 10. Quick Start Commands
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## 11. Environment Setup
Ensure `.env.local` contains:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
OPENAI_API_KEY=your_openai_api_key
```

---

This file will serve as a quick reference for understanding project scope, usage, architecture, and current development state for the Capital Compass financial planning application.
