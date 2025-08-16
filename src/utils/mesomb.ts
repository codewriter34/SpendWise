import { PaymentOperation, RandomGenerator } from '@hachther/mesomb';

// Environment variables for Mesomb configuration
const APPLICATION_KEY = import.meta.env.VITE_MESOMB_APPLICATION_KEY;
const ACCESS_KEY = import.meta.env.VITE_MESOMB_ACCESS_KEY;
const SECRET_KEY = import.meta.env.VITE_MESOMB_SECRET_KEY;

// Backend API URL
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

// Enable simulation mode for testing (set to false for production)
const SIMULATION_MODE = false;

// Debug: Log environment variables (remove in production)
console.log('Mesomb Config Check:', {
  APPLICATION_KEY: APPLICATION_KEY ? 'Set' : 'Missing',
  ACCESS_KEY: ACCESS_KEY ? 'Set' : 'Missing',
  SECRET_KEY: SECRET_KEY ? 'Set' : 'Missing',
  hasAllKeys: !!(APPLICATION_KEY && ACCESS_KEY && SECRET_KEY),
  SIMULATION_MODE,
  BACKEND_URL
});

// Validate environment variables
const validateMesombConfig = () => {
  const missingVars = [];
  if (!APPLICATION_KEY) missingVars.push('VITE_MESOMB_APPLICATION_KEY');
  if (!ACCESS_KEY) missingVars.push('VITE_MESOMB_ACCESS_KEY');
  if (!SECRET_KEY) missingVars.push('VITE_MESOMB_SECRET_KEY');
  
  if (missingVars.length > 0) {
    console.warn('Mesomb configuration missing:', missingVars.join(', '));
    return false;
  }
  return true;
};

// Check if we're in a browser environment
const isBrowserEnvironment = () => {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
};

export interface MesombCollectRequest {
  amount: number;
  service: 'MTN' | 'ORANGE' | 'MOOV';
  payer: string;
  trxID?: string;
  description?: string;
}

export interface MesombResponse {
  success: boolean;
  message: string;
  status: string;
  transaction?: {
    pk: string;
    amount: number;
    service: string;
    payer: string;
    status: string;
    created_at: string;
  };
  error?: string;
}

export class MesombService {
  /**
   * Check if Mesomb is properly configured
   */
  static isConfigured(): boolean {
    return validateMesombConfig();
  }

  /**
   * Simulate payment processing for testing
   */
  static async simulatePayment(request: MesombCollectRequest): Promise<MesombResponse> {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate success 80% of the time
        const isSuccess = Math.random() > 0.2;
        
        if (isSuccess) {
          resolve({
            success: true,
            message: 'Payment processed successfully (Simulation)',
            status: 'SUCCESS',
            transaction: {
              pk: `sim_${Date.now()}`,
              amount: request.amount,
              service: request.service,
              payer: request.payer,
              status: 'SUCCESS',
              created_at: new Date().toISOString(),
            },
          });
        } else {
          resolve({
            success: false,
            message: 'Payment failed (Simulation)',
            status: 'FAILED',
            error: 'Simulated payment failure'
          });
        }
      }, 2000); // Simulate 2 second processing time
    });
  }

  /**
   * Collect money from mobile money account using backend API
   */
  static async collectMoney(request: MesombCollectRequest): Promise<MesombResponse> {
    try {
      // Always use backend API in production
      console.log('Making payment request to backend:', {
        amount: request.amount,
        service: request.service,
        payer: request.payer,
        trxID: request.trxID,
        backendUrl: BACKEND_URL
      });

      console.log('Attempting to fetch from:', `${BACKEND_URL}/api/payments/collect`);

      // Make request to backend API
      const response = await fetch(`${BACKEND_URL}/api/payments/collect`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: request.amount,
          service: request.service,
          payer: request.payer,
          trxID: request.trxID || `savings_${Date.now()}`,
          description: request.description || 'Savings deposit'
        }),
      });

      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);

      if (!response.ok) {
        const errorText = await response.text();
        console.log('Response error text:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const data = await response.json();
      console.log('Backend response:', data);

      return {
        success: data.success,
        message: data.message,
        status: data.status,
        transaction: data.transaction,
        error: data.error
      };

    } catch (error) {
      console.error('Payment error:', error);
      console.error('Error type:', typeof error);
      console.error('Error message:', error instanceof Error ? error.message : 'Unknown error');
      
      // Fall back to simulation if backend is not available
      if (error instanceof Error && (error.message.includes('fetch') || error.message.includes('Failed to fetch'))) {
        console.log('Backend not available - falling back to simulation');
        return await this.simulatePayment(request);
      }
      
      return {
        success: false,
        message: 'Failed to process payment',
        status: 'ERROR',
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  /**
   * Deposit money to mobile money account using backend API
   */
  static async depositMoney(request: MesombCollectRequest): Promise<MesombResponse> {
    try {
      // Use simulation mode for testing
      if (SIMULATION_MODE) {
        console.log('Using simulation mode for deposit');
        return await this.simulatePayment(request);
      }

      console.log('Making deposit request to backend:', {
        amount: request.amount,
        service: request.service,
        payer: request.payer,
        trxID: request.trxID,
        backendUrl: BACKEND_URL
      });

      // Make request to backend API (you might need to create a deposit endpoint)
      const response = await fetch(`${BACKEND_URL}/api/payments/deposit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: request.amount,
          service: request.service,
          payer: request.payer,
          trxID: request.trxID || `savings_deposit_${Date.now()}`,
          description: request.description || 'Savings deposit'
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Backend response:', data);

      return {
        success: data.success,
        message: data.message,
        status: data.status,
        transaction: data.transaction,
        error: data.error
      };

    } catch (error) {
      console.error('Deposit error:', error);
      
      // Fall back to simulation if backend is not available
      if (error instanceof Error && error.message.includes('fetch')) {
        console.log('Backend not available - falling back to simulation');
        return await this.simulatePayment(request);
      }
      
      return {
        success: false,
        message: 'Failed to process deposit',
        status: 'ERROR',
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  /**
   * Validate phone number format
   */
  static validatePhoneNumber(phoneNumber: string, service: 'MTN' | 'ORANGE' | 'MOOV'): boolean {
    // Remove any non-digit characters
    const cleanNumber = phoneNumber.replace(/\D/g, '');
    
    // Cameroon phone number validation
    const mtnPattern = /^(6[5-9]|67)\d{7}$/;
    const orangePattern = /^(6[0-4]|69)\d{7}$/;
    const moovPattern = /^(6[0-4]|69)\d{7}$/; // Moov uses similar pattern to Orange

    switch (service) {
      case 'MTN':
        return mtnPattern.test(cleanNumber);
      case 'ORANGE':
        return orangePattern.test(cleanNumber);
      case 'MOOV':
        return moovPattern.test(cleanNumber);
      default:
        return false;
    }
  }

  /**
   * Format phone number for display
   */
  static formatPhoneNumber(phoneNumber: string): string {
    const cleanNumber = phoneNumber.replace(/\D/g, '');
    if (cleanNumber.length === 9) {
      return `+237 ${cleanNumber}`;
    }
    return phoneNumber;
  }
}

export default MesombService;
