from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Customer
from .serializers import CustomerSerializer
import json

# Create your views here.
@csrf_exempt
def register(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get('username')
            password = data.get('password')
            email = data.get('email')
            fullname = data.get('fullname')
            address = data.get('address')
            province = data.get('province')
            post_code = data.get('post_code')
            tel = data.get('tel')
            
            # Create user
            user = User.objects.create_user(username=username, password=password, email=email)
            
            # Create customer profile
            customer = Customer.objects.create(
                user=user,
                fullname=fullname,
                address=address,
                province=province,
                post_code=post_code,
                tel=tel
            )
            
            return JsonResponse({'status': 'success', 'message': 'User registered successfully'}, status=201)
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=400)
    
    return JsonResponse({'status': 'error', 'message': 'Only POST method is allowed'}, status=405)

class CustomerView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        try:
            customer = Customer.objects.get(user=request.user)
            serializer = CustomerSerializer(customer)
            return Response(serializer.data)
        except Customer.DoesNotExist:
            return Response({'status': 'error', 'message': 'Customer profile not found'}, status=404)
