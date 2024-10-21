from django.db import models
from ckeditor.fields import RichTextField

class Project(models.Model):
    title = models.CharField(max_length=200)
    image = models.ImageField(upload_to='images/')

    def str(self):
        return self.title


class PersonalInfo(models.Model):
    fname = models.CharField(max_length=50, verbose_name='First Name')
    lname = models.CharField(max_length=50, verbose_name='Last Name')
    about = RichTextField(verbose_name='About Me')

    def str(self):
        return f"{self.fname} {self.lname}"
