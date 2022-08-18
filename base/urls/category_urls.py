from django.urls import path
from base.views import category_views as views

urlpatterns = [

    path('', views.getCategory, name="category-products"),

]