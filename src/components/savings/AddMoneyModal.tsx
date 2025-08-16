import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import MesombService, { type MesombCollectRequest } from '../../utils/mesomb';
import { useSavings } from '../../hooks/useSavings';

interface AddMoneyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddMoneyModal: React.FC<AddMoneyModalProps> = ({ isOpen, onClose }) => {
  const { addSavingsTransaction } = useSavings();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    amount: '',
    service: 'MTN' as 'MTN' | 'ORANGE' | 'MOOV',
    phoneNumber: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const services = [
    { value: 'MTN', label: 'MTN Mobile Money', color: 'bg-yellow-500' },
    { value: 'ORANGE', label: 'Orange Money', color: 'bg-orange-500' },
    { value: 'MOOV', label: 'Moov Money', color: 'bg-blue-500' }
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount';
    }

    if (!formData.phoneNumber) {
      newErrors.phoneNumber = 'Please enter a phone number';
    } else if (!MesombService.validatePhoneNumber(formData.phoneNumber, formData.service)) {
      newErrors.phoneNumber = 'Please enter a valid phone number for the selected service';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const amount = parseFloat(formData.amount);
      const request: MesombCollectRequest = {
        amount,
        service: formData.service,
        payer: formData.phoneNumber,
        trxID: `savings_general-savings_${Date.now()}`,
        description: formData.description || 'Savings deposit'
      };

      console.log('Making Mesomb collect request:', request);

      const response = await MesombService.collectMoney(request);
      console.log('Mesomb response:', response);

      if (response.success) {
        // Save transaction to Firestore
        await addSavingsTransaction({
          amount,
          type: 'deposit',
          service: formData.service,
          phoneNumber: formData.phoneNumber,
          status: 'success',
          transactionId: response.transaction?.pk,
          description: formData.description || 'Savings deposit'
        });

        toast.success(`Successfully added ${formData.amount} FCFA to your savings!`);
        resetForm();
        onClose();
      } else {
        // Save failed transaction to Firestore
        await addSavingsTransaction({
          amount,
          type: 'deposit',
          service: formData.service,
          phoneNumber: formData.phoneNumber,
          status: 'failed',
          description: formData.description || 'Savings deposit'
        });

        toast.error(response.message || 'Payment failed. Please try again.');
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      amount: '',
      service: 'MTN',
      phoneNumber: '',
      description: ''
    });
    setStep(1);
    setErrors({});
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Add Money to Savings</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Step 1: Amount */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount (FCFA)
                </label>
                <input
                  type="number"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.amount ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter amount"
                  min="100"
                />
                {errors.amount && (
                  <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description (Optional)
                </label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Emergency fund, Vacation savings"
                />
              </div>

              <button
                onClick={() => setStep(2)}
                disabled={!formData.amount || parseFloat(formData.amount) <= 0}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Continue
              </button>
            </div>
          )}

          {/* Step 2: Service Selection */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Select Mobile Money Service
                </label>
                <div className="space-y-2">
                  {services.map((service) => (
                    <button
                      key={service.value}
                      onClick={() => setFormData({ ...formData, service: service.value as 'MTN' | 'ORANGE' | 'MOOV' })}
                      className={`w-full p-3 border rounded-lg text-left transition-colors ${
                        formData.service === service.value
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <div className="flex items-center">
                        <div className={`w-4 h-4 rounded-full ${service.color} mr-3`}></div>
                        <span className="font-medium">{service.label}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 !bg-gray-200 !text-gray-700 py-2 px-4 rounded-lg !hover:bg-gray-300 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="flex-1 !bg-blue-600 !text-white py-2 px-4 rounded-lg !hover:bg-blue-700 transition-colors"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Phone Number */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="e.g., 677550203"
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
                )}
                <p className="text-sm text-gray-500 mt-1">
                  Enter your {formData.service} phone number
                </p>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex-1 !bg-green-600 !text-white py-2 px-4 rounded-lg !hover:bg-green-700 disabled:!bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing...
                    </div>
                  ) : (
                    'Pay Now'
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddMoneyModal;
