# Generated by Django 2.0.3 on 2018-04-13 01:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0007_team_note'),
    ]

    operations = [
        migrations.RenameField(
            model_name='team',
            old_name='team_id',
            new_name='key',
        ),
        migrations.AlterField(
            model_name='team',
            name='name',
            field=models.CharField(default='', max_length=20),
        ),
        migrations.AlterField(
            model_name='team',
            name='note',
            field=models.TextField(default=''),
        ),
    ]
