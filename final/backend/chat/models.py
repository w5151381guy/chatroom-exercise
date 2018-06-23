from __future__ import unicode_literals
from django.db import models
from django.utils import timezone

class Room(models.Model):

    # name = models.TextField()
    # name      = models.CharField(max_length=100, default="房間名稱")
    # gameId    = models.CharField(max_length=100, default="")
    label     = models.SlugField(unique=True)
    # teacher   = models.CharField(max_length=20)
    # closed    = models.BooleanField(default=False) 
    # nTeam     = models.IntegerField(default=5)
    timestamp = models.DateTimeField(default=timezone.now, db_index=True)

    @property
    def formatted_timestamp(self):
        return self.timestamp.strftime('%b %d %I:%M %p')

    def __unicode__(self):
        return self.label

class Message(models.Model):

    room      = models.ForeignKey(Room, on_delete=models.CASCADE, related_name='messages')
    key       = models.CharField(max_length=20, default='')
    usertype  = models.CharField(max_length=20, default='') # ['teacher', 'team', 'system']
    username  = models.CharField(max_length=20, default='')
    msgtype   = models.CharField(max_length=20, default='text')
    text      = models.TextField()
    timestamp = models.DateTimeField(default=timezone.now, db_index=True)

    def __unicode__(self):
        return '[{timestamp}] {handle}: {message}'.format(**self.as_dict())

    @property
    def formatted_timestamp(self):
        # return self.timestamp
        return self.timestamp.strftime('%b %d %I:%M %p')
    
    def as_dict(self):
        return {'handle': self.handle, 'message': self.message, 'timestamp': self.formatted_timestamp}
    
