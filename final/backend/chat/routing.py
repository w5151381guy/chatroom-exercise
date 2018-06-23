from django.conf.urls import url
from . import consumers

websocket_urlpatterns = [
    url(r'^ws/chat/(?P<room_label>[^/]+)/(?P<username>[^/]+)/$', consumers.ChatConsumer),
]