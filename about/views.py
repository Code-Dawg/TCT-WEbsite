from django.shortcuts import render

def AboutUsView(request):
    """Render the cozy About Us & Story page."""
    return render(request, 'about/aboutus.html')
