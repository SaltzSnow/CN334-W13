from django.urls import path
from . import views

urlpatterns = [
    path('byProductId/<int:product_id>/', views.OrderByProductView.as_view(), name='orders_by_product'),
    path('summarize/', views.SummaryView.as_view(), name='order_summary'),
] 