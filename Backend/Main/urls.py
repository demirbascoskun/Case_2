from django.urls import path
from .views import ListorCreateExcelFile,RetrieveExcelFileAndAnalyze,CalculateSalesRevenueOfExcel


urlpatterns = [
    path('files', ListorCreateExcelFile.as_view()),
    path('files/<int:pk>',RetrieveExcelFileAndAnalyze.as_view()),
    path('files/<int:pk>/filter',CalculateSalesRevenueOfExcel.as_view()),



]
