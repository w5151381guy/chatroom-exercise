# Generated by Django 2.0.5 on 2018-06-22 14:21

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0017_auto_20180621_1150'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='image',
            name='room',
        ),
        migrations.RemoveField(
            model_name='team',
            name='room',
        ),
        migrations.RemoveField(
            model_name='room',
            name='closed',
        ),
        migrations.RemoveField(
            model_name='room',
            name='gameId',
        ),
        migrations.RemoveField(
            model_name='room',
            name='nTeam',
        ),
        migrations.RemoveField(
            model_name='room',
            name='name',
        ),
        migrations.RemoveField(
            model_name='room',
            name='teacher',
        ),
        migrations.DeleteModel(
            name='Image',
        ),
        migrations.DeleteModel(
            name='Team',
        ),
    ]
