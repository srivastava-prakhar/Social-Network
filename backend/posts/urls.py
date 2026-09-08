
from django.urls import path
from .views import PostListCreateView, PostDeleteView, LikeToggleView, DislikeToggleView

urlpatterns = [
    path('', PostListCreateView.as_view(), name='posts'),
    path('<int:pk>/', PostDeleteView.as_view(), name='post-delete'),
    path('<int:post_id>/like/', LikeToggleView.as_view(), name='post-like'),
    path('<int:post_id>/dislike/', DislikeToggleView.as_view(), name='post-dislike'),
]
