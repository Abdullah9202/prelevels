"""
URL configuration for server project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
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
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
# My Files
from customuser import api as cuser_api
from questionbank.api import qb_api
from course.api import course_api
from bundle.api import bundle_api
from cart.api import cart_api
from custom_auth.api import auth_api

urlpatterns = [
    path('admin/', admin.site.urls),
    # Custom User API URLs
    path('api/customuser/', cuser_api.api.urls),
    # Question Bank API URLs
    path('api/questionbank/', qb_api.urls),
    # Course API URLs
    path('api/course/', course_api.urls),
    # Bundle API URLs
    path('api/bundle/', bundle_api.urls),
    # Cart API URLs
    path('api/cart/', cart_api.urls),
    # Auth API URLs
    path('api/auth/', auth_api.urls),
]


urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
