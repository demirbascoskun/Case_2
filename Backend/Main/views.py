from rest_framework.generics import ListCreateAPIView,RetrieveAPIView
from .models import StoragePerUser
from .serializer import StoragePerUserSerializer
from .permissions import FileOwnerCheck
from rest_framework import response
import pandas as pd



def get_sales_revenue(path,category,yearmonth):

    df = pd.read_excel(path)
    df=df[(df['CATEGORY LEVEL3'] == str(category)) & (df['YEARMONTH'] == int(yearmonth))]
    df = df['SALES REVENUE']
    sum = df.sum()
    avarage = df.mean()
    return sum,avarage

def get_unique_values(path):

    df = pd.read_excel(path)
    category_unique=df['CATEGORY LEVEL3'].unique()
    yearmonth_unique=df['YEARMONTH'].unique()
    return category_unique,yearmonth_unique

class ListorCreateExcelFile(ListCreateAPIView):
    serializer_class = StoragePerUserSerializer

    def get_queryset(self):
        user = self.request.user
        queryset = StoragePerUser.objects.filter(user_id=user.id)
        return queryset

    def perform_create(self, serializer):
        serializer.save(user_id = self.request.user.id)

class RetrieveExcelFileAndAnalyze(RetrieveAPIView):
    permission_classes=[FileOwnerCheck,]
    queryset = StoragePerUser.objects.all()
    serializer_class = StoragePerUserSerializer

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        category_unique,yearmonth_unique=get_unique_values(serializer.data['file'])
        return response.Response({"data":serializer.data,"category_unique":category_unique,'yearmonth_unique':yearmonth_unique})

class CalculateSalesRevenueOfExcel(RetrieveAPIView):
    permission_classes=[FileOwnerCheck,]
    queryset = StoragePerUser.objects.all()
    serializer_class = StoragePerUserSerializer

    def retrieve(self, request, *args, **kwargs):
        category = request.GET.get('category', None)
        yearmonth = request.GET.get('yearmonth', None)
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        sum,avarage = (get_sales_revenue(serializer.data['file'],category,yearmonth))
        return response.Response({"sales_revenue_sum":sum,'sales_revenue_avarage':avarage})