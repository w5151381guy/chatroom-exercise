# Generated by Django 2.0.3 on 2018-05-21 13:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0014_remove_image_team'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='room',
            name='isActive',
        ),
        migrations.AddField(
            model_name='room',
            name='closed',
            field=models.BooleanField(default=False),
        ),
    ]
