# Generated by Django 2.0.3 on 2018-03-30 05:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0002_message'),
    ]

    operations = [
        migrations.AddField(
            model_name='room',
            name='team',
            field=models.TextField(default=''),
        ),
    ]
