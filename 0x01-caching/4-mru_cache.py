#!/usr/bin/python3
"""A Simple recency-based cache replacement policy"""
from base_caching import BaseCaching


class MRUCache(BaseCaching):
    """implement the needed caching methods using MRU Algorithm
    """
    def __init__(self):
        """created a new queue data struct
        """
        super().__init__()
        self.mru = []
        self.ptr = len(self.mru) - 1

    def put(self, key, item):
        """add item to the cache store
        """
        if key and item:
            if len(self.mru) >= self.MAX_ITEMS:
                discard = self.mru.pop(self.ptr)
                self.cache_data.pop(discard)
                print(f'DISCARD: {discard}')
                self.ptr = self.ptr - 1 if self.ptr >= 0 else len(self.mru)
            self.cache_data[key] = item
            self.mru.append(key)

    def get(self, key):
        """retrieve an item based on specify key
        """
        return self.cache_data.get(key)
