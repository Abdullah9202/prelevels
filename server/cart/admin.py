# Djano imports
from django.contrib import admin
from django.contrib.admin import RelatedOnlyFieldListFilter
# My Files
from .models import Cart

# Cart with Admin
class CartAdmin(admin.ModelAdmin):
    # Displaying fields and filters
    list_display = ('get_username', 'get_category', 'get_product_name', 'quantity', 'get_price', 'get_total_price')
    list_filter = (('user', RelatedOnlyFieldListFilter),) 

    def get_username(self, obj):
        return obj.user.username
    
    def get_category(self, obj):
        return obj.content_object.category

    def get_product_name(self, obj):
        return obj.content_object.name

    def get_price(self, obj):
        return obj.content_object.price

    def get_total_price(self, obj):
        return obj.get_total_price()

    get_username.short_description = 'Username'
    get_category.short_description = 'Category'
    get_product_name.short_description = 'Product Name'
    get_price.short_description = 'Price'
    get_total_price.short_description = 'Total Price'

admin.site.register(Cart, CartAdmin)
