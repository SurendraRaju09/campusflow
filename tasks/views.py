from datetime import timedelta

from django.db.models import Count, Q
from django.utils.timezone import now
from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Task
from .serializers import TaskSerializer


# ✅ TASK CRUD (already perfect)
class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all().order_by("-created_at")
    serializer_class = TaskSerializer


# ✅ STATS + ANALYTICS (FINAL VERSION 🔥)
class StatsView(APIView):
    def get(self, request):
        tasks = Task.objects.all()

        total_tasks = tasks.count()
        completed_tasks = tasks.filter(completed=True).count()
        pending_tasks = total_tasks - completed_tasks

        productivity_score = 0
        if total_tasks > 0:
            productivity_score = int((completed_tasks / total_tasks) * 100)

        # 🔥 WEEKLY ANALYTICS DATA
        weekly_data = []
        for i in range(6, -1, -1):
            day = now() - timedelta(days=i)

            count = Task.objects.filter(
                completed=True,
                updated_at__date=day.date()
            ).count()

            weekly_data.append({
                "date": day.strftime("%d %b"),
                "completed": count
            })

        return Response({
            "total_tasks": total_tasks,
            "completed_tasks": completed_tasks,
            "pending_tasks": pending_tasks,
            "productivity_score": productivity_score,
            "weekly_data": weekly_data
        })


# ✅ AI PLANNER (SIMPLE VERSION 🤖)
class AiPlanView(APIView):
    def post(self, request):
        query = request.data.get("query", "")

        response_text = (
            "Day 1: Plan your week and list priorities.\n"
            "Day 2: Focus on the most urgent assignment and do 2 hours of deep work.\n"
            "Day 3: Finish remaining tasks and revise everything.\n"
            "Tip: Use Pomodoro (25min focus + 5min break)."
        )

        if isinstance(query, str) and query.strip():
            response_text = f"Plan for: {query.strip()}\n\n{response_text}"

        return Response(
            {"response": response_text},
            status=status.HTTP_200_OK
        )