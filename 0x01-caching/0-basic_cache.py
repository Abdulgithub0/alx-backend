#!/usr/bin/python3
""" BaseCaching module
"""


class BaseCaching():
    """ BaseCaching defines:
      - constants and method of caching system
      - data are stored (in a dictionary)
    """
    MAX_ITEMS = 4

    def __init__(self):
        """ Initiliaze
        """
        self.cache_data = {}

    def print_cache(self):
        """ Print the cache
        """
        print("Current cache:")
        for key in sorted(self.cache_data.keys()):
            print("{}: {}".format(key, self.cache_data.get(key)))

    def put(self, key, item):
        """ Add an item in the cache
        """
        raise NotImplementedError("put must be implemented in child class")

    def get(self, key):
        """ Get an item by key
        """
        raise NotImplementedError("get must be implemented in child class")


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
