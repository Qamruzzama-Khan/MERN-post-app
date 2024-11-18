import { Link, useNavigate } from "react-router-dom"
import { useState } from "react";
import { signupUser } from "../../services/api";

const Signup = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '', profileImage: null });
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsSubmitting(true);
            const formDataToSend = new FormData();
            Object.keys(formData).forEach(key => formDataToSend.append(key, formData[key]));
            await signupUser(formDataToSend);
            setFormData({ username: '', email: '', password: '', profileImage: null });
            setIsSubmitting(false);
            navigate('/login');
        } catch (error) {
            setError(error.response.data.message)
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 py-10 px-4">

            {/* Form Section */}
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Signup</h2>

                <form onSubmit={handleSubmit} className="space-y-4" >
                    <input type="text" name="username" onChange={handleChange} required placeholder="username" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold" />

                    <input type="email" name="email" onChange={handleChange} required placeholder="email" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold" />

                    <input type="password" name="password" onChange={handleChange} required placeholder="password" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold" />

                    <input type="file" name="profileImage" required onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />

                    {error && <div className="text-red-600 text-lg">
                        {error}...!
                    </div>}

                    <button type="submit" className="w-full py-3 bg-blue-950  text-white rounded-lg hover:bg-blue-800 transition duration-200 font-semibold" disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'Sign Up'}
                    </button>
                    <div>
                        <span>If you have an account ? </span>
                        <Link to='/login'><strong>login</strong></Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup
