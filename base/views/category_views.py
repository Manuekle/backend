from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from base.models import Categories
from base.serializers import CategorySerializer

from rest_framework import status

@api_view(['GET'])
def getCategory(request):
    query = request.query_params.get('keyword')
    if query == None:
        query = ''
        
    categories = Categories.objects.filter(
        name__icontains=query).order_by('-createdAt')

    serializer = CategorySerializer(categories, many=True)
    return Response(serializer.data)
