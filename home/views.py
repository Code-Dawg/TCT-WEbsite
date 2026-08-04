from django.shortcuts import render

# Create your views here.
def DisplayView(request):
    return render(request,'index.html')

def BodyView(request):
    return render(request,'home/body.html')
def MenuView(request):
    return render(request,'home/menu.html')
def AboutUsView(request):
    return render(request,'home/aboutus.html')
def LocationView(request):
    return render(request,'home/location.html')