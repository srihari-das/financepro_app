import Link from 'next/link'
import { 
  CurrencyDollarIcon, 
  AcademicCapIcon, 
  DocumentCheckIcon,
  UserIcon,
  CreditCardIcon
} from '@heroicons/react/24/outline'

export default function Home() {
  const features = [
    {
      title: 'Survey',
      description: 'Start your financial journey with our comprehensive assessment to understand your goals and preferences.',
      icon: DocumentCheckIcon,
      href: '/survey',
      color: 'bg-blue-500'
    },
    {
      title: 'Financial Literacy Hub',
      description: 'Improve your financial knowledge through our interactive learning environment and resources.',
      icon: AcademicCapIcon,
      href: '/financial-literacy',
      color: 'bg-green-500'
    },
    {
      title: 'Goal-Based Savings Planner',
      description: 'Create personalized savings plans based on your income, goals, and timeline.',
      icon: CurrencyDollarIcon,
      href: '/savings-planner',
      color: 'bg-purple-500'
    },
    {
      title: 'Smart Debt Payoff',
      description: 'Track and manage your debts with intelligent categorization and payment strategies.',
      icon: CreditCardIcon,
      href: '/debt-payoff',
      color: 'bg-red-500'
    },
  ]

  const stats = [
    { label: 'Users Helped', value: '10,000+' },
    { label: 'Goals Achieved', value: '25,000+' },
    { label: 'Debt Eliminated', value: '$50M+' },
    { label: 'Financial Literacy Score', value: '95%' },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-bg text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              Take Control of Your
              <span className="block text-yellow-300">Financial Future</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
              FinancePro helps you plan, save, and achieve your financial goals with personalized tools and expert guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/signup"
                className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold transition-colors duration-200 inline-flex items-center justify-center"
              >
                Get Started Free
              </Link>
              <Link
                href="/survey"
                className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold transition-colors duration-200 inline-flex items-center justify-center"
              >
                Take Our Survey
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-indigo-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Powerful Financial Tools
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to manage your finances, plan for the future, and achieve your goals in one comprehensive platform.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Link
                key={index}
                href={feature.href}
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg card-hover cursor-pointer"
              >
                <div className="flex items-start">
                  <div className={`${feature.color} p-3 rounded-lg mr-4 flex-shrink-0`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-indigo-600 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Financial Life?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of users who have already taken control of their finances with FinancePro.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup"
              className="bg-white text-indigo-600 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-colors duration-200 inline-flex items-center justify-center"
            >
              Create Free Account
            </Link>
            <Link
              href="/profile"
              className="border-2 border-white text-white hover:bg-white hover:text-indigo-600 px-8 py-4 rounded-lg text-lg font-semibold transition-colors duration-200 inline-flex items-center justify-center"
            >
              <UserIcon className="h-5 w-5 mr-2" />
              View Profile Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-2xl font-bold text-indigo-400 mb-4">FinancePro</div>
            <p className="text-gray-400 mb-6">
              Empowering your financial future with intelligent planning tools.
            </p>
            <div className="flex justify-center space-x-6">
              <Link href="/signin" className="text-gray-400 hover:text-white transition-colors">
                Sign In
              </Link>
              <Link href="/signup" className="text-gray-400 hover:text-white transition-colors">
                Sign Up
              </Link>
              <Link href="/survey" className="text-gray-400 hover:text-white transition-colors">
                Survey
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}