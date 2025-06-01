import React, { useState } from 'react';
import { User, MapPin, CheckCircle, Tag } from 'lucide-react';
import { usePayment } from '../hooks/usePayment';
import { createOrder } from '../lib/api/orders';
import { useCart } from '../contexts/CartContext';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  zipCode: string;
  phone: string;
}

const CheckoutPage: React.FC = () => {
  const {
    items,
    total,
    getDiscountedTotal,
    clearCart,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    couponError,
  } = useCart();
  const { initiatePayu } = usePayment();
  const [couponCode, setCouponCode] = useState('');
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  const [orderError, setOrderError] = useState<string | null>(null);

  const [formData, setFormData] = useState<FormData>({
    firstName: 'test',
    lastName: 'test',
    email: 'test@test.com',
    address: 'test',
    city: 'test',
    zipCode: '123456',
    phone: '1234567890',
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

    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;

    setIsApplyingCoupon(true);
    try {
      await applyCoupon(couponCode.trim());
      setCouponCode('');
    } finally {
      setIsApplyingCoupon(false);
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
    if (!formData.phone) newErrors.address = 'Phone Number is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setIsProcessing(true);
      setOrderError(null);

      try {
        const orderData = {
          items: items.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
            name: item.name,
            image_url: item.image_url,
            price: item.price,
            description: item.description || '',
          })),
          shippingAddress: {
            address: formData.address,
            city: formData.city,
            zipCode: formData.zipCode,
          },
          customerDetails: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone,
          },
        };

        const order = await createOrder(orderData);

        // Initiate payment
        const paymentData = {
          orderId: order.id,
          customerName: `${formData.firstName} ${formData.lastName}`,
          customerEmail: formData.email,
          amount: getDiscountedTotal(),
          productInfo: 'Order Payment',
          firstName: formData.firstName,
          email: formData.email,
          phone: formData.phone,
        };

        const payment = await initiatePayu(paymentData);
        console.log({ payment }, 'payment');

        clearCart();
      } catch (error) {
        setOrderError(
          error instanceof Error ? error.message : 'Failed to process order'
        );
        setIsProcessing(false);
        console.error(error);
      }
    }
  };

  const subtotal = total;
  const shippingCost = subtotal > 50 ? 0 : 5.99;
  const finalTotal = getDiscountedTotal() + shippingCost;

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in'>
      <h1 className='text-2xl font-bold text-gray-900 mb-6'>Checkout</h1>

      {orderError && (
        <div className='mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative'>
          {orderError}
        </div>
      )}

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

              <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
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

              <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
                <div>
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

                <div>
                  <label htmlFor='phone' className='label'>
                    Phone Number
                  </label>
                  <input
                    type='number'
                    id='phone'
                    name='phone'
                    value={formData.phone}
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
              {items.map((item) => (
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

            {/* Coupon Section */}
            <div className='mb-6 border-b border-gray-200 pb-6'>
              <div className='flex items-center mb-2'>
                <Tag className='mr-2 h-5 w-5 text-primary-600' />
                <h3 className='text-sm font-medium text-gray-800'>
                  Have a coupon?
                </h3>
              </div>

              {appliedCoupon ? (
                <div className='bg-green-50 p-3 rounded-md'>
                  <div className='flex justify-between items-center'>
                    <div>
                      <p className='text-sm font-medium text-green-800'>
                        {appliedCoupon.code}
                      </p>
                      <p className='text-xs text-green-600'>
                        {appliedCoupon.discount}% discount applied
                      </p>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className='text-sm text-red-600 hover:text-red-800'
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ) : (
                <div className='flex space-x-2'>
                  <input
                    type='text'
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder='Enter coupon code'
                    className='input flex-1'
                  />
                  <button
                    onClick={handleApplyCoupon}
                    disabled={isApplyingCoupon || !couponCode}
                    className='btn-primary px-4'
                  >
                    {isApplyingCoupon ? 'Applying...' : 'Apply'}
                  </button>
                </div>
              )}

              {couponError && (
                <p className='mt-2 text-sm text-red-600'>{couponError}</p>
              )}
            </div>

            <div className='space-y-3'>
              <div className='flex justify-between text-gray-600'>
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>

              {appliedCoupon && (
                <div className='flex justify-between text-gray-600'>
                  <span>Discount ({appliedCoupon.discount}%)</span>
                  <span>
                    -₹{((subtotal * appliedCoupon.discount) / 100).toFixed(2)}
                  </span>
                </div>
              )}

              <div className='flex justify-between text-gray-600'>
                <span>Shipping</span>
                <span>
                  {shippingCost === 0 ? 'Free' : `₹${shippingCost.toFixed(2)}`}
                </span>
              </div>

              <div className='pt-3 border-t border-gray-200 flex justify-between font-semibold text-lg'>
                <span>Total</span>
                <span>₹{finalTotal.toFixed(2)}</span>
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
