-- Create admin_users table
CREATE TABLE admin_users (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin(user_id UUID)
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM admin_users WHERE user_id = $1
  );
$$ LANGUAGE sql SECURITY DEFINER;

-- Add RLS policies
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Allow admins to view admin_users
CREATE POLICY "Allow admins to view admin_users"
  ON admin_users
  FOR SELECT
  USING (
    is_admin(auth.uid())
  );

-- Allow admins to insert admin_users
CREATE POLICY "Allow admins to insert admin_users"
  ON admin_users
  FOR INSERT
  WITH CHECK (
    is_admin(auth.uid())
  );

-- Allow admins to delete admin_users
CREATE POLICY "Allow admins to delete admin_users"
  ON admin_users
  FOR DELETE
  USING (
    is_admin(auth.uid())
  );

-- Allow the first user to become admin
CREATE POLICY "Allow first user to become admin when no admins exist"
  ON admin_users
  FOR INSERT
  WITH CHECK (
    NOT EXISTS (SELECT 1 FROM admin_users)
  ); 