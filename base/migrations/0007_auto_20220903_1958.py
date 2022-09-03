# Generated by Django 3.1.4 on 2022-09-03 19:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0006_auto_20220816_2203'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='product',
            name='price',
        ),
        migrations.AddField(
            model_name='product',
            name='currency',
            field=models.CharField(default='COP', max_length=3),
        ),
        migrations.AddField(
            model_name='product',
            name='price_gross_amount',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=6),
        ),
        migrations.AddField(
            model_name='product',
            name='price_net_amount',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=6),
        ),
    ]