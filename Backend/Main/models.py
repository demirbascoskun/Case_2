from django.db import models
from django.contrib.auth import get_user_model

UserModel = get_user_model()

class StoragePerUser(models.Model):
    user = models.ForeignKey(UserModel,on_delete=models.CASCADE)
    file = models.FileField(upload_to='excel_files')
    created_time = models.DateTimeField(auto_now_add=True,null=True)