from django.conf.urls import url
from . import views
from django.conf import settings
from django.conf.urls.static import static



urlpatterns = [
  url(r'^$', views.index, name='index'),
  # url(r'^new/$', views.new_room, name='new_room'),
  # url(r'^getAllRooms/$', views.get_all_rooms),
  # # url(r'^updateRoom/$', views.update_room),
  # url(r'^authRoom/$', views.auth_room),
  # url(r'^getTeams/$', views.get_teams),
  # url(r'^closeGame/$', views.close_game),
  # url(r'upload/$', views.uploader, name='Upload Media File'),
  # url(r'^(?P<room_label>[^/]+)/$', views.room, name='room'),
] #+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
