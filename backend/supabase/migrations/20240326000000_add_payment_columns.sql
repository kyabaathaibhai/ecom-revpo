-- Add payment-related columns to orders table
ALTER TABLE public.orders
ADD COLUMN payment_status VARCHAR(50) DEFAULT 'pending',
ADD COLUMN payment_id VARCHAR(255),
ADD COLUMN payment_mode VARCHAR(50),
ADD COLUMN transaction_id VARCHAR(255),
ADD COLUMN payment_error TEXT;

-- Add comment to describe the payment_error column
COMMENT ON COLUMN public.orders.payment_error IS 'Stores any error messages or bank messages related to payment failures'; 