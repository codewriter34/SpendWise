const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, 'config.env') });

const { PaymentOperation, RandomGenerator } = require('@hachther/mesomb');

const app = express();
const PORT = process.env.PORT || 5000;

// Trust proxy for rate limiting (important for Render deployment)
app.set('trust proxy', 1);

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5174',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/payments', limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Initialize Mesomb client with API keys as object
const mesombClient = new PaymentOperation({
  applicationKey: process.env.MESOMB_APPLICATION_KEY,
  accessKey: process.env.MESOMB_ACCESS_KEY,
  secretKey: process.env.MESOMB_SECRET_KEY
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    mesombConfigured: !!(process.env.MESOMB_APPLICATION_KEY && process.env.MESOMB_ACCESS_KEY && process.env.MESOMB_SECRET_KEY)
  });
});

// Payment collection endpoint
app.post('/api/payments/collect', async (req, res) => {
  try {
    const { amount, service, payer, trxID, description } = req.body;

    // Validation
    if (!amount || !service || !payer) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: amount, service, payer'
      });
    }

    if (amount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Amount must be greater than 0'
      });
    }

    // Validate service
    const validServices = ['MTN', 'ORANGE', 'MOOV'];
    if (!validServices.includes(service)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid service. Must be one of: MTN, ORANGE, MOOV'
      });
    }

    // Validate phone number format
    const cleanNumber = payer.replace(/\D/g, '');
    if (cleanNumber.length !== 9) {
      return res.status(400).json({
        success: false,
        message: 'Invalid phone number format. Must be 9 digits'
      });
    }

    console.log('Processing payment request:', {
      amount,
      service,
      payer: cleanNumber,
      trxID: trxID || `spendwise_${Date.now()}`,
      description: description || 'SpendWise payment'
    });

    // Make payment request to Mesomb
    const response = await mesombClient.makeCollect({
      amount: parseInt(amount),
      service: service,
      payer: cleanNumber,
      nonce: RandomGenerator.nonce(),
      trxID: trxID || `spendwise_${Date.now()}`,
      description: description || 'SpendWise payment'
    });

    console.log('Mesomb response:', response);

    // Return response
    res.json({
      success: response.success,
      message: response.message,
      status: response.status,
      transaction: response.transaction ? {
        pk: response.transaction.pk || `mesomb_${Date.now()}`,
        amount: response.transaction.amount,
        service: response.transaction.service,
        payer: response.transaction.payer,
        status: response.transaction.status,
        created_at: response.transaction.created_at
      } : {
        pk: `mesomb_${Date.now()}`,
        amount: req.body.amount,
        service: req.body.service,
        payer: req.body.payer,
        status: 'SUCCESS',
        created_at: new Date().toISOString()
      },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Payment error:', error);
    
    res.status(500).json({
      success: false,
      message: 'Payment processing failed',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Payment status check endpoint
app.get('/api/payments/status/:transactionId', async (req, res) => {
  try {
    const { transactionId } = req.params;

    if (!transactionId) {
      return res.status(400).json({
        success: false,
        message: 'Transaction ID is required'
      });
    }

    // Check transaction status (you might need to implement this based on Mesomb's API)
    // For now, we'll return a placeholder
    res.json({
      success: true,
      transactionId,
      status: 'PENDING', // This would be fetched from Mesomb
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Status check error:', error);
    
    res.status(500).json({
      success: false,
      message: 'Failed to check payment status',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Webhook endpoint for payment notifications
app.post('/api/webhooks/mesomb', (req, res) => {
  try {
    const webhookData = req.body;
    
    console.log('Received webhook:', webhookData);
    
    // Process webhook data
    // You can add logic here to update your database
    // or send notifications to users
    
    res.json({ success: true, message: 'Webhook received' });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 SpendWise Backend Server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`💳 Payment endpoint: http://localhost:${PORT}/api/payments/collect`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV}`);
  console.log(`🔑 Mesomb configured: ${!!(process.env.MESOMB_APPLICATION_KEY && process.env.MESOMB_ACCESS_KEY && process.env.MESOMB_SECRET_KEY)}`);
});
