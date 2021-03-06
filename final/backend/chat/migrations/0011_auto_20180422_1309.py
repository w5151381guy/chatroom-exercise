# Generated by Django 2.0.3 on 2018-04-22 05:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0010_message_username'),
    ]

    operations = [
        migrations.RenameField(
            model_name='message',
            old_name='message',
            new_name='text',
        ),
        migrations.AddField(
            model_name='message',
            name='usertype',
            field=models.CharField(default='', max_length=20),
        ),
        migrations.AddField(
            model_name='team',
            name='inRoom',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='message',
            name='key',
            field=models.CharField(default='', max_length=20),
        ),
    ]
