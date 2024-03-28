import { useState } from 'react';
import axios from 'axios';
const Registration = () => {
  const [reg, setReg] = useState(0);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    phoneNumber: '',
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

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (formData.username.length <= 5) {
      setFormData({
        ...formData,
        errorMessage: 'Username must be more than 5 characters.'
      });
    } else if (formData.password.length <= 6) {
      setFormData({
        ...formData,
        errorMessage: 'Password must be more than 6 characters.'
      });
    } else if (formData.password !== formData.confirmPassword) {
      setFormData({
        ...formData,
        errorMessage: 'Passwords do not match.'
      });
    } else if (formData.phoneNumber.length !== 11) {
      setFormData({
        ...formData,
        errorMessage: 'Phone number must have exactly 11 digits.'
      });
    } else {
      // Form submission logic (can be added here)
      const response = await axios.post('http://localhost:8000/register', {
        email: formData.email, username: formData.username, password: formData.password, phone_number:formData.phoneNumber
      });
      //console.log('Form submitted:', formData);
      console.log(response)
      setReg(1);

      // Reset form fields and registration state after 2 seconds
      setTimeout(() => {
        setFormData({
          username: '',
          password: '',
          confirmPassword: '',
          email: '',
          phoneNumber: '',
          errorMessage: ''
        });
        setReg(0);
      }, 2000);
    }
  };

  return (
    <div className='border border-black w-2/3 mx-auto p-12 rounded-xl'>
      <h2 className='text-4xl font-bold text-black'>Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <div className='mt-12 flex flex-row gap-4 justify-center'>
          <label className='text-xl'>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            className='text-xl border border-gray-400 px-2 rounded-xl'
            onChange={handleChange}
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
          <label className='text-xl'>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className='text-xl border border-gray-400 px-2 rounded-xl'
          />
        </div>
        <div className='mt-6 flex flex-row gap-4 justify-center'>
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
          <label className='text-xl'>Phone Number:</label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className='text-xl border border-gray-400 px-2 rounded-xl'
          />
        </div>
        <div className='mt-6 flex flex-row gap-4 justify-center'>
          {formData.errorMessage && <p style={{ color: 'red' }}>{formData.errorMessage}</p>}
          <button type="submit" className='btn btn-primary text-white'>Register</button>
        </div>
        {reg && <p>Successfully Registered!</p>}
      </form>
    </div>
  );
};

export default Registration;
