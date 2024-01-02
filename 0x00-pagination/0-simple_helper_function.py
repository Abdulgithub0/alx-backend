#!/usr/bin/env python3

"""a function named index_range that takes two
    integer arguments page and page_size
"""

from typing import Tuple


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
