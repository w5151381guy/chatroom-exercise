from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
from .models import Room
import json
from django.utils import timezone
import datetime

class ChatConsumer(WebsocketConsumer):

    # def __init__(self):
    #   self.username = ''

    def connect(self):
        print("websocket connect")
        self.room_label = self.scope['url_route']['kwargs']['room_label']
        self.username = self.scope['url_route']['kwargs']['username']
        self.room_group_name = 'chat_%s' % self.room_label
        print('username: ' + self.username)
        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )
        # Accepts the WebSocket connection
        self.accept()

        if not Room.objects.filter(label=self.room_label).exists():
            Room.objects.create(label=self.room_label)
        room = Room.objects.get(label=self.room_label)
      
    #   if room.teams.filter(name=self.username).exists():
        #   room.teams.filter(name=self.username).update(inRoom=True)
        room.messages.create(usertype="system", username=self.username, text=self.username+'加入聊天室')
    
        # 用在前端更新管理頁面的 trigger
        # async_to_sync(self.channel_layer.group_send)(
        #     self.room_group_name,
        #     {
        #         'type': 'join_message',
        #     #   'key': team.key,
        #         'usertype': 'system',
        #         'username': team.name,
        #         'note': team.note
        #     }
        # )
      
      # 回傳所有聊天訊息
        messages = room.messages.order_by('timestamp')
        msgList = []
        for message in messages:
            # print(message.timestamp.strftime("%H:%M"))
            print(message)
            msgList.append({
                # 'key': message.key,
                'usertype': message.usertype,
                'username': message.username,
                # 'msgtype': message.msgtype,
                'text':  message.text,
                'timestamp': message.timestamp.strftime("%H:%M")
            })

        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'init_message',
                'messages': msgList
            }
        )

    # receive message from websocket and send message to group
    def receive(self, text_data):
        data = json.loads(text_data)
        msg_type = data['type']     # ['chat', 'init', 'leave']
        usertype = data['usertype'] # ['teacher', 'team', 'system']
        username = data['username']
        text     = data['text']
        label    = data['label']


        if msg_type == 'chat':
            room = Room.objects.get(label=label)
            msg = room.messages.create(usertype=usertype, username=username, text=text)
            async_to_sync(self.channel_layer.group_send)(
                self.room_group_name,
                {
                    'type': 'chat_message',
                    'usertype': usertype,
                    'username': username,
                    'text': text,
                    'timestamp': msg.timestamp.strftime("%H:%M")
                }
            )

    def disconnect(self, close_code):

        msg = None
        room = Room.objects.get(label=self.room_label)
        room.messages.create(usertype='system', text=self.username+'離開聊天室')
        

        # Leave room group
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    def init_message(self, event):

        # Send message to WebSocket
        self.send(text_data=json.dumps({
            'type': 'init',
            'messages': event['messages'],
        }))

    # Receive message from room group
    def chat_message(self, event):
        
        # Send message to WebSocket
        print('chat_message')
        self.send(text_data=json.dumps({
            'type': 'chat',
            'message': {
              'usertype': event['usertype'],
              'username': event['username'],
              'text': event['text'],
              'timestamp': event['timestamp']
            }
        }))

    def leave_message(self, event):

        # Send message to WebSocket
        self.send(text_data=json.dumps({
            'type': 'leave',
            'message': {
              'usertype': event['usertype'],
              'username': event['username'],
              'text': event['text'],
              'timestamp': event['timestamp']
            }
        }))

    def join_message(self, event):

        # Send message to WebSocket
        self.send(text_data=json.dumps({
            'type': 'join',
            'message': {
            #   'key': event['key'],
              'usertype': event['usertype'],
              'username': event['username'],
            #   'note': event['note']
            }
        }))
