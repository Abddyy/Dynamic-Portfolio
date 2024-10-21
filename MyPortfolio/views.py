from django.shortcuts import render

from MyPortfolio.models import Project


def home(request):
    projects = Project.objects.all()
    context = {'projects': projects}
    return render(request, 'pages/home.html', context)


def about(request):
    return render(request, 'pages/about.html')


def portfolio(request):
    return render(request, 'pages/portfolio.html')


def contact(request):
    return render(request, 'pages/contact.html')
