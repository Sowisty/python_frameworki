from django.db import models

class Game(models.Model):
    title = models.CharField(max_length=100, null=True)
    content = models.CharField(max_length=255,  null=True)
    file = models.FileField(upload_to='games/')

    def __str__(self):
        return f"{self.title}"