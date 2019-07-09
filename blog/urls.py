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
from django.shortcuts import render,HttpResponse
from django.conf import settings
import os
from datetime import datetime, timezone, timedelta

def dfs(path):
    l = os.listdir(path)
    for x in l:
        y = os.path.join(path,x)
        if os.path.isfile(y) and os.path.basename(y).split('.')[1]=='md':
            idname = (y.split('.')[0]).replace('/','_')
            res = "<dd><p onclick=\"plusminus(this,\'%s\')\"><span>+</span>%s</p>" % (idname, os.path.basename(path))
            res = res + "<dl id=\"%s\" style=\"display:none\">" % idname
    for x in l:
        y = os.path.join(path,x)
        if os.path.isdir(y):
            res = res + dfs(y)
    res = res + "</dl></dd>"
    return res


def getdir():
    res = "<dl>"
    path = "static/documents"
    l = os.listdir(path)
    for x in l:
        y = os.path.join(path, x)
        if os.path.isdir(y):
            res = res + dfs(y)
    res = res + "</dl>"
    return {'articlemenu':res}

def save(request, path):
    timestr = datetime.utcnow().replace(tzinfo=timezone.utc).astimezone(timezone(timedelta(hours=8))).strftime("%Y%m%d%H%M%S")
    path = path.replace('_', '/')
    path = os.path.join(settings.BASE_DIR,path+'.md')
    os.remove(path)
    path = os.path.join(os.path.dirname(path), 'index%s.md'%timestr)
    f = request.POST.get('file')
    with open(path, 'w') as F:
        F.write(f)
    return HttpResponse(path)

def display(request, path):
    path = path.replace('_', '/')
    path = os.path.join(settings.BASE_DIR,path+'.md')
    with open(path, 'r') as F:
        f = F.read()
    return render(request,'article.html',{'content':f})

urlpatterns = [
    url(r'^home/', lambda request:render(request,'home.html',getdir())),
    url(r'^save/(\w+)', save),
    url(r'^article/(\w+)', display),
]
