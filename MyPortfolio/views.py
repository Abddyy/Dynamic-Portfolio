from gc import get_objects

from django.shortcuts import render, get_object_or_404

from MyPortfolio.models import Project, Banner, PersonalInfo
from Portfolio.context_processor import personal_info


def home(request):
    projects = Project.objects.all()
    banner = get_object_or_404(Banner, page='home')
    personal_info_object = PersonalInfo.objects.first()
    context = {
        'projects': projects,
        'banner': banner,
        'personal_info_object': personal_info_object
    }

    return render(request, 'pages/main_page.html', context)


def about(request):
    banner = get_object_or_404(Banner, page='about')

    return render(request, 'pages/../templates/basecomp/about_me.html', {'banner': banner})


def portfolio(request):
    banner = get_object_or_404(Banner, page='portfolio')

    return render(request, 'pages/portfolio.html', {'banner': banner})


def contact(request):
    banner = get_object_or_404(Banner, page='contact')
    return render(request, 'pages/contact_me.html', {'banner': banner})
