import { 
  BookOpenIcon, 
  PlayIcon,
  QuestionMarkCircleIcon,
  TrophyIcon,
  ClockIcon,
  StarIcon
} from '@heroicons/react/24/outline'

export default function FinancialLiteracyHub() {
  const learningModules = [
    {
      title: 'Budgeting Basics',
      description: 'Learn how to create and maintain a personal budget',
      duration: '15 min',
      difficulty: 'Beginner',
      completed: true,
      icon: '💰'
    },
    {
      title: 'Understanding Credit',
      description: 'Master credit scores, reports, and building good credit',
      duration: '20 min',
      difficulty: 'Beginner',
      completed: false,
      icon: '📊'
    },
    {
      title: 'Investment Fundamentals',
      description: 'Introduction to stocks, bonds, and investment strategies',
      duration: '25 min',
      difficulty: 'Intermediate',
      completed: false,
      icon: '📈'
    },
    {
      title: 'Emergency Fund Planning',
      description: 'Build and maintain your financial safety net',
      duration: '12 min',
      difficulty: 'Beginner',
      completed: true,
      icon: '🛡️'
    },
    {
      title: 'Debt Management',
      description: 'Strategies for paying off debt effectively',
      duration: '18 min',
      difficulty: 'Intermediate',
      completed: false,
      icon: '🎯'
    },
    {
      title: 'Retirement Planning',
      description: 'Long-term wealth building and retirement strategies',
      duration: '30 min',
      difficulty: 'Advanced',
      completed: false,
      icon: '🌅'
    }
  ]

  const achievements = [
    { title: 'Budget Master', earned: true },
    { title: 'Credit Champion', earned: false },
    { title: 'Investment Explorer', earned: false },
    { title: 'Debt Crusher', earned: false }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Financial Literacy Hub
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Improve your financial knowledge through our interactive learning environment. 
            Master the fundamentals and build confidence in your financial decisions.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-sm p-6 text-center">
            <div className="text-3xl font-bold text-indigo-600 mb-2">6</div>
            <div className="text-sm text-gray-600">Learning Modules</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">2</div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">27</div>
            <div className="text-sm text-gray-600">Minutes Learned</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 text-center">
            <div className="text-3xl font-bold text-yellow-600 mb-2">1</div>
            <div className="text-sm text-gray-600">Achievements</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Learning Modules */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <BookOpenIcon className="h-6 w-6 mr-2 text-indigo-600" />
                  Learning Modules
                </h2>
              </div>

              <div className="p-6 space-y-4">
                {learningModules.map((module, index) => (
                  <div
                    key={index}
                    className={`p-6 rounded-lg border-2 transition-all hover:shadow-md cursor-pointer ${
                      module.completed
                        ? 'border-green-200 bg-green-50'
                        : 'border-gray-200 bg-white hover:border-indigo-200'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="text-3xl">{module.icon}</div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">
                              {module.title}
                            </h3>
                            {module.completed && (
                              <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                                Completed
                              </div>
                            )}
                          </div>
                          <p className="text-gray-600 mb-3">{module.description}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center">
                              <ClockIcon className="h-4 w-4 mr-1" />
                              {module.duration}
                            </div>
                            <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                              module.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                              module.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {module.difficulty}
                            </div>
                          </div>
                        </div>
                      </div>
                      <button className={`p-2 rounded-full ${
                        module.completed
                          ? 'bg-green-100 text-green-600'
                          : 'bg-indigo-100 text-indigo-600 hover:bg-indigo-200'
                      } transition-colors`}>
                        <PlayIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Progress</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Overall Progress</span>
                    <span className="font-medium">33%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '33%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">This Week</span>
                    <span className="font-medium">27 min</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '54%' }}></div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">Goal: 50 min/week</div>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <TrophyIcon className="h-5 w-5 mr-2 text-yellow-600" />
                Achievements
              </h3>
              <div className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className={`flex items-center space-x-3 p-3 rounded-lg ${
                      achievement.earned ? 'bg-yellow-50' : 'bg-gray-50'
                    }`}
                  >
                    <div className={`p-2 rounded-full ${
                      achievement.earned ? 'bg-yellow-100' : 'bg-gray-200'
                    }`}>
                      <StarIcon className={`h-4 w-4 ${
                        achievement.earned ? 'text-yellow-600' : 'text-gray-400'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <div className={`text-sm font-medium ${
                        achievement.earned ? 'text-yellow-800' : 'text-gray-500'
                      }`}>
                        {achievement.title}
                      </div>
                    </div>
                    {achievement.earned && (
                      <div className="text-xs text-yellow-600 font-medium">Earned!</div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Quiz */}
            <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl shadow-sm p-6 text-white">
              <div className="flex items-center mb-4">
                <div className="bg-white/20 p-2 rounded-lg mr-3">
                  <QuestionMarkCircleIcon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold">Quick Quiz</h3>
              </div>
              <p className="text-purple-100 mb-4">
                Test your knowledge with our daily financial quiz!
              </p>
              <button className="w-full bg-white text-purple-600 font-semibold py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors">
                Start Quiz
              </button>
            </div>

{/* Streamlit Financial Tutor Embed */}
<div className="bg-white rounded-xl shadow-sm p-6">
  <h3 className="text-lg font-semibold text-gray-900 mb-4">
    💵 Financial Literacy Tutor
  </h3>
  <iframe
    src="https://financial-literacy.streamlit.app/?embed=true"
    style={{
      width: '100%',
      height: '600px',   // adjust as needed
      border: '1px solid #e5e7eb',
      borderRadius: '0.75rem'
    }}
    title="Financial Literacy Tutor"
  />
</div>

          </div>
        </div>
      </div>
    </div>
  )
}