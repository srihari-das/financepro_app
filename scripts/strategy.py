# /scripts/generate_strategy.py

import sys
import json
import os
from openai import OpenAI
from dotenv import load_dotenv

# Load .env file from the project's root
load_dotenv()

def main():
    try:
        # 1. Read the input data from standard input (stdin)
        input_data = json.load(sys.stdin)
        debts = input_data.get('debts')
        subscriptions = input_data.get('subscriptions')
        extra_payment = input_data.get('extraPayment', 0)

        client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

        system_prompt = (
            """
            You are an encouraging financial advisor for the webiste FinancePro. Your goal is to create a personalized,
            actionable debt payoff strategy. Analyze the user's loan and subscription data to find opportunities for savings
            from the given cancelable subscriptions. Mention how the extra monthly payment and saved money from canceling subscriptions could
            affects the timeline and interest amounts for paying off debts. 
            Present the final output as a markdown-formatted numbered list. Do not ask the user to contact you again, since the
            text generation is a one-off.
            """
        )

        user_prompt = (
            f"Here is my financial data:\n"
            f"Debts: {json.dumps(debts)}\n"
            f"Cancelable Subscriptions: {json.dumps(subscriptions)}\n\n"
            f"Extra Monthly Payment I can make: ${extra_payment}\n\n"
            "Please generate my personalized debt payoff plan."
        )

        completion = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt},
            ]
        )

        strategy = completion.choices[0].message.content
        
        # 2. Print the final result to standard output (stdout)
        # This is how the Node.js process will receive the data
        print(json.dumps({"strategy": strategy}))

    except Exception as e:
        # Print errors to standard error (stderr)
        print(json.dumps({"error": str(e)}), file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    main()