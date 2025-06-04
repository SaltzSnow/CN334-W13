from django.urls import path
from . import views

urlpatterns = [
    path('products/', views.ProductListView.as_view(), name='product_list'),
    path('products/<int:product_id>/', views.ProductDetailView.as_view(), name='product_detail'),
] 