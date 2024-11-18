import {Link} from 'react-router-dom'
import { useAuthContext } from '../../hooks/useAuth'
import { useFormContext } from '../../hooks/useForm';

const Navbar = () => {
    const {isAuthenticated} = useAuthContext();
    const {setFormDiv} = useFormContext();

  return (
    <>
      <nav className='bg-blue-950 flex justify-between px-5 py-3 items-center text-white'>
      <h1 className='font-semibold text-xl md:text-2xl'>Blog App</h1>
      <ul className='flex gap-5'>
        <li className='font-semibold md:text-lg'>
            <Link to='/' onClick={() => setFormDiv(false)}>Home</Link>
        </li>
       
       {isAuthenticated ? <li className='font-semibold md:text-lg'><Link to='/profile'>Profile</Link></li> : <li className='font-semibold md:text-lg'>
        <Link to='/login'>Login</Link>
        </li>}
      </ul>
    </nav>
    </>
  )
}

export default Navbar
