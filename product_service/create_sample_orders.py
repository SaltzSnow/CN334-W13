import os
import django
import random
from datetime import datetime, timedelta

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'product_service.settings')
django.setup()

from product_management.models import Product
from order_management.models import Order

def create_sample_orders():
    products = Product.objects.all()
    if not products:
        print("ไม่พบสินค้าในระบบ กรุณาสร้างสินค้าก่อน")
        return
    
    usernames = ['user1', 'admin', 'john_doe', 'jane_smith', 'bob_johnson']
    
    statuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled']
    
    Order.objects.all().delete()
    print("ลบออเดอร์เก่าทั้งหมด")
    
    for i in range(1, 21):
        product = random.choice(products)
        quantity = random.randint(1, 5)
        total_price = product.price * quantity
        username = random.choice(usernames)
        status = random.choice(statuses)
        days_ago = random.randint(0, 30)
        order_date = datetime.now() - timedelta(days=days_ago)
        
        addresses = [
            "123 ถนนสุขุมวิท แขวงคลองเตย เขตคลองเตย",
            "456 ถนนสีลม แขวงสีลม เขตบางรัก",
            "789 ถนนพหลโยธิน แขวงจตุจักร เขตจตุจักร",
            "321 ถนนรัชดาภิเษก แขวงดินแดง เขตดินแดง",
            "654 ถนนเพชรเกษม แขวงบางแค เขตบางแค"
        ]
        shipping_address = random.choice(addresses)
        
        order = Order(
            customer_username=username,
            product=product,
            quantity=quantity,
            total_price=total_price,
            status=status,
            shipping_address=shipping_address
        )
        
        order.created_at = order_date
        order.save()
        
        print(f"สร้างออเดอร์ #{i} - สินค้า: {product.name}, ลูกค้า: {username}, จำนวน: {quantity}, ราคารวม: {total_price}")
    
    print(f"สร้างออเดอร์ตัวอย่างทั้งหมด 20 รายการ")

if __name__ == "__main__":
    create_sample_orders()