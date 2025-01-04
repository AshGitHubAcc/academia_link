
import { useState } from 'react';
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';
import STATES_UNIVERSITIES from '../states_universities';
import { useNavigate } from 'react-router';

export default function Register() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    state: "",
    university: ""
  });
  const [errors, setErrors] = useState({});
  const [suggestions, setSuggestions] = useState([]);
  const [universitySuggestions, setUniversitySuggestions] = useState([]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = "Email is required";
    }
    else if (!formData.email.includes('@') || !formData.email.endsWith('.edu'))
      newErrors.email = "Email has to contain '@' and end with '.edu'";

    if (!formData.name) {
      newErrors.name = "Name is required";
    } else if (formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8 || !(/\d/.test(formData.password)))
      newErrors.password = "Password must be at least 8 characters and contain numbers";

    if (!formData.state) {
      newErrors.state = "Select a state";
    }

    if (!formData.university) {
      newErrors.university = "Select a university";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'state' ? { university: '', universitySuggestions: [] } : {})
    }));

    if (name === 'state') {
      const matchedStates = value ? Object.keys(STATES_UNIVERSITIES).filter(state => state.toLowerCase().includes(value.toLowerCase())) : [];
      setSuggestions(matchedStates);
    } else if (name === 'university') {
      const matchedUniversities = formData.state ? STATES_UNIVERSITIES[formData.state].filter(uni => uni.toLowerCase().includes(value.toLowerCase())) : [];
      setUniversitySuggestions(matchedUniversities);
    }

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await api.post('/api/register/', formData)
        console.log('Registration Successful', response.data);
        navigate('/login')
      } catch (error) {
        if (error.response) {
          const errorMessage = error.response.data.message || 'Registration failed';
          console.log("Error: ", errorMessage);
        } else {
          console.log("Network error:", error);
        }
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-gray-700">
      <div className="w-full max-w-2xl p-8 bg-gray-400 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.email && (
                <p className="text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.name && (
                <p className="text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.password && (
                <p className="text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                State
              </label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                list="states"
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <datalist id="states">
                {suggestions.map(state => (
                  <option key={state} value={state} />
                ))}
              </datalist>
              {errors.state && (
                <p className="text-sm text-red-600">{errors.state}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                University
              </label>
              <input
                type="text"
                name="university"
                value={formData.university}
                onChange={handleChange}
                list="universities"
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                disabled={!formData.state}
              />
              <datalist id="universities">
                {universitySuggestions.map(uni => (
                  <option key={uni} value={uni} />
                ))}
              </datalist>
              {errors.university && (
                <p className="text-sm text-red-600">{errors.university}</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
