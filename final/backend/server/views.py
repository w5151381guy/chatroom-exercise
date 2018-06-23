from django.http import HttpResponse,JsonResponse,StreamingHttpResponse
from rest_framework.authtoken.models import Token
from django.views.decorators.http import require_POST,require_GET
from django.contrib.auth.models import User
from django.contrib import auth
import datetime
from .settings import BASE_DIR,DATABASES
import zipstream
import subprocess


@require_POST
def login(request):
        
    username = request.POST.get('username','') # 如果沒有這個key 則使用default
    password = request.POST.get('password','')
    
    user = auth.authenticate(username=username, password=password)
    token = None
    if user is None:
        if User.objects.filter(username=username).exists():
            return JsonResponse({'res':'密碼錯誤'}, status=403)
        return JsonResponse({'res':'使用者不存在'}, status=403)
    elif not user.is_active:
        return JsonResponse({'res':'使用者未啟動'}, status=403)
        # auth.login(request, user)
    token = Token.objects.get_or_create(user=user)
    
    res = {'token': str(token[0]), 'username': username, "admin": "false"}
    if user.is_superuser:
        res["admin"] = "true"

    # return HttpResponse('QQ error Upload', status=200)
    return JsonResponse(res, status=200)

@require_POST
def logout(request):
    auth.logout(request)
    return HttpResponse('success logout')

@require_POST
def backup(request):

    # only superuser can backup
    
    token = request.POST.get('token')
    if not Token.objects.filter(key=token).exists():
        return JsonResponse({'msg': '您沒有權限訪使用此功能'}, status=403)
    
    userId = Token.objects.get(key=token).user_id
    user = User.objects.get(id=userId)
    if not user.is_superuser:
        return JsonResponse({'msg': '您沒有權限訪使用此功能'}, status=403)

    Current_Y_M_D = datetime.datetime.now().strftime('%Y_%m_%d')
    db_name = DATABASES['default']['NAME']
    zip_name = Current_Y_M_D+'.zip'
    # backup_output = subprocess.check_output(
    #         [
    #             'mongodump',
    #             '-host', 'localhost',
    #             '-u', 'User Name',
    #             '-p', 'User passwd',
    #             '-d', 'DB name',
    #             '--port', '27017',
    #             '-o','Output file name'
    #         ])
    # Put mongodb filename to file_list
    file_list = [db_name, BASE_DIR + '/requirements.txt']
    
    myzip = zipstream.ZipFile(mode='w')
    for f in file_list:
        f = f.split('/')[-1]
        myzip.write(f)
    
    response = StreamingHttpResponse(myzip, content_type='application/zip')
    response['Content-Disposition'] = 'attachment; filename={}'.format(zip_name)
    return response
    