from django.shortcuts import render
from django.views.decorators.http import require_POST,require_GET
from django.utils.safestring import mark_safe
from django.http import HttpResponse, JsonResponse
from django.db import transaction
from .models import Room
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
import random
import string
import json
import os
from django.conf import settings
from google.cloud import storage


media_dir = 'chat/media/'
SERVER_IP = settings.SERVER_IP
SERVER_PORT = settings.SERVER_PORT

@require_GET
def index(request):
    return HttpResponse("Test~")

# @require_POST
# def auth_room(request):

#     key  = request.POST.get('key')
#     name = request.POST.get('team_name')
#     note = request.POST.get('note')
#     team = Team.objects.filter(key=key)
    
#     if team :
#         team = team[0]
#         room  = team.room
#         teams = room.teams.all()  # all teams in the room
#         closed = room.closed

#         if closed:
#             return JsonResponse({'res':'遊戲未開啟'}, status=403)
#         for t in teams:
#             if name == t.name and not(key == t.key):
#                 return JsonResponse({'res':'隊伍名稱已存在'}, status=403)
#         # if name == room.teacher:
#         if User.objects.filter(username=name).exists():
#             return JsonResponse({'res': '不可與老師名稱重複'}, status=403)


#         if not team.name or team.name == name:
#             Team.objects.filter(key=key).update(name=name)
#             if note:
#                 Team.objects.filter(key=key).update(note=note)               
#             res_team = {'key':key, 'name':name, 'note':note}
#             return JsonResponse({'res':'歡迎進入遊戲', 'label':room.label, 'team':res_team}, status=200)
#         else:
#             return JsonResponse({'res':'隊伍名稱錯誤'}, status=403)

#     return JsonResponse({'res':'遊戲金鑰錯誤'}, status=403)

# create a new room by teacher
# def new_room(request):

#     token = request.POST.get('token')
#     if not Token.objects.filter(key=token).exists():
#         return JsonResponse({'msg': '您沒有權限使用此功能'}, status=403)

#     rName    = request.POST.get("roomName")
#     gameId   = request.POST.get("gameId")
#     teacher  = request.POST.get("teacher")
#     nTeam    = int(request.POST.get("nTeam"))
#     label    = ""
#     new_room = None

#     # create a new room without duplicate label
#     while not new_room:
#         with transaction.atomic():
#             label = ''.join(random.choices(string.ascii_lowercase + string.digits, k=8))
#             if Room.objects.filter(label=label).exists():
#                 continue
#             new_room = Room.objects.create(name=rName, teacher=teacher, label=label, gameId=gameId, nTeam=nTeam)
    
#     # create nTeam keys for the room
#     n = 0
#     keys = []
#     while n < nTeam:
#         with transaction.atomic():
#           key = label + '-' + ''.join(random.choices(string.ascii_lowercase + string.digits, k=4))
#           if not Team.objects.filter(key=key).exists():
#               Team.objects.create(room=new_room, key=key)
#               keys.append(key)
#               n += 1

#     res = {
#       'name': new_room.name,
#       'closed': new_room.closed==1,
#       'teacher': new_room.teacher,
#       'label': new_room.label,
#       'keys': keys,
#       'nTeam': new_room.nTeam,
#       'gameId': new_room.gameId,
#       'keyToTeam': {keys[i]:{'name':'', 'note':''} for i in range(len(keys))},
#       'teams': ['' for i in range(len(keys))],
#       'timestamp': new_room.timestamp.strftime("%Y-%m-%d")
#     }
#     return JsonResponse(res, status=200)

# @require_POST
# def close_game(request):

#     token = request.POST.get('token')
#     if not Token.objects.filter(key=token).exists():
#         return JsonResponse({'msg': '您沒有權限關閉此遊戲'}, status=403)
    
#     label = request.POST.get("label")
#     Room.objects.filter(label=label).update(closed=True)
#     return HttpResponse("遊戲已關閉") 

# @require_POST
# def get_all_rooms(request):

