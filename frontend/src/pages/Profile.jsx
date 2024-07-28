import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser, deleteUser, logout } from '../store/slices/authSlice';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';


const Profile = () => {
  const dispatch = useDispatch();
  const { user, email, role, id, isLoading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: email || '',
    oldPassword: '',
    newPassword: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateUser(formData))
      .unwrap()
      .then(() => {
        toast.success('Profile updated successfully!');
      })
      .catch(() => {
        toast.error('Failed to update profile.');
      });
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete your account?')) {
      dispatch(deleteUser())
        .unwrap()
        .then(() => {
          toast.success('Account deleted successfully!');
        })
        .catch(() => {
          toast.error('Failed to delete account.');
        });
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <>
    <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Profile</h1>
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700">Old Password</label>
            <input
              type="password"
              id="oldPassword"
              name="oldPassword"
              value={formData.oldPassword}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">New Password</label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-500 text-white py-2 px-4 rounded-md"
          >
            {isLoading ? 'Updating...' : 'Update Profile'}
          </button>
        </form>
        <button
          onClick={handleDelete}
          className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md"
        >
          Delete Account
        </button>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
