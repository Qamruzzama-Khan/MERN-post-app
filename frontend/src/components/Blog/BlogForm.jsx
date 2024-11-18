import { useFormContext } from "../../hooks/useForm";

const BlogForm = ({ onSubmitBlog }) => {
  const { form, setForm } = useFormContext();
  const { setFormDiv } = useFormContext();

  const handleCloseForm = (e) => {
    e.preventDefault();
    setFormDiv(false)
  }

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'blogImage') {
      setForm((prevForm) => ({
        ...prevForm,
        blogImage: files[0],
      }));
    } else {
      setForm((prevForm) => ({
        ...prevForm,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    { form._id ? onSubmitBlog.handleUpdateBlog(form._id, form) : onSubmitBlog.handleCreateBlog(form) }

    setForm({ title: '', desc: ''}); // Reset form
  };

  return (
    <div className="relative flex flex-col gap-6 items-center p-8 w-full md:w-[40%] lg:w-[30%] bg-white rounded-lg shadow-lg mx-auto max-w-md">

      {/* Form */}
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">

        {/* Title Input */}
        <input
          type="text" required
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Enter post title"
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        />

        {/* Description Input */}
        <textarea
          type="text" required
          name="desc"
          value={form.desc}
          onChange={handleChange}
          placeholder="Enter post description"
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-950 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-800 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Submit
        </button>

      </form>

      {/* Close Button */}
      <button onClick={handleCloseForm} className="absolute top-4 right-1 text-gray-600 hover:text-gray-900 transition duration-200">
        <span className="material-symbols-outlined text-3xl">close</span>
      </button>

    </div>
  );
};

export default BlogForm;