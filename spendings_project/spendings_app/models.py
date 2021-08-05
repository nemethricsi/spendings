from django.db import models
from django.utils.translation import gettext_lazy as _
from django.utils import timezone


class Spending(models.Model):
    class Currency(models.TextChoices):
        HUF = 'HUF', _('Hungarian Forint')
        USD = 'USD', _('American Dollar')

    description = models.CharField(max_length=255)
    amount = models.IntegerField()
    date = models.DateTimeField(default=timezone.now, blank=True)
    currency = models.CharField(
        max_length=3,
        choices=Currency.choices
    )
    created = models.DateTimeField(auto_now_add=True)
    last_updated = models.DateTimeField(auto_now=True)
    amount_in_huf = models.IntegerField(default=0, editable=False)

    class Meta:
        ordering = ['-date',]

    def __str__(self):
        if self is None:
            return f'None'
        else:
            return self.description