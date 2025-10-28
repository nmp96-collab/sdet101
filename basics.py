"""Basic utility functions: add, is_even, and safe_divide."""

from typing import Optional, Union

Number = Union[int, float]


def add(left: Number, right: Number) -> Number:
    """Return the sum of two numbers."""
    return left + right


def is_even(value: int) -> bool:
    """Return True if value is even, otherwise False."""
    return (value % 2) == 0


def safe_divide(numerator: Number, denominator: Number) -> Optional[float]:
    """Return numerator / denominator, or None if denominator is zero."""
    if denominator == 0:
        return None
    return numerator / denominator


