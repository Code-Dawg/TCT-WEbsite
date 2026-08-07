from django.shortcuts import render

def MenuView(request):
    """Render the cozy cutting tea menu page."""
    return render(request, 'menu/menu.html')
