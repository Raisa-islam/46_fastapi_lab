import { useState } from 'react';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    errorMessage: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      errorMessage: ''
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation, you can add more complex validation if needed
    if (!formData.email || !formData.password) {
      setFormData({
        ...formData,
        errorMessage: 'Please fill in all fields.'
      });
    } else {
      // Form submission logic (can be added here)
      console.log('Form submitted:', formData);
    }
  };

  return (
    <div className='border border-black w-2/3 mx-auto p-12 rounded-xl'>
      <h2 className='text-4xl font-bold text-black'>Login Form</h2>
      <form onSubmit={handleSubmit}>
        <div className='mt-12 flex flex-row gap-4 justify-center'>
          <label className='text-xl'>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className='text-xl border border-gray-400 px-2 rounded-xl'
          />
        </div>
        <div className='mt-6 flex flex-row gap-4 justify-center'>
          <label className='text-xl'>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className='text-xl border border-gray-400 px-2 rounded-xl'
          />
        </div>
        <div className='mt-6 flex flex-row gap-4 justify-center'>
          {formData.errorMessage && <p style={{ color: 'red' }}>{formData.errorMessage}</p>}
          <button type="submit" className='btn btn-primary text-white'>Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
