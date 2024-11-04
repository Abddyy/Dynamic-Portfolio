from cloudinary.models import CloudinaryField
from django.db import models
from ckeditor.fields import RichTextField


class Project(models.Model):
    title = models.CharField(max_length=200)
    image = models.ImageField(upload_to='images/')

    def str(self):
        return self.title

class Banner(models.Model):
    PAGE_CHOICES = [
        ('home', 'Home'),
        ('about', 'About'),
        ('contact', 'Contact'),
        ('portfolio', 'Portfolio'),
    ]

    page = models.CharField(max_length=20, choices=PAGE_CHOICES, unique=True,blank=True)
    image = CloudinaryField('image', null=True, blank=True)
    alt_text = models.CharField(max_length=255,blank=True)

    def str(self):
        return f"Banner for {self.get_page_display()}"


class PersonalInfo(models.Model):
    fname = models.CharField(max_length=50, verbose_name='First Name')
    lname = models.CharField(max_length=50, verbose_name='Last Name')
    about = RichTextField(verbose_name='About Me')
    email = models.EmailField(blank=True)
    phone = models.CharField(max_length=15, blank=True)
    address = models.CharField(max_length=200, blank=True)
    city = models.CharField(max_length=50, blank=True)
    image = CloudinaryField('images', null=True, blank=True)
    resume = CloudinaryField('images', null=True, blank=True)
    facebook = models.URLField(blank=True)
    linkedin = models.URLField(blank=True)
    github = models.URLField(blank=True)
    instagram = models.URLField(blank=True)

    def str(self):
        return f"{self.fname} {self.lname}"
