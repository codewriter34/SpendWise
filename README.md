# 💰 SpendWise - Personal Finance Tracker

A modern, full-stack personal finance tracking application built with React and TypeScript. Track your expenses, manage savings goals, and make mobile money payments seamlessly.

![SpendWise](https://img.shields.io/badge/SpendWise-Finance%20Tracker-blue?style=for-the-badge&logo=react)
![React](https://img.shields.io/badge/React-18.0.0-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0.0-blue?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.1.2-purple?style=for-the-badge&logo=vite)

## ✨ Features

### 📊 **Expense Tracking**
- Add income and expenses with categories
- Real-time balance calculation
- Transaction history with search and filters
- Monthly and yearly financial reports

### 🎯 **Savings Management**
- Create and track savings goals
- Mobile money integration for deposits
- Real-time savings progress tracking
- Goal completion analytics

### 💳 **Mobile Money Integration**
- **MTN Mobile Money** (Cameroon)
- **Orange Money** (Cameroon)
- **Moov Money** (Cameroon)
- Secure payment processing
- Real-time transaction status

### 📱 **User Experience**
- Responsive design for all devices
- Real-time data synchronization
- Beautiful, intuitive interface
- Dark/light theme support

## 🛠️ Tech Stack

### **Frontend**
- **React 18** - Modern UI framework
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **React Router** - Client-side routing

### **Backend & Services**
- **Firebase Firestore** - Real-time database
- **Firebase Authentication** - User management
- **Clerk** - Authentication & user management
- **Mesomb API** - Mobile money payments

### **Libraries & Tools**
- **React Hot Toast** - Notifications
- **React Loading Skeleton** - Loading states
- **Recharts** - Data visualization
- **React Hook Form** - Form management

## 🚀 Getting Started

### **Prerequisites**
- Node.js 18+ 
- npm or yarn
- Firebase account
- Clerk account
- Mesomb API keys

### **Installation**

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/spendwise.git
cd spendwise
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Setup**
Create a `.env` file in the root directory:
```env
# Clerk Authentication
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key

# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Mesomb Payment API
VITE_MESOMB_APPLICATION_KEY=your_mesomb_app_key
VITE_MESOMB_ACCESS_KEY=your_mesomb_access_key
VITE_MESOMB_SECRET_KEY=your_mesomb_secret_key
```

4. **Start development server**
```bash
npm run dev
```

5. **Build for production**
```bash
npm run build
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── dashboard/      # Dashboard-specific components
│   ├── landing/        # Landing page components
│   └── savings/        # Savings feature components
├── hooks/              # Custom React hooks
├── pages/              # Page components
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── assets/             # Static assets
```

## 🔧 API Integration

### **Mesomb Mobile Money API**
- **Collect Money**: Process payments from users
- **Deposit Money**: Send money to users
- **Transaction Status**: Real-time payment tracking
- **Phone Validation**: Cameroon mobile number validation

### **Firebase Firestore**
- **Real-time Data**: Live updates across devices
- **User Isolation**: Secure data access per user
- **Offline Support**: Works without internet connection
- **Scalable**: Handles millions of transactions

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### **How to Contribute**

1. **Fork the repository**
2. **Create a feature branch**
```bash
git checkout -b feature/amazing-feature
```

3. **Make your changes**
4. **Test thoroughly**
5. **Commit your changes**
```bash
git commit -m 'Add amazing feature'
```

6. **Push to your branch**
```bash
git push origin feature/amazing-feature
```

7. **Open a Pull Request**

### **Feature Ideas**
- 📊 **Advanced Analytics**: Spending insights and trends
- 🎯 **Budget Planning**: Monthly budget creation and tracking
- 📱 **Mobile App**: React Native version
- 🔔 **Notifications**: Payment reminders and alerts
- 🌍 **Multi-currency**: Support for different currencies
- 📈 **Investment Tracking**: Portfolio management
- 🤖 **AI Insights**: Smart spending recommendations

### **Code Style**
- Follow TypeScript best practices
- Use meaningful variable names
- Add comments for complex logic
- Write unit tests for new features
- Ensure responsive design

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Clerk** for authentication services
- **Firebase** for backend infrastructure
- **Mesomb** for mobile money integration
- **Tailwind CSS** for beautiful styling
- **React Community** for amazing tools and libraries

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/codewriter34/SpendWise/issues)
- **Discussions**: [GitHub Discussions](https://github.com/codewriter34/SpendWise/discussions)
- **Email**: elishawamba61@example.com

---

<div align="center">

**Made with ❤️ by [codewriter34](https://github.com/codewriter34)**

**Wamba Elisha**

[![GitHub](https://img.shields.io/badge/GitHub-codewriter34-black?style=for-the-badge&logo=github)](https://github.com/codewriter34)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Wamba%20Elisha-blue?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/wamba-elisha)

*Building the future of personal finance, one transaction at a time* 💰

</div>
