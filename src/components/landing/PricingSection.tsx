import { Link } from 'react-router-dom';

const PricingSection = () => {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for getting started with basic expense tracking",
      features: [
        "Up to 100 transactions per month",
        "Basic expense categories",
        "Simple charts and reports",
        "Mobile app access",
        "Email support"
      ],
      buttonText: "Get Started Free",
      buttonLink: "/register",
      popular: false
    },
    {
      name: "Pro",
      price: "$9.99",
      period: "per month",
      description: "Advanced features for serious budget management",
      features: [
        "Unlimited transactions",
        "Advanced analytics & insights",
        "Custom categories & tags",
        "Budget alerts & notifications",
        "Export to CSV/PDF",
        "Priority email support",
        "Recurring transactions"
      ],
      buttonText: "Start Pro Trial",
      buttonLink: "/register",
      popular: true
    },
    {
      name: "Premium",
      price: "$19.99",
      period: "per month",
      description: "Complete financial management solution",
      features: [
        "Everything in Pro",
        "Multi-account support",
        "Advanced reporting",
        "Tax preparation tools",
        "Investment tracking",
        "24/7 phone support",
        "Family account sharing",
        "API access"
      ],
      buttonText: "Start Premium Trial",
      buttonLink: "/register",
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-[#F5F5F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#154D71] mb-4">
            Choose Your Plan
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Start free and upgrade as your financial needs grow. No hidden fees, cancel anytime.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`relative bg-white rounded-lg shadow-lg p-8 ${
                plan.popular 
                  ? 'ring-2 ring-[#33A1E0] transform scale-105' 
                  : 'hover:shadow-xl transition-shadow duration-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-[#33A1E0] text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-[#154D71] mb-2">
                  {plan.name}
                </h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-[#154D71]">
                    {plan.price}
                  </span>
                  <span className="text-gray-600 ml-2">
                    /{plan.period}
                  </span>
                </div>
                <p className="text-gray-600">
                  {plan.description}
                </p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <svg className="w-5 h-5 text-[#33A1E0] mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                to={plan.buttonLink}
                className={`w-full py-3 px-6 rounded-lg font-semibold text-center transition-colors duration-200 ${
                  plan.popular
                    ? 'bg-[#33A1E0] text-white hover:bg-[#1C6EA4]'
                    : 'bg-[#FFF9AF] text-[#154D71] hover:bg-yellow-200'
                }`}
              >
                {plan.buttonText}
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            All plans include a 14-day free trial. No credit card required.
          </p>
          <p className="text-sm text-gray-500">
            Need a custom plan? <Link to="/contact" className="text-[#33A1E0] hover:underline">Contact us</Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
