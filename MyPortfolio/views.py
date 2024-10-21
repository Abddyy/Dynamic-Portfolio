from django.shortcuts import render

from MyPortfolio.models import Project, Banner


def home(request):
    projects = Project.objects.all()
    banner = Banner.objects.first()
    context = {'projects': projects, 'banner': banner}

    return render(request, 'pages/home.html', context)


def about(request):
    return render(request, 'pages/about.html')


def portfolio(request):
    return render(request, 'pages/portfolio.html')


def contact(request):
    return render(request, 'pages/contact.html')
