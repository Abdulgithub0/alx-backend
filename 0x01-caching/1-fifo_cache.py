#!/usr/bin/python3
"""A Simple queue-based page replacement policy"""
from base_caching import BaseCaching


class FIFOCache(BaseCaching):
    """implement the needed caching methods using FIFO Algorithm
    """
    def __init__(self):
        """created a new queue data struct
        """
        super().__init__()
        self.queue = []

    def put(self, key, item):
        """add item to the cache store
        """
        if key and item:
            if len(self.queue) >= self.MAX_ITEMS:
                discard = self.queue.pop(0)
                self.cache_data.pop(discard)
                print(f'DISCARD: {discard}')
            self.cache_data[key] = item
            self.queue.append(key)

    def get(self, key):
        """retrieve an item based on specify key
        """
        return self.cache_data.get(key)
