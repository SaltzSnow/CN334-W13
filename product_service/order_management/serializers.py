from rest_framework import serializers
from .models import Order
from product_management.serializers import ProductSerializer

class OrderSerializer(serializers.ModelSerializer):
    product_detail = ProductSerializer(source='product', read_only=True)
    
    class Meta:
        model = Order
        fields = ['id', 'customer_username', 'product', 'product_detail', 'quantity', 'total_price', 'status', 'shipping_address', 'created_at', 'updated_at']

class OrderSummarySerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.name', read_only=True)
    
    class Meta:
        model = Order
        fields = ['id', 'customer_username', 'product_name', 'quantity', 'total_price', 'status', 'created_at'] 