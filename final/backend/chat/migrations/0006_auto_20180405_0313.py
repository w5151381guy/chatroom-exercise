# Generated by Django 2.0.3 on 2018-04-04 19:13

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0005_auto_20180403_2251'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='room',
            name='teams',
        ),
        migrations.RemoveField(
            model_name='team',
            name='room_label',
        ),
        migrations.AddField(
            model_name='team',
            name='room',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, related_name='teams', to='chat.Room'),
        ),
        migrations.AddField(
            model_name='team',
            name='timestamp',
            field=models.DateTimeField(db_index=True, default=django.utils.timezone.now),
        ),
        migrations.AlterField(
            model_name='room',
            name='isActive',
            field=models.BooleanField(default=True),
        ),
    ]
