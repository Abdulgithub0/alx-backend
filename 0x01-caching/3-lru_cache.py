#!/usr/bin/python3
"""A Simple recency-based cache replacement policy"""
from base_caching import BaseCaching


class LRUCache(BaseCaching):
    """implement the needed caching methods using LRU Algorithm
    """
    def __init__(self):
        """created a new queue data struct
        """
        super().__init__()
        self.lru = []
        self.ptr = 0

    def put(self, key, item):
        """add item to the cache store
        """
        if key and item:
            if len(self.lru) >= self.MAX_ITEMS:
                discard = self.lru.pop(self.ptr)
                self.cache_data.pop(discard)
                print(f'DISCARD: {discard}')
                self.ptr = self.ptr + 1 if self.ptr < self.MAX_ITEMS - 1 else 0
            self.cache_data[key] = item
            self.lru.append(key)

    def get(self, key):
        """retrieve an item based on specify key
        """
        return self.cache_data.get(key)
