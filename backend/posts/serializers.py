
from rest_framework import serializers
from .models import Post

class PostSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)
    like_count = serializers.SerializerMethodField()
    dislike_count = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ('id','user','image','description','created_at','like_count','dislike_count')

    def get_like_count(self, obj):
        return obj.like_count()
    def get_dislike_count(self, obj):
        return obj.dislike_count()
