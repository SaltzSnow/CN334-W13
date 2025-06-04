from django.db import models
from product_management.models import Product

# Create your models here.
class Order(models.Model):
    ORDER_STATUS = (
        ('pending', 'รอดำเนินการ'),
        ('processing', 'กำลังดำเนินการ'),
        ('shipped', 'จัดส่งแล้ว'),
        ('delivered', 'ส่งถึงแล้ว'),
        ('cancelled', 'ยกเลิก')
    )
    
    customer_username = models.CharField(max_length=150)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='orders')
    quantity = models.PositiveIntegerField(default=1)
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, choices=ORDER_STATUS, default='pending')
    shipping_address = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"Order #{self.id} - {self.customer_username} - {self.product.name}"
