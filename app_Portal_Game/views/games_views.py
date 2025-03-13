from django.shortcuts import render
from app_Portal_Game.models import Game

# Create your views here.
def games_index(request):
    games = Game.objects.all().order_by('-id')


    context = {
        'games': games,
    }

    return render(request, 'games_list.html', context)