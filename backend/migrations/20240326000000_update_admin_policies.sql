-- Drop existing policies
DROP POLICY IF EXISTS "Allow admins to view admin_users" ON admin_users;
DROP POLICY IF EXISTS "Allow admins to insert admin_users" ON admin_users;
DROP POLICY IF EXISTS "Allow admins to delete admin_users" ON admin_users;
DROP POLICY IF EXISTS "Allow first user to become admin when no admins exist" ON admin_users;

-- Drop existing function if it exists
DROP FUNCTION IF EXISTS is_admin(UUID);

-- Create function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin(user_id UUID)
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM admin_users WHERE user_id = $1
  );
$$ LANGUAGE sql SECURITY DEFINER;

-- Add new policies
CREATE POLICY "Allow admins to view admin_users"
  ON admin_users
  FOR SELECT
  USING (
    is_admin(auth.uid())
  );

CREATE POLICY "Allow admins to insert admin_users"
  ON admin_users
  FOR INSERT
  WITH CHECK (
    is_admin(auth.uid())
  );

CREATE POLICY "Allow admins to delete admin_users"
  ON admin_users
  FOR DELETE
  USING (
    is_admin(auth.uid())
  );

CREATE POLICY "Allow first user to become admin when no admins exist"
  ON admin_users
  FOR INSERT
  WITH CHECK (
    NOT EXISTS (SELECT 1 FROM admin_users)
  ); 