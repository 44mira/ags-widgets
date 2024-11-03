#!/usr/bin/env python3

import json
import re
from typing import Generator
from pathlib import Path


def get_keybinds() -> Generator[str, None, None]:
    KEYBINDINGS_PATH = Path.home() / ".config/hypr/keybindings.conf"

    lines = []
    with open(KEYBINDINGS_PATH, "r") as f:
        lines = f.readlines()

    return (line.strip() for line in lines)


def main():
    keybindings = []

    # read the keybinds from hyprland config file
    lines = get_keybinds()
    section = {}
    keybind = {}
    name = None

    start_flag = False
    for line in lines:
        # ignore lines before start or whitespace-only
        start_flag = start_flag or line == "### KEYBINDINGS"
        if not start_flag or not line or line == "### KEYBINDINGS":
            continue

        # new section begins
        if line[:3] == "## ":
            # ignore empty section
            if section:
                keybindings.append(section)
            section = {"title": line[3:], "keybinds": []}

        elif line[:2] == "# ":
            # assign a name for the next bind
            name = line[2:]

        elif line[:4] == "bind":
            line = line.split("=")[1].split(",")[:2]
            binding = " + ".join(
                re.sub(r"\$mainMod", "MOD", token.strip())
                for token in line
                if token.strip()
            )

            keybind = {"keybind": binding}
            if name:  # check if there is an available name to assign
                keybind["name"] = name
                name = None

            section["keybinds"].append(keybind)

    return json.dumps(keybindings)


if __name__ == "__main__":
    result = main()
    print(result)
