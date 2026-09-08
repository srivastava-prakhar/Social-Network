
from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Post
from .serializers import PostSerializer
from django.shortcuts import get_object_or_404

class PostListCreateView(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = PostSerializer

    def get_queryset(self):
        return Post.objects.all().order_by('-created_at')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class PostDeleteView(generics.DestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    def delete(self, request, *args, **kwargs):
        post = self.get_object()
        if post.user != request.user:
            return Response({'detail':'Not allowed'}, status=status.HTTP_403_FORBIDDEN)
        return super().delete(request, *args, **kwargs)

class LikeToggleView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, post_id):
        post = get_object_or_404(Post, id=post_id)
        user = request.user
        if user in post.likes.all():
            post.likes.remove(user)
        else:
            post.likes.add(user)
            post.dislikes.remove(user)
        return Response({'likes': post.like_count(), 'dislikes': post.dislike_count()})

class DislikeToggleView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, post_id):
        post = get_object_or_404(Post, id=post_id)
        user = request.user
        if user in post.dislikes.all():
            post.dislikes.remove(user)
        else:
            post.dislikes.add(user)
            post.likes.remove(user)
        return Response({'likes': post.like_count(), 'dislikes': post.dislike_count()})
