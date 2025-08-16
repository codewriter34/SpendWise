# 🚀 SpendWise Deployment Guide

Complete guide to deploy your SpendWise app to Render.

## 📁 Project Structure

```
spendwise/
├── frontend/          # React/Vite app (this directory)
│   ├── package.json
│   ├── src/
│   └── ...
└── backend/           # Express API
    ├── package.json
    ├── server.js
    └── config.env
```

## 🔧 Backend Deployment (Render Web Service)

### **1. Create Web Service**

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New" → "Web Service"
3. Connect your GitHub repository
4. Configure settings:

```bash
# Service Configuration
Name: spendwise-backend
Root Directory: backend
Environment: Node
Build Command: npm install
Start Command: npm start
```

### **2. Environment Variables**

Add these in Render dashboard → Environment:

```env
NODE_ENV=production
PORT=10000
MESOMB_APPLICATION_KEY=b1797e43de080f0f1442a2879ea1d9eac0d24c39
MESOMB_ACCESS_KEY=f60e15e8-e8e8-40e3-b345-16b36ded1103
MESOMB_SECRET_KEY=bb49a121-0d26-49c4-8a61-f604f6489b4c
CORS_ORIGIN=https://your-frontend-url.onrender.com
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### **3. Deploy**

Click "Create Web Service" and wait for deployment.

**Your backend URL will be:** `https://spendwise-backend.onrender.com`

## 🌐 Frontend Deployment (Render Static Site)

### **1. Create Static Site**

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New" → "Static Site"
3. Connect your GitHub repository
4. Configure settings:

```bash
# Build Configuration
Build Command: npm run build
Publish Directory: dist
```

### **2. Environment Variables**

Add these in Render dashboard → Environment:

```env
VITE_BACKEND_URL=https://spendwise-backend.onrender.com
VITE_MESOMB_APPLICATION_KEY=b1797e43de080f0f1442a2879ea1d9eac0d24c39
VITE_MESOMB_ACCESS_KEY=f60e15e8-e8e8-40e3-b345-16b36ded1103
VITE_MESOMB_SECRET_KEY=bb49a121-0d26-49c4-8a61-f604f6489b4c
```

### **3. Deploy**

Click "Create Static Site" and wait for deployment.

**Your frontend URL will be:** `https://spendwise.onrender.com`

## 🔄 Update CORS Settings

After both services are deployed:

1. **Update Backend CORS:**
   - Go to your backend service on Render
   - Update `CORS_ORIGIN` to your frontend URL
   - Redeploy the backend

## 🧪 Test Production

### **1. Test Backend Health:**
```bash
curl https://spendwise-backend.onrender.com/api/health
```

### **2. Test Payment:**
- Go to your frontend URL
- Try making a real payment
- Check backend logs on Render

## 📊 Monitoring

### **Backend Logs:**
- Go to Render Dashboard → Your Backend Service
- Click "Logs" tab
- Monitor payment requests and responses

### **Health Checks:**
- Backend: `https://spendwise-backend.onrender.com/api/health`
- Frontend: `https://spendwise.onrender.com`

## 🔒 Security Checklist

### **Production Environment:**
- [ ] Environment variables are set
- [ ] CORS is configured correctly
- [ ] Rate limiting is enabled
- [ ] HTTPS is enforced
- [ ] API keys are secured

### **Testing:**
- [ ] Health check endpoint works
- [ ] Payment processing works
- [ ] Error handling works
- [ ] Logs are accessible

## 🚨 Troubleshooting

### **Common Issues:**

1. **CORS Errors:**
   - Check `CORS_ORIGIN` environment variable
   - Ensure frontend URL is correct

2. **Payment Failures:**
   - Verify Mesomb API keys
   - Check backend logs
   - Test with small amounts

3. **Build Failures:**
   - Check Node.js version compatibility
   - Verify all dependencies are in package.json

### **Debug Commands:**
```bash
# Check backend health
curl https://spendwise-backend.onrender.com/api/health

# Test payment endpoint
curl -X POST https://spendwise-backend.onrender.com/api/payments/collect \
  -H "Content-Type: application/json" \
  -d '{"amount":100,"service":"MTN","payer":"677550203"}'
```

## 🎯 Final URLs

After deployment, you'll have:

- **Frontend:** `https://spendwise.onrender.com`
- **Backend:** `https://spendwise-backend.onrender.com`
- **API Health:** `https://spendwise-backend.onrender.com/api/health`

## 🚀 Go Live!

Your SpendWise app is now:
- ✅ **Production Ready**
- ✅ **Real Payment Processing**
- ✅ **Scalable Architecture**
- ✅ **Secure & Monitored**

**Congratulations! Your mobile money payment app is live! 🎉**

---

**Made with ❤️ by codewriter34**
