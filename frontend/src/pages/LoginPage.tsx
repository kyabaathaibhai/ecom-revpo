import { Link } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';

export default function LoginPage() {
  return (
    <div>
      <LoginForm />
      <p className='mt-4 text-center text-sm text-gray-600'>
        Don't have an account?{' '}
        <Link
          to='/signup'
          className='font-medium text-indigo-600 hover:text-indigo-500'
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}
