from django.urls import path
from . import views

urlpatterns = [
    path('', views.DisplayView, name='display'),
    path('body/', views.BodyView, name='body'),
    path('gallery/', views.GalleryView, name='gallery'),
]
