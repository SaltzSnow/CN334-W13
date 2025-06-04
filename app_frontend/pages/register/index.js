import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    fullname: '',
    address: '',
    province: '',
    post_code: '',
    tel: ''
  });
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    
    try {
      const response = await fetch('http://localhost:3342/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setMessage('ลงทะเบียนสำเร็จ! กำลังนำคุณไปยังหน้าเข้าสู่ระบบ...');
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      } else {
        setMessage(`เกิดข้อผิดพลาด: ${data.message || 'ไม่สามารถลงทะเบียนได้'}`);
      }
    } catch (error) {
      setMessage('เกิดข้อผิดพลาด: ' + error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">ลงทะเบียนผู้ใช้ใหม่</h1>
        
        {message && (
          <div className={`p-3 mb-4 rounded ${message.includes('สำเร็จ') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              ชื่อผู้ใช้ *
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              รหัสผ่าน *
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              อีเมล *
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullname">
              ชื่อ-นามสกุล *
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              id="fullname"
              name="fullname"
              type="text"
              value={formData.fullname}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
              ที่อยู่ *
            </label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              id="address"
              name="address"
              rows="3"
              value={formData.address}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="province">
              จังหวัด *
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              id="province"
              name="province"
              type="text"
              value={formData.province}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="post_code">
              รหัสไปรษณีย์ *
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              id="post_code"
              name="post_code"
              type="text"
              value={formData.post_code}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tel">
              เบอร์โทรศัพท์ *
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              id="tel"
              name="tel"
              type="tel"
              value={formData.tel}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              ลงทะเบียน
            </button>
            <a
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="/login"
            >
              มีบัญชีแล้ว? เข้าสู่ระบบ
            </a>
          </div>
        </form>
      </div>
    </div>
  );
} 