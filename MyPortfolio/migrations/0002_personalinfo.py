# Generated by Django 5.1.2 on 2024-10-20 15:50

import ckeditor.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('MyPortfolio', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='PersonalInfo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fname', models.CharField(max_length=50, verbose_name='First Name')),
                ('lname', models.CharField(max_length=50, verbose_name='Last Name')),
                ('about', ckeditor.fields.RichTextField(verbose_name='About Me')),
            ],
        ),
    ]
