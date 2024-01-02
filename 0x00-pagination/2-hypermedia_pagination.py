#!/usr/bin/env python3

"""
implementation of Restful pagination
"""

import csv
import math
from typing import List, Tuple


def index_range(page: int, page_size: int) -> Tuple[int, int]:
      """
      :params:
          @page: current page Number
          @page_size: size or total items in the current page number
      :ptype:
          page: int
          page_size: int
      :return: starting index/page  and ending index/page
      rtype: Tuple of int
      """
      start_page = (page - 1) * page_size
      return start_page, start_page + page_size


class Server:
    """Server class to paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        """return dataset correspond to a given page and page_size
        """
        assert(type(page) == int and type(page_size) == int)
        assert(page > 0 and page_size > 0)
        try:
            data = index_range(page, page_size)
            return self.__dataset[data[0]:data[1]]
        except IndexError as e:
            return []
        return data

    def get_hyper(self, page: int = 1, page_size: int = 10) -> dict:
        """return a detail dictionary of current page info
        """
        data = self.get_page(page, page_size)
        prev_page = None if page - 1 == 0 else page - 1
        total_pages = math.ceil(len(self.__dataset) / page_size)
        next_page = None if page + 1 >= total_pages else page + 1
        return {'page': page,
                'page_size': page_size,
                'data': data,
                'next_page': next_page,
                'prev_page': prev_page,
                'total_pages': total_pages
        }


        
            
