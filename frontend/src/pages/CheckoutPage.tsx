import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, User, MapPin, CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  zipCode: string;
  cardNumber: string;
  cardName: string;
  expiryDate: string;
  cvv: string;
}

const CheckoutPage: React.FC = () => {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {}
  );
  const [isProcessing, setIsProcessing] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when typing
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.zipCode) newErrors.zipCode = 'ZIP Code is required';

    if (!formData.cardNumber) {
      newErrors.cardNumber = 'Card number is required';
    } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
      newErrors.cardNumber = 'Card number must be 16 digits';
    }

    if (!formData.cardName) newErrors.cardName = 'Name on card is required';
    if (!formData.expiryDate) {
      newErrors.expiryDate = 'Expiry date is required';
    } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate)) {
      newErrors.expiryDate = 'Use format MM/YY';
    }

    if (!formData.cvv) {
      newErrors.cvv = 'CVV is required';
    } else if (!/^\d{3,4}$/.test(formData.cvv)) {
      newErrors.cvv = 'CVV must be 3 or 4 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setIsProcessing(true);

      // Simulate payment processing
      setTimeout(() => {
        clearCart();
        navigate('/confirmation');
      }, 1500);
    }
  };

  const totalPrice = getTotalPrice();
  const shippingCost = totalPrice > 50 ? 0 : 5.99;
  const totalWithShipping = totalPrice + shippingCost;

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in'>
      <h1 className='text-2xl font-bold text-gray-900 mb-6'>Checkout</h1>

      <div className='lg:grid lg:grid-cols-12 lg:gap-8'>
        <div className='lg:col-span-7'>
          <form
            onSubmit={handleSubmit}
            className='bg-white rounded-lg shadow-soft p-6'
          >
            {/* Customer Information */}
            <div className='mb-8'>
              <div className='flex items-center mb-4'>
                <User className='mr-2 h-5 w-5 text-primary-600' />
                <h2 className='text-lg font-semibold text-gray-800'>
                  Customer Information
                </h2>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                  <label htmlFor='firstName' className='label'>
                    First Name
                  </label>
                  <input
                    type='text'
                    id='firstName'
                    name='firstName'
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`input ${
                      errors.firstName ? 'border-red-500' : ''
                    }`}
                  />
                  {errors.firstName && (
                    <p className='text-red-500 text-xs mt-1'>
                      {errors.firstName}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor='lastName' className='label'>
                    Last Name
                  </label>
                  <input
                    type='text'
                    id='lastName'
                    name='lastName'
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`input ${
                      errors.lastName ? 'border-red-500' : ''
                    }`}
                  />
                  {errors.lastName && (
                    <p className='text-red-500 text-xs mt-1'>
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              <div className='mt-4'>
                <label htmlFor='email' className='label'>
                  Email Address
                </label>
                <input
                  type='email'
                  id='email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  className={`input ${errors.email ? 'border-red-500' : ''}`}
                />
                {errors.email && (
                  <p className='text-red-500 text-xs mt-1'>{errors.email}</p>
                )}
              </div>
            </div>

            {/* Shipping Information */}
            <div className='mb-8'>
              <div className='flex items-center mb-4'>
                <MapPin className='mr-2 h-5 w-5 text-primary-600' />
                <h2 className='text-lg font-semibold text-gray-800'>
                  Shipping Address
                </h2>
              </div>

              <div>
                <label htmlFor='address' className='label'>
                  Address
                </label>
                <input
                  type='text'
                  id='address'
                  name='address'
                  value={formData.address}
                  onChange={handleChange}
                  className={`input ${errors.address ? 'border-red-500' : ''}`}
                />
                {errors.address && (
                  <p className='text-red-500 text-xs mt-1'>{errors.address}</p>
                )}
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
                <div>
                  <label htmlFor='city' className='label'>
                    City
                  </label>
                  <input
                    type='text'
                    id='city'
                    name='city'
                    value={formData.city}
                    onChange={handleChange}
                    className={`input ${errors.city ? 'border-red-500' : ''}`}
                  />
                  {errors.city && (
                    <p className='text-red-500 text-xs mt-1'>{errors.city}</p>
                  )}
                </div>

                <div>
                  <label htmlFor='zipCode' className='label'>
                    ZIP Code
                  </label>
                  <input
                    type='text'
                    id='zipCode'
                    name='zipCode'
                    value={formData.zipCode}
                    onChange={handleChange}
                    className={`input ${
                      errors.zipCode ? 'border-red-500' : ''
                    }`}
                  />
                  {errors.zipCode && (
                    <p className='text-red-500 text-xs mt-1'>
                      {errors.zipCode}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div>
              <div className='flex items-center mb-4'>
                <CreditCard className='mr-2 h-5 w-5 text-primary-600' />
                <h2 className='text-lg font-semibold text-gray-800'>
                  Payment Information
                </h2>
              </div>

              <div>
                <label htmlFor='cardNumber' className='label'>
                  Card Number
                </label>
                <input
                  type='text'
                  id='cardNumber'
                  name='cardNumber'
                  placeholder='1234 5678 9012 3456'
                  value={formData.cardNumber}
                  onChange={handleChange}
                  className={`input ${
                    errors.cardNumber ? 'border-red-500' : ''
                  }`}
                />
                {errors.cardNumber && (
                  <p className='text-red-500 text-xs mt-1'>
                    {errors.cardNumber}
                  </p>
                )}
              </div>

              <div className='mt-4'>
                <label htmlFor='cardName' className='label'>
                  Name on Card
                </label>
                <input
                  type='text'
                  id='cardName'
                  name='cardName'
                  value={formData.cardName}
                  onChange={handleChange}
                  className={`input ${errors.cardName ? 'border-red-500' : ''}`}
                />
                {errors.cardName && (
                  <p className='text-red-500 text-xs mt-1'>{errors.cardName}</p>
                )}
              </div>

              <div className='grid grid-cols-2 gap-4 mt-4'>
                <div>
                  <label htmlFor='expiryDate' className='label'>
                    Expiry Date
                  </label>
                  <input
                    type='text'
                    id='expiryDate'
                    name='expiryDate'
                    placeholder='MM/YY'
                    value={formData.expiryDate}
                    onChange={handleChange}
                    className={`input ${
                      errors.expiryDate ? 'border-red-500' : ''
                    }`}
                  />
                  {errors.expiryDate && (
                    <p className='text-red-500 text-xs mt-1'>
                      {errors.expiryDate}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor='cvv' className='label'>
                    CVV
                  </label>
                  <input
                    type='text'
                    id='cvv'
                    name='cvv'
                    placeholder='123'
                    value={formData.cvv}
                    onChange={handleChange}
                    className={`input ${errors.cvv ? 'border-red-500' : ''}`}
                  />
                  {errors.cvv && (
                    <p className='text-red-500 text-xs mt-1'>{errors.cvv}</p>
                  )}
                </div>
              </div>
            </div>

            <button
              type='submit'
              className={`mt-8 w-full btn-primary py-3 flex items-center justify-center ${
                isProcessing ? 'opacity-70 cursor-not-allowed' : ''
              }`}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <svg
                    className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                  >
                    <circle
                      className='opacity-25'
                      cx='12'
                      cy='12'
                      r='10'
                      stroke='currentColor'
                      strokeWidth='4'
                    ></circle>
                    <path
                      className='opacity-75'
                      fill='currentColor'
                      d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                    ></path>
                  </svg>
                  Processing Payment...
                </>
              ) : (
                <>Complete Order</>
              )}
            </button>
          </form>
        </div>

        <div className='mt-8 lg:mt-0 lg:col-span-5'>
          <div className='bg-white rounded-lg shadow-soft p-6 animate-slide-up'>
            <h2 className='text-lg font-semibold text-gray-800 mb-4'>
              Order Summary
            </h2>

            <div className='max-h-80 overflow-y-auto mb-4'>
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className='flex py-3 border-b border-gray-200 last:border-0'
                >
                  <div className='h-16 w-16 flex-shrink-0 overflow-hidden rounded-md'>
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className='h-full w-full object-cover object-center'
                    />
                  </div>
                  <div className='ml-4 flex-1'>
                    <h3 className='text-sm font-medium text-gray-800'>
                      {item.name}
                    </h3>
                    <p className='mt-1 text-sm text-gray-600'>
                      {item.price.toFixed(2)} x {item.quantity}
                    </p>
                  </div>
                  <p className='text-sm font-medium text-gray-800'>
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className='space-y-3'>
              <div className='flex justify-between text-gray-600'>
                <span>Subtotal</span>
                <span>₹{totalPrice.toFixed(2)}</span>
              </div>

              <div className='flex justify-between text-gray-600'>
                <span>Shipping</span>
                <span>
                  {shippingCost === 0 ? 'Free' : `₹${shippingCost.toFixed(2)}`}
                </span>
              </div>

              <div className='pt-3 border-t border-gray-200 flex justify-between font-semibold text-lg'>
                <span>Total</span>
                <span>₹{totalWithShipping.toFixed(2)}</span>
              </div>
            </div>

            <div className='mt-6 bg-gray-50 p-4 rounded-md border border-gray-200'>
              <div className='flex items-start'>
                <CheckCircle className='h-5 w-5 text-secondary-500 mr-2 mt-0.5' />
                <div>
                  <p className='text-sm font-medium text-gray-800'>
                    Secure Checkout
                  </p>
                  <p className='text-xs text-gray-600 mt-1'>
                    Your payment information is processed securely. We do not
                    store credit card details.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
