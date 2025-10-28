#!/usr/bin/env python3
"""Read a line of integers and print summary statistics.

Expected input example:
    1 4 9 16

Outputs sum, mean, min, max, and the sorted list.
Prints a helpful message if input is invalid or empty.
"""

from __future__ import annotations

from typing import List


def parse_integers(line: str) -> List[int]:
    tokens = [t for t in line.strip().split(" ") if t != ""]
    if not tokens:
        raise ValueError("No numbers provided.")
    try:
        return [int(t) for t in tokens]
    except ValueError as exc:
        raise ValueError(
            "Invalid input: please enter space-separated integers, e.g. 1 4 9 16."
        ) from exc


def main() -> None:
    try:
        line = input("Enter space-separated integers: ")
        numbers = parse_integers(line)
    except EOFError:
        print("No input received.")
        return
    except ValueError as err:
        print(str(err))
        return

    total = sum(numbers)
    count = len(numbers)
    mean = total / count
    smallest = min(numbers)
    largest = max(numbers)
    sorted_numbers = sorted(numbers)

    print(f"Sum: {total}")
    print(f"Mean: {mean}")
    print(f"Min: {smallest}")
    print(f"Max: {largest}")
    print(f"Sorted: {sorted_numbers}")


if __name__ == "__main__":
    main()


