#!/usr/bin/python3
""" BaseCaching module
"""

from basecaching import BaseCaching


class BasicCache(BaseCaching):
    """implement the needed caching methods
    """

    def put(self, key, item):
        """add item to the cache store
        """
        if key and item:
            self.cache_data[key] = item

    def get(self, key):
        """retrieve an item based on specify key
        """
        return self.cache_data.get(key, None)
