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
from django.urls import path
# My Files
from student import api as std_api
from hello import api as hello_api
from questionbank import api as questionbank_api
from course import api as course_api
from bundle import api as bundle_api

urlpatterns = [
    path('admin/', admin.site.urls),
    # Hello API URLs
    path('api/hello/', hello_api.api.urls),
    # Student API URLs
    path('api/student/', std_api.api.urls),
    # Question Bank API URLs
    path('api/questionbank/', questionbank_api.api.urls),
    # Course API URLs
    path('api/course/', course_api.api.urls),
    # Bundle API URLs
    path('api/bundle/', bundle_api.api.urls),
]
