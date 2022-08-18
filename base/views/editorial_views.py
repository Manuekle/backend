from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from base.models import Editorials
from base.serializers import EditorialSerializer

from rest_framework import status

@api_view(['GET'])
def getEditorial(request):
    query = request.query_params.get('keyword')
    if query == None:
        query = ''
        
    editorials = Editorials.objects.filter(
        name__icontains=query).order_by('-createdAt')

    serializer = EditorialSerializer(editorials, many=True)
    return Response(serializer.data)
