# Generated by Django 3.1.4 on 2022-09-03 20:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0007_auto_20220903_1958'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='product',
            name='currency',
        ),
        migrations.RemoveField(
            model_name='product',
            name='price_gross_amount',
        ),
        migrations.RemoveField(
            model_name='product',
            name='price_net_amount',
        ),
        migrations.AddField(
            model_name='product',
            name='price',
            field=models.DecimalField(blank=True, decimal_places=2, default=0, max_digits=6, null=True),
        ),
    ]
