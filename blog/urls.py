"""blog URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.shortcuts import render
from django.conf import settings
import os

def dfs(path):
    l = os.listdir(path)
    res = ""
    for x in l:
        y = os.path.join(path,x)
        idname = y.replace('/','_')
        if os.path.isdir(y):
#            strr = " onclick='plusminus(this,\'%s\')' %s" % (y, x) 
#            return "<p>%s</p>" % strr
            res = res + "<dd><p><span onclick=\"plusminus(this,\'%s\')\">+</span>%s</p>" % (idname,x)
            res = res + "<dl id=\"%s\" style=\"display:none\">" % idname
            res = res + dfs(y)
            res = res + "</dl></dd>"
    return res


def getdir():
    return {'articlemenu':"<dl>"+dfs(os.path.join(settings.BASE_DIR,'static/documents'))+"</dl>"}

urlpatterns = [
    url(r'^home/', lambda request:render(request,'home.html',getdir())),
]
