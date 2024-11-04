from MyPortfolio.models import PersonalInfo
def personal_info(request):
    personal_info = PersonalInfo.objects.first()
    return {
    'personal_info': personal_info,
}
