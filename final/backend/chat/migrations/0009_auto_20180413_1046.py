# Generated by Django 2.0.3 on 2018-04-13 02:46

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0008_auto_20180413_0946'),
    ]

    operations = [
        migrations.RenameField(
            model_name='message',
            old_name='username',
            new_name='key',
        ),
    ]