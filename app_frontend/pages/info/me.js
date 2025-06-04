import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function UserInfo() {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem('access_token');
        
        if (!token) {
          setError('กรุณาเข้าสู่ระบบก่อน');
          setTimeout(() => {
            router.push('/login');
          }, 2000);
          return;
        }
        
        const response = await fetch('http://localhost:3342/api/myinfo', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        
        if (response.ok) {
          const data = await response.json();
          setUserInfo(data);
        } else {
          if (response.status === 401) {
            setError('เซสชันหมดอายุ กรุณาเข้าสู่ระบบใหม่');
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            setTimeout(() => {
              router.push('/login');
            }, 2000);
          } else {
            setError('ไม่สามารถดึงข้อมูลได้');
          }
        }
      } catch (error) {
        setError('เกิดข้อผิดพลาด: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    router.push('/login');
  };

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
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">ข้อมูลผู้ใช้</h1>
        
        {userInfo && (
          <div className="space-y-4">
            <div className="border-b pb-2">
              <p className="text-sm text-gray-500">ชื่อ-นามสกุล</p>
              <p className="font-medium">{userInfo.fullname}</p>
            </div>
            
            <div className="border-b pb-2">
              <p className="text-sm text-gray-500">ที่อยู่</p>
              <p className="font-medium">{userInfo.address}</p>
            </div>
            
            <div className="border-b pb-2">
              <p className="text-sm text-gray-500">จังหวัด</p>
              <p className="font-medium">{userInfo.province}</p>
            </div>
            
            <div className="border-b pb-2">
              <p className="text-sm text-gray-500">รหัสไปรษณีย์</p>
              <p className="font-medium">{userInfo.post_code}</p>
            </div>
            
            <div className="border-b pb-2">
              <p className="text-sm text-gray-500">เบอร์โทรศัพท์</p>
              <p className="font-medium">{userInfo.tel}</p>
            </div>
            
            <div className="mt-6">
              <button
                onClick={handleLogout}
                className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                ออกจากระบบ
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 