from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Sum, Count
from .models import Order
from .serializers import OrderSerializer, OrderSummarySerializer

# Create your views here.
class OrderByProductView(APIView):
    def get(self, request, product_id):
        orders = Order.objects.filter(product_id=product_id)
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)

class SummaryView(APIView):
    def get(self, request):
        total_orders = Order.objects.count()
        
        total_sales = Order.objects.aggregate(total=Sum('total_price'))['total'] or 0
        
        status_breakdown = Order.objects.values('status').annotate(count=Count('id'))
        
        top_products_by_quantity = Order.objects.values(
            'product__id', 
            'product__name'
        ).annotate(
            total_quantity=Sum('quantity')
        ).order_by('-total_quantity')[:5]
        
        top_products_by_revenue = Order.objects.values(
            'product__id', 
            'product__name'
        ).annotate(
            total_revenue=Sum('total_price')
        ).order_by('-total_revenue')[:5]
        
        top_customers = Order.objects.values(
            'customer_username'
        ).annotate(
            order_count=Count('id'),
            total_spent=Sum('total_price')
        ).order_by('-total_spent')[:5]
        
        summary_data = {
            'total_orders': total_orders,
            'total_sales': total_sales,
            'status_breakdown': list(status_breakdown),
            'top_products_by_quantity': list(top_products_by_quantity),
            'top_products_by_revenue': list(top_products_by_revenue),
            'top_customers': list(top_customers)
        }
        
        return Response(summary_data)
