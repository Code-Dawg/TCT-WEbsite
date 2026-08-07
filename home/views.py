from django.contrib import messages
from django.shortcuts import redirect, render

from .forms import GalleryPhotoForm
from .models import GalleryPhoto

def DisplayView(request):
    """Render main home landing page."""
    return render(request, 'index.html')

def BodyView(request):
    """Render legacy body view if requested."""
    return render(request, 'home/body.html')


def GalleryView(request):
    """Show approved cafe photos and accept photo submissions."""
    if request.method == 'POST':
        form = GalleryPhotoForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            messages.success(request, 'Thanks for sharing! Your photo will appear after approval.')
            return redirect('gallery')
    else:
        form = GalleryPhotoForm()

    photos = GalleryPhoto.objects.filter(is_approved=True)
    return render(request, 'gallery.html', {'form': form, 'photos': photos})