#     # token 認證
#     token = request.POST.get('token')
#     if not Token.objects.filter(key=token).exists():
#         return JsonResponse({'msg': '您沒有權限訪問此頁面'}, status=403)

#     userId = Token.objects.get(key=token).user_id
#     user = User.objects.get(id=userId)
#     rooms = []
#     # super user(老闆)可以看到所有的房間資訊 
#     # 其他人只能看到自己建立的房間資訊
#     if user.is_superuser: 
#         rooms = Room.objects.all().order_by('-timestamp')
#     else:
#         rooms = Room.objects.filter(teacher=user.username).order_by('-timestamp')

#     res = []
#     for room in rooms:
#         teams = room.teams.all()
#         keys, teamname = [], []
#         keyToTeam = {}
#         for team in teams:
#             keys.append(team.key)
#             teamname.append(team.name)
#             keyToTeam[team.key] = {
#               'name': team.name,
#               'progress': 0,
#               'note': team.note
#             }
          
#         res.append({
#           'name': room.name,
#           'closed': room.closed==1,
#           'teacher': room.teacher,
#           'label': room.label,
#           'keys': keys,
#           'nTeam': room.nTeam,
#           'gameId': room.gameId,
#           'keyToTeam': keyToTeam,
#           'teams': teamname,
#           'timestamp': room.timestamp.strftime("%Y-%m-%d")
#         })
#     return JsonResponse({"rooms":res}, status=200)

# # 取得指定房間的隊伍
# @require_POST
# def get_teams(request):

#     label = request.POST.get('label')
#     room  = Room.objects.get(label=label)
#     teams = room.teams.all().order_by('timestamp')
#     res = []
#     for team in teams:
#         res.append({
#           'name': team.name
#         })
#     return JsonResponse({"teams":res}, status=200)


# @require_POST
# def uploader(request):

#     print(request.FILES)
#     if request.FILES['file']:
#         fileToUpload = request.FILES['file']

#         label = request.POST.get('label') # room label
#         fileType = request.POST.get('fileType','another')
#         try:
#             room = Room.objects.get(label=label)
#             name = ''.join(random.choices(string.digits, k=15))
#             while Image.objects.filter(room=room, name=name).exists() :
#                 name = ''.join(random.choices(string.digits, k=15))
#             name += '.' + fileToUpload.name.split('.')[-1]

#             # url  =  handle_uploaded_file(local_file, name, label, fileType)
#             google_url = gcp(fileToUpload, name, label, fileType)
#             print(google_url)
#             Image.objects.create(room=room, name=name, url=google_url)
#             return JsonResponse({'url': google_url, 'name': name, 'type': fileType}, status=200)
#         except Exception as e:
#             print(str(e))
#             return HttpResponse('File Save Error', status=403)
#     else:
#         return HttpResponse('QQ error Upload', status=403)





# def gcp(fileToUpload, name, label, fileType):

#     # initial GCP
#     # client = storage.Client('digiedu')
#     client = storage.Client.from_service_account_json('digiedu_gcp.json')
#     bucket = client.get_bucket('digiedu')
#     assert bucket.exists()
    
#     path = 'chatroom/' + label + '/' + fileType + '/' + name
#     blob = bucket.blob(path)
#     blob.upload_from_file(fileToUpload, content_type=fileToUpload.content_type)
#     blob.make_public()
#     url = blob.public_url

#     # if isinstance(url,six.binary_type):
#     #     url = url.decode('utf-8')
#     return url
    




# def handle_uploaded_file(file, name, label, fileType): # ensure that large file doesn't overwhelm memory    
#     path = media_dir + label + '/' + fileType + '/' 
#     os.makedirs(path, exist_ok=True)
#     print(name)
#     with open(path + name,'wb+') as destination:
#         for chunk in file.chunks():
#             destination.write(chunk)
    
#     url = "http://" + SERVER_IP + ":" + SERVER_PORT + "/"

#     return url + path + name
    # http://127.0.0.1:8000/chat/media/label/image/xxxxxm.jpg