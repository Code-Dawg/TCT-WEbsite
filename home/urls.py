from django.urls import path
from .import views
urlpatterns=[
    path('',views.DisplayView,name='display'),
    path('body/',views.BodyView,name='body'),
    path('menu/', views.MenuView, name='menu'),
    path('aboutus/', views.AboutUsView, name='aboutus'),
    path('location/', views.LocationView, name='location'),
]