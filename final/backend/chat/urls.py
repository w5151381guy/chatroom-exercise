"""chat URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import include, url
from . import views
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from system.views import login,logout,addUser,ReadGame,addGame,hello,Uploader,backup


urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^accounts/login/$',login),
    url(r'^accounts/logout/$',logout),
    url(r'^accounts/addUser/$',addUser),
    url(r'^game/(?P<GameName>\w+)/$',ReadGame),
    url(r'^backup/',backup),
    url(r'^addgame/$',addGame),
    url(r'Upload/media/$',Uploader,name='Upload Media File'),
    url(r'^$', views.about, name='about'),
    url(r'^new/$', views.new_room, name='new_room'),
    url(r'^(?P<label>[\w-]{,50})/$', views.chat_room, name='chat_room'),
]+static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)
