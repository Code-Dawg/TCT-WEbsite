from django import forms

from .models import GalleryPhoto


class GalleryPhotoForm(forms.ModelForm):
    class Meta:
        model = GalleryPhoto
        fields = ('caption', 'image')
        widgets = {
            'caption': forms.TextInput(attrs={'placeholder': 'Short caption (optional)', 'maxlength': 120}),
            'image': forms.ClearableFileInput(attrs={'accept': 'image/jpeg,image/png,image/webp'}),
        }
