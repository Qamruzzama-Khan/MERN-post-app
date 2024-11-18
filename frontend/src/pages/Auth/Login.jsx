import { Link } from "react-router-dom"
import { useState } from "react";
import { loginUser } from "../../services/api";
import { useAuthContext } from "../../hooks/useAuth"

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const { dispatch } = useAuthContext();
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(formData);
      setFormData({ username: '', password: '' })
      dispatch({ type: 'LOGIN', payload: response.data.data })
      localStorage.setItem('user', JSON.stringify(response.data.data))
    } catch (error) {
      setError(error.response.data.message)
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 py-10 px-4">

      {/* Form Section */}
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username Input */}
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            placeholder="Username"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold"
          />

          {/* Password Input */}
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold"
          />

          {error && <div className="text-red-600 text-lg">
            {error}...!
          </div>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-950  text-white rounded-lg hover:bg-blue-800  transition duration-200 font-semibold"
          >
            Login
          </button>
          <div>
            <span>If you don't have an account ? </span>
            <Link to='/signup'><strong>signup</strong></Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
