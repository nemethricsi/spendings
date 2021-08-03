from django.db import models
from django.utils.translation import gettext_lazy as _
from django.utils import timezone


class Spending(models.Model):
    class Currency(models.TextChoices):
        HUF = 'HUF', _('Hungarian Forint')
        USD = 'USD', _('American Dollar')
        EUR = 'EUR', _('Euro')

    description = models.CharField(max_length=255)
    amount = models.FloatField()
    date = models.DateTimeField(default=timezone.now, blank=True)
    currency = models.CharField(
        max_length=3,
        choices=Currency.choices
    )
    created = models.DateTimeField(auto_now_add=True)
    last_updated = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['amount',]

    def __str__(self):
        if self is None:
            return f'None'
        else:
            return self.description