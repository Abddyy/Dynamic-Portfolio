# Generated by Django 5.1.2 on 2024-10-21 18:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('MyPortfolio', '0002_personalinfo'),
    ]

    operations = [
        migrations.AlterField(
            model_name='project',
            name='image',
            field=models.ImageField(upload_to='images/'),
        ),
    ]
