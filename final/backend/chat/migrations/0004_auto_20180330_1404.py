# Generated by Django 2.0.3 on 2018-03-30 06:04

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0003_room_team'),
    ]

    operations = [
        migrations.RenameField(
            model_name='room',
            old_name='team',
            new_name='teams',
        ),
    ]
