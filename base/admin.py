from django.contrib import admin
from .models import *
# Register your models here.

admin.site.register(Product)
admin.site.register(Categories)
admin.site.register(Editorials)
admin.site.register(Review)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(ShippingAddress)
