from django.core.exceptions import ValidationError
from django.db import models


MAX_UPLOAD_SIZE = 5 * 1024 * 1024


def validate_cafe_photo(upload):
    """Allow only common raster-image files up to 5 MB."""
    if upload.size > MAX_UPLOAD_SIZE:
        raise ValidationError('Please choose a photo smaller than 5 MB.')

    header = upload.read(12)
    upload.seek(0)
    is_jpeg = header.startswith(b'\xff\xd8\xff')
    is_png = header.startswith(b'\x89PNG\r\n\x1a\n')
    is_webp = header.startswith(b'RIFF') and header[8:12] == b'WEBP'
    if not (is_jpeg or is_png or is_webp):
        raise ValidationError('Please upload a JPG, PNG, or WebP photo.')


class GalleryPhoto(models.Model):
    caption = models.CharField(max_length=120, blank=True)
    image = models.FileField(upload_to='gallery/%Y/%m/%d/', validators=[validate_cafe_photo])
    is_approved = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.caption or f'Cafe photo #{self.pk}'


CATEGORY_CHOICES = [
    ('announcement', 'Announcement 📢'),
    ('blog', 'Blog / Article 📝'),
    ('moment', 'Cafe Moment 📸'),
]


class CafePost(models.Model):
    title = models.CharField(max_length=200)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='moment')
    content = models.TextField(blank=True, help_text="Story, blog text, or announcement details.")
    image = models.FileField(upload_to='gallery/%Y/%m/%d/', validators=[validate_cafe_photo], blank=True, null=True)
    is_pinned = models.BooleanField(default=False, help_text="Pin to top announcement banner")
    is_published = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-is_pinned', '-created_at']

    def __str__(self):
        return f"[{self.get_category_display()}] {self.title}"

