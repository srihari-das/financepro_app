# Nessie API Setup Instructions

## 🚀 Quick Setup

### 1. Get Your Nessie API Key

1. Visit [http://api.nessieisreal.com/](http://api.nessieisreal.com/)
2. Click "Sign in with GitHub" 
3. If you don't have a GitHub account, sign up for free at [github.com](https://github.com)
4. Once logged in, go to your profile to retrieve your API key
5. Copy the API key (it will look something like: `9203847529304875`)

### 2. Configure Your Environment Variables

1. Open the `.env.local` file in your project root
2. Replace `your_api_key_here` with your actual API key:

```env
# Nessie Capital One API Configuration
NEXT_PUBLIC_NESSIE_API_KEY=your_actual_api_key_here
NEXT_PUBLIC_NESSIE_BASE_URL=http://api.nessieisreal.com

# Test Customer ID (optional - will auto-select first customer if not provided)
NEXT_PUBLIC_TEST_CUSTOMER_ID=your_customer_id_here
```

### 3. Find a Test Customer ID (Optional)

If you want to use a specific customer for testing:

1. Visit the Nessie API documentation: [http://api.nessieisreal.com/](http://api.nessieisreal.com/)
2. Try the `/customers` endpoint to see available customers
3. Copy a customer `_id` and add it to your `.env.local` file

**Or let the app auto-select:** The app will automatically use the first available customer if no specific ID is provided.

### 4. Restart Your Development Server

After updating the environment variables:

```bash
npm run dev
```

## 🔧 What's Integrated

The app now pulls real data from Nessie API for:

- ✅ **Customer Profile** - Real customer names and addresses
- ✅ **Account Information** - Actual account balances and types
- ✅ **Transaction History** - Real purchases, deposits, and transfers
- ✅ **Bill Information** - Upcoming and past bills
- ✅ **Financial Calculations** - Based on real transaction data

## 📊 Features Using Real Data

### Profile Page
- Displays real customer name and location
- Shows actual account balances and transaction data
- Calculates financial health score based on real metrics

### Debt Payoff Page
- Real credit card account data
- Actual balances and calculated minimum payments
- Transaction history for spending analysis

### Savings Planner
- Uses actual savings and checking account balances
- Real deposit history for income calculations

## 🐛 Troubleshooting

### API Key Issues
- Make sure your API key is correct and not expired
- Ensure the `.env.local` file is in the root directory
- Restart the dev server after changing environment variables

### No Data Showing
- Check the browser console for API errors
- Verify your internet connection
- Make sure the Nessie API is accessible from your network

### Customer Not Found
- Try removing the `NEXT_PUBLIC_TEST_CUSTOMER_ID` to let the app auto-select
- Or visit the API documentation to find valid customer IDs

## 🔒 Security Notes

- The `.env.local` file is already in `.gitignore` to keep your API key secure
- Never commit your actual API key to version control
- The API key is prefixed with `NEXT_PUBLIC_` because it's used in client-side code (this is safe for the Nessie sandbox API)

## 📚 API Documentation

For more details about the Nessie API:
- Documentation: [http://api.nessieisreal.com/](http://api.nessieisreal.com/)
- All endpoints are documented with interactive "Try It Out" functionality
- Response schemas and examples are provided for each endpoint