from django.shortcuts import render

# Create your views here.
def index(request):
    return render(request, 'index.html')

def about(request):
    return render(request, 'about.html')

def snake(request):
    return render(request, 'snake.html')

def tetris(request):
    return render(request, 'tetris.html')

def tictac(request):
    return render(request, 'tictac.html')

def meris(request):
    return render(request, 'meris.html')

def eagler(request):
    return render(request, 'eagler.html')

def unity(request):
    return render(request, 'unity.html')


