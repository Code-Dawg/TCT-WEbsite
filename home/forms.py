from django import forms

from .models import GalleryPhoto, CafePost


class GalleryPhotoForm(forms.ModelForm):
    class Meta:
        model = GalleryPhoto
        fields = ('caption', 'image')
        widgets = {
            'caption': forms.TextInput(attrs={
                'placeholder': 'Add a caption or memory (e.g. Chai time at Nadipur!)',
                'class': 'form-control',
                'maxlength': 120
            }),
            'image': forms.ClearableFileInput(attrs={
                'accept': 'image/jpeg,image/png,image/webp',
                'class': 'form-control',
                'required': True
            }),
        }


class CafePostForm(forms.ModelForm):
    class Meta:
        model = CafePost
        fields = ('title', 'category', 'content', 'image', 'is_pinned')
        widgets = {
            'title': forms.TextInput(attrs={'placeholder': 'Post Title or Headline', 'class': 'form-control', 'required': True}),
            'category': forms.Select(attrs={'class': 'form-control'}),
            'content': forms.Textarea(attrs={'placeholder': 'Write your announcement, blog story, or photo description here...', 'rows': 4, 'class': 'form-control'}),
            'image': forms.ClearableFileInput(attrs={'accept': 'image/jpeg,image/png,image/webp', 'class': 'form-control'}),
            'is_pinned': forms.CheckboxInput(attrs={'class': 'form-check-input'}),
        }

