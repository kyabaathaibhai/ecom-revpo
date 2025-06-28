import React, { useState } from 'react';
import { User, MapPin, CheckCircle, Tag, Shield, CreditCard, Truck } from 'lucide-react';
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
    if (!formData.phone) newErrors.phone = 'Phone Number is required';

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
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-blue-50'>
      <div className='container-max section-padding'>
        <div className='mb-8 animate-fade-in-up'>
          <h1 className='text-4xl font-bold text-gray-900 mb-2'>Checkout</h1>
          <p className='text-gray-600'>Complete your order securely</p>
        </div>

        {orderError && (
          <div className='mb-8 p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl animate-fade-in-up'>
            <div className='flex items-center'>
              <CheckCircle className='w-5 h-5 mr-3' />
              {orderError}
            </div>
          </div>
        )}

        <div className='lg:grid lg:grid-cols-12 lg:gap-12'>
          {/* Form Section */}
          <div className='lg:col-span-7 mb-8 lg:mb-0'>
            <form onSubmit={handleSubmit} className='card p-8 animate-fade-in-up stagger-1'>
              {/* Customer Information */}
              <div className='mb-10'>
                <div className='flex items-center mb-6'>
                  <div className='w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mr-4'>
                    <User className='w-5 h-5 text-white' />
                  </div>
                  <h2 className='text-2xl font-bold text-gray-900'>
                    Customer Information
                  </h2>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
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
                        errors.firstName ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''
                      }`}
                      placeholder='Enter your first name'
                    />
                    {errors.firstName && (
                      <p className='text-red-500 text-sm mt-2 flex items-center'>
                        <CheckCircle className='w-4 h-4 mr-1' />
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
                        errors.lastName ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''
                      }`}
                      placeholder='Enter your last name'
                    />
                    {errors.lastName && (
                      <p className='text-red-500 text-sm mt-2 flex items-center'>
                        <CheckCircle className='w-4 h-4 mr-1' />
                        {errors.lastName}
                      </p>
                    )}
                  </div>

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
                      className={`input ${
                        errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''
                      }`}
                      placeholder='Enter your email'
                    />
                    {errors.email && (
                      <p className='text-red-500 text-sm mt-2 flex items-center'>
                        <CheckCircle className='w-4 h-4 mr-1' />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor='phone' className='label'>
                      Phone Number
                    </label>
                    <input
                      type='tel'
                      id='phone'
                      name='phone'
                      value={formData.phone}
                      onChange={handleChange}
                      className={`input ${
                        errors.phone ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''
                      }`}
                      placeholder='Enter your phone number'
                    />
                    {errors.phone && (
                      <p className='text-red-500 text-sm mt-2 flex items-center'>
                        <CheckCircle className='w-4 h-4 mr-1' />
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Shipping Information */}
              <div className='mb-10'>
                <div className='flex items-center mb-6'>
                  <div className='w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mr-4'>
                    <MapPin className='w-5 h-5 text-white' />
                  </div>
                  <h2 className='text-2xl font-bold text-gray-900'>
                    Shipping Address
                  </h2>
                </div>

                <div className='space-y-6'>
                  <div>
                    <label htmlFor='address' className='label'>
                      Street Address
                    </label>
                    <input
                      type='text'
                      id='address'
                      name='address'
                      value={formData.address}
                      onChange={handleChange}
                      className={`input ${
                        errors.address ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''
                      }`}
                      placeholder='Enter your street address'
                    />
                    {errors.address && (
                      <p className='text-red-500 text-sm mt-2 flex items-center'>
                        <CheckCircle className='w-4 h-4 mr-1' />
                        {errors.address}
                      </p>
                    )}
                  </div>

                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
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
                        className={`input ${
                          errors.city ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''
                        }`}
                        placeholder='Enter your city'
                      />
                      {errors.city && (
                        <p className='text-red-500 text-sm mt-2 flex items-center'>
                          <CheckCircle className='w-4 h-4 mr-1' />
                          {errors.city}
                        </p>
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
                          errors.zipCode ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''
                        }`}
                        placeholder='Enter ZIP code'
                      />
                      {errors.zipCode && (
                        <p className='text-red-500 text-sm mt-2 flex items-center'>
                          <CheckCircle className='w-4 h-4 mr-1' />
                          {errors.zipCode}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type='submit'
                className={`w-full py-4 px-8 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center ${
                  isProcessing
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'btn-primary'
                }`}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <div className='w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin mr-3'></div>
                    Processing Payment...
                  </>
                ) : (
                  <>
                    <CreditCard className='w-6 h-6 mr-3' />
                    Complete Order
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className='lg:col-span-5'>
            <div className='card p-8 animate-fade-in-up stagger-2 sticky top-24'>
              <h2 className='text-2xl font-bold text-gray-900 mb-6'>
                Order Summary
              </h2>

              {/* Order Items */}
              <div className='max-h-80 overflow-y-auto mb-6 space-y-4'>
                {items.map((item) => (
                  <div key={item.id} className='flex items-center py-3 border-b border-gray-100 last:border-0'>
                    <div className='h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl bg-gray-100'>
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className='h-full w-full object-cover'
                      />
                    </div>
                    <div className='ml-4 flex-1'>
                      <h3 className='text-sm font-semibold text-gray-900 line-clamp-1'>
                        {item.name}
                      </h3>
                      <p className='text-sm text-gray-600'>
                        ₹{item.price.toFixed(2)} × {item.quantity}
                      </p>
                    </div>
                    <p className='text-sm font-bold text-gray-900'>
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Coupon Section */}
              <div className='mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100'>
                <div className='flex items-center mb-4'>
                  <Tag className='w-5 h-5 text-blue-600 mr-2' />
                  <h3 className='text-lg font-semibold text-gray-900'>
                    Promo Code
                  </h3>
                </div>

                {appliedCoupon ? (
                  <div className='bg-green-50 border border-green-200 p-4 rounded-xl'>
                    <div className='flex justify-between items-center'>
                      <div>
                        <p className='text-sm font-semibold text-green-800'>
                          {appliedCoupon.code}
                        </p>
                        <p className='text-xs text-green-600'>
                          {appliedCoupon.discount}% discount applied
                        </p>
                      </div>
                      <button
                        onClick={removeCoupon}
                        className='text-sm text-red-600 hover:text-red-800 font-semibold'
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className='flex space-x-3'>
                    <input
                      type='text'
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder='Enter promo code'
                      className='input flex-1'
                    />
                    <button
                      onClick={handleApplyCoupon}
                      disabled={isApplyingCoupon || !couponCode}
                      className='btn-secondary px-6'
                    >
                      {isApplyingCoupon ? 'Applying...' : 'Apply'}
                    </button>
                  </div>
                )}

                {couponError && (
                  <p className='mt-3 text-sm text-red-600 flex items-center'>
                    <CheckCircle className='w-4 h-4 mr-1' />
                    {couponError}
                  </p>
                )}
              </div>

              {/* Price Breakdown */}
              <div className='space-y-4 mb-8'>
                <div className='flex justify-between text-gray-700'>
                  <span>Subtotal</span>
                  <span className='font-semibold'>₹{subtotal.toFixed(2)}</span>
                </div>

                {appliedCoupon && (
                  <div className='flex justify-between text-green-600'>
                    <span>Discount ({appliedCoupon.discount}%)</span>
                    <span className='font-semibold'>
                      -₹{((subtotal * appliedCoupon.discount) / 100).toFixed(2)}
                    </span>
                  </div>
                )}

                <div className='flex justify-between text-gray-700'>
                  <span className='flex items-center'>
                    <Truck className='w-4 h-4 mr-2' />
                    Shipping
                  </span>
                  <span className='font-semibold'>
                    {shippingCost === 0 ? (
                      <span className='text-green-600'>Free</span>
                    ) : (
                      `₹${shippingCost.toFixed(2)}`
                    )}
                  </span>
                </div>

                <hr className='border-gray-200' />

                <div className='flex justify-between text-2xl font-bold text-gray-900'>
                  <span>Total</span>
                  <span className='gradient-text'>₹{finalTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Security Badge */}
              <div className='bg-gray-50 p-6 rounded-2xl border border-gray-200'>
                <div className='flex items-start'>
                  <Shield className='w-6 h-6 text-green-500 mr-3 mt-1' />
                  <div>
                    <p className='text-sm font-semibold text-gray-900 mb-1'>
                      Secure Checkout
                    </p>
                    <p className='text-xs text-gray-600 leading-relaxed'>
                      Your payment information is processed securely with 256-bit SSL encryption. 
                      We never store your credit card details.
                    </p>
                  </div>
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