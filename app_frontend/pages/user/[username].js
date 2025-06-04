import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function UserDetail() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();
  const { username } = router.query;

  useEffect(() => {
    if (!username) return;

    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:3342/api/user/${username}/`);
        
        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          setError('ไม่พบข้อมูลผู้ใช้');
        }
      } catch (error) {
        setError('เกิดข้อผิดพลาด: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [username]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-96 text-center">
          <p className="text-gray-600">กำลังโหลดข้อมูล...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <div className="p-3 mb-4 rounded bg-red-100 text-red-700">
            {error}
          </div>
          <button
            onClick={() => router.push('/')}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            กลับหน้าหลัก
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-3xl mx-auto px-4">
        {user && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-8">
              <div className="flex items-center mb-6">
                <div className="bg-blue-100 rounded-full p-3 mr-4">
                  <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{username}</h1>
                  <p className="text-gray-600">{user.email}</p>
                </div>
              </div>
              
              {user.customer_data && (
                <div className="border-t pt-6 mt-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">ข้อมูลส่วนตัว</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-gray-500">ชื่อ-นามสกุล</p>
                      <p className="font-medium">{user.customer_data.fullname}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500">เบอร์โทรศัพท์</p>
                      <p className="font-medium">{user.customer_data.tel}</p>
                    </div>
                    
                    <div className="md:col-span-2">
                      <p className="text-sm text-gray-500">ที่อยู่</p>
                      <p className="font-medium">{user.customer_data.address}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500">จังหวัด</p>
                      <p className="font-medium">{user.customer_data.province}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500">รหัสไปรษณีย์</p>
                      <p className="font-medium">{user.customer_data.post_code}</p>
                    </div>
                  </div>
                </div>
              )}
              
              {!user.customer_data && (
                <div className="border-t pt-6 mt-6">
                  <div className="bg-yellow-50 text-yellow-800 p-4 rounded-md">
                    ผู้ใช้นี้ยังไม่ได้กรอกข้อมูลส่วนตัว
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        
        <div className="mt-6">
          <button
            onClick={() => router.push('/')}
            className="text-blue-500 hover:text-blue-700 font-medium"
          >
            &larr; กลับไปหน้าหลัก
          </button>
        </div>
      </div>
    </div>
  );
} 