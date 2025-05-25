import { Link } from 'react-router-dom';
import SignUpForm from '../components/auth/SignUpForm';

export default function SignUpPage() {
  return (
    <div>
      <SignUpForm />
      <p className='mt-4 text-center text-sm text-gray-600'>
        Already have an account?{' '}
        <Link
          to='/login'
          className='font-medium text-indigo-600 hover:text-indigo-500'
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
