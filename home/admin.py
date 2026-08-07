from django.contrib import admin

from .models import GalleryPhoto


@admin.register(GalleryPhoto)
class GalleryPhotoAdmin(admin.ModelAdmin):
    list_display = ('caption', 'is_approved', 'created_at')
    list_filter = ('is_approved', 'created_at')
    search_fields = ('caption',)
    actions = ('approve_photos',)

    @admin.action(description='Approve selected photos')
    def approve_photos(self, request, queryset):
        queryset.update(is_approved=True)
