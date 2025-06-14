from django.db import models
from django.contrib.auth.models import User

class Customer(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    fullname = models.CharField(max_length=100)
    address = models.TextField()
    province = models.CharField(max_length=100)
    post_code = models.CharField(max_length=10)
    tel = models.CharField(max_length=20)

    def __str__(self):
        return self.fullname
