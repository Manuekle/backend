from django.urls import path
from base.views import editorial_views as views

urlpatterns = [

    path('', views.getEditorial, name="editorial-products"),

]