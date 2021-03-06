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
import json
import shutil
from datetime import datetime, timezone, timedelta
import numpy as np

def dfs(path):
    l = os.listdir(path)
    l.sort()
    for x in l:
        y = os.path.join(path,x)
        if os.path.isfile(y) and os.path.basename(y).split('.')[1]=='md':
            idname = (y.split('.')[0]).replace('/','_')
            res = "<dd><p style=\"display:inline\" onclick=\"plusminus(this,\'%s\')\"><span>+</span>%s</p>" % (idname, os.path.basename(path))
            if idname=="static_documents_zwl_index": res = res + "<dl id=\"%s\" style=\"display:block\">" % idname
            else: res = res + "<dl id=\"%s\" style=\"display:none\">" % idname
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
    l.sort()
    for x in l:
        y = os.path.join(path, x)
        if os.path.isdir(y):
            res = res + dfs(y)
    res = res + "</dl>"
    return {'articlemenu':res}

def gettime():
    return datetime.utcnow().replace(tzinfo=timezone.utc).astimezone(timezone(timedelta(hours=8))).strftime("%Y%m%d%H%M%S")

def save(request, path):
    path = path.replace('_PlUs_', '+')
    timestr = gettime()
    path = path.replace('_', '/')
    os.remove(os.path.join(settings.BASE_DIR,path+'.md'))
    path = os.path.join(os.path.dirname(path), 'index%s'%timestr)
    f = request.POST.get('file')
    with open(os.path.join(settings.BASE_DIR,path+'.md'), 'w') as F:
        F.write(f)
    return HttpResponse(json.dumps({'path':path.replace('/','_')}))

def mkdir(request, path):
    path = path.replace('_PlUs_', '+')
    timestr = gettime()
    foldername = request.POST.get('foldername')
    path = path.replace('_', '/')
    path = os.path.join(os.path.dirname(path), foldername)
    if os.path.isdir(path): return HttpResponse(json.dumps({'content':'','status':'N'}))
    os.mkdir(path)
    path = os.path.join(path, 'index%s'%timestr)
    F = open(os.path.join(settings.BASE_DIR,path+'.md'),'w')
    F.close()
    path = path.replace('/', '_')
    res = "<dd><p style=\"display:inline\" onclick=\"plusminus(this,\'%s\')\"><span>+</span>%s</p>" % (path, foldername)
    res = res + "<dl id=\"%s\" style=\"display:none\">" % path + "</dl></dd>"
    return HttpResponse(json.dumps({'content':res, 'status':'Y'}))

def rmdir(request, path):
    path = path.replace('_PlUs_', '+')
    path = path.replace('_', '/')
    path = os.path.dirname(path)
    shutil.rmtree(path) #os.rmdir只能删除空文件夹
    return HttpResponse()

def rename(request, path):
    path = path.replace('_PlUs_', '+')
    path = path.replace('_', '/')
    path = os.path.dirname(path)
    foldername = request.POST.get('foldername')
    foldername = os.path.join(os.path.dirname(path), foldername)
    if os.path.isdir(foldername):
         return HttpResponse(json.dumps({'status':'N'}))
    os.rename(path, foldername)
    return HttpResponse(json.dumps({'status':'Y'}))

def display(request, path):
    path = path.replace('_PlUs_', '+')
    path = path.replace('_', '/')
    path = os.path.join(settings.BASE_DIR,path+'.md')
    with open(path, 'r') as F:
        f = F.read()
    return render(request,'article.html',{'content':f})

def androidappGet(request, path):
    path = os.path.join(settings.BASE_DIR,'static/androidapp/'+path+'.txt')
    with open(path, 'r') as F:
        f = F.read()
    return HttpResponse(json.dumps({'status':f}))

def dealjson(request, path):
    path = os.path.join(settings.BASE_DIR,'static/androidapp/'+path+'.json')
    if request.method == 'POST':
        with open(path, 'w') as F:
            json.dump(json.loads(request.body.decode()), F, ensure_ascii=False)
        return HttpResponse('success\n')
    elif request.method == 'GET':
        with open(path, 'r') as F:
            Dict = json.load(F)
        return HttpResponse(json.dumps(Dict, ensure_ascii=False)+'\n')

urlpatterns = [
    url(r'^home/', lambda request:render(request,'home.html',getdir())),
    url(r'^save/(\w+)', save),
    url(r'^mkdir/(\w+)', mkdir),
    url(r'^rmdir/(\w+)', rmdir),
    url(r'^rename/(\w+)', rename),
    url(r'^article/(\w+)', display),
    url(r'^androidapp/(\w+)', dealjson),
]
