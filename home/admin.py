from django.contrib import admin

from .models import GalleryPhoto, CafePost


@admin.register(GalleryPhoto)
class GalleryPhotoAdmin(admin.ModelAdmin):
    list_display = ('caption', 'is_approved', 'created_at')
    list_filter = ('is_approved', 'created_at')
    search_fields = ('caption',)
    actions = ('approve_photos',)

    @admin.action(description='Approve selected photos')
    def approve_photos(self, request, queryset):
        queryset.update(is_approved=True)


@admin.register(CafePost)
class CafePostAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'is_pinned', 'is_published', 'created_at')
    list_filter = ('category', 'is_pinned', 'is_published', 'created_at')
    search_fields = ('title', 'content')
    actions = ('publish_posts', 'unpublish_posts', 'pin_posts', 'unpin_posts')

    @admin.action(description='Publish selected posts')
    def publish_posts(self, request, queryset):
        queryset.update(is_published=True)

    @admin.action(description='Unpublish selected posts')
    def unpublish_posts(self, request, queryset):
        queryset.update(is_published=False)

    @admin.action(description='Pin selected announcements to top')
    def pin_posts(self, request, queryset):
        queryset.update(is_pinned=True)

    @admin.action(description='Unpin selected announcements')
    def unpin_posts(self, request, queryset):
        queryset.update(is_pinned=False)

