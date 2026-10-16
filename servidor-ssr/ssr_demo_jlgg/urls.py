"""
URL configuration for ssr_demo_jlgg project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include  # include() nos deja "delegar" rutas a otra app

urlpatterns = [
    path('admin/', admin.site.urls),

    # Todo lo que no sea /admin/ se delega al urls.py de la app "catalogo_jlgg"
    path('', include('catalogo_jlgg.urls')),
]
