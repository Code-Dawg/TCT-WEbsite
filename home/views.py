from django.shortcuts import render


def DisplayView(request):
    """Render main home landing page."""
    return render(request, 'index.html')


def BodyView(request):
    """Render legacy body view if requested."""
    return render(request, 'home/body.html')


