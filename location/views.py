from django.shortcuts import render

def LocationView(request):
    """Render the Pokhara outlets location & map page."""
    return render(request, 'location/location.html')
