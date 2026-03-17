from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TaskViewSet, StatsView, AiPlanView

router = DefaultRouter()
router.register(r'tasks', TaskViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('stats/', StatsView.as_view()),
    path('ai/plan/', AiPlanView.as_view()),
]