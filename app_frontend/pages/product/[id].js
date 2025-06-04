import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

export default function ProductDetail() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:3341/api/products/${id}/`);
        
        if (response.ok) {
          const data = await response.json();
          setProduct(data);
        } else {
          setError('ไม่พบสินค้าที่ต้องการ');
        }
      } catch (error) {
        setError('เกิดข้อผิดพลาด: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

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
      <div className="max-w-6xl mx-auto px-4">
        {product && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2">
                <div className="relative h-96 w-full">
                  {product.image_url ? (
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <p className="text-gray-500">ไม่มีรูปภาพ</p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="md:w-1/2 p-8">
                <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                  รหัสสินค้า: {product.id}
                </div>
                <h1 className="mt-2 text-3xl font-bold text-gray-900">{product.name}</h1>
                <p className="mt-4 text-xl text-gray-900">฿{product.price.toLocaleString()}</p>
                
                <div className="mt-4">
                  <span className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {product.stock > 0 ? `มีสินค้า ${product.stock} ชิ้น` : 'สินค้าหมด'}
                  </span>
                </div>
                
                <div className="mt-6">
                  <h2 className="text-lg font-medium text-gray-900">รายละเอียด</h2>
                  <p className="mt-2 text-gray-600">{product.description}</p>
                </div>
                
                <div className="mt-8">
                  <button
                    className={`w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline ${product.stock === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={product.stock === 0}
                  >
                    เพิ่มลงตะกร้า
                  </button>
                </div>
              </div>
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