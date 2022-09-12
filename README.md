# "Difference checker" Project

[![Actions Status](https://github.com/DeIndi/backend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/DeIndi/backend-project-lvl2/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/090084e3341710243205/maintainability)](https://codeclimate.com/github/DeIndi/backend-project-lvl2/maintainability)
[![Node.js CI](https://github.com/DeIndi/backend-project-lvl2/actions/workflows/node.js.yml/badge.svg)](https://github.com/DeIndi/backend-project-lvl2/actions/workflows/node.js.yml)
[![Test Coverage](https://api.codeclimate.com/v1/badges/090084e3341710243205/test_coverage)](https://codeclimate.com/github/DeIndi/backend-project-lvl2/test_coverage)

This is the second project out of four, required for the node.js course.
The program is expected to check and display difference between two files, containing JSON or yml objects. Each property of an object is prefixed with '+' if it was added, '-' if it was removed or nothing if it was left unchanged. If its value was changed, both old value with '-' prefix and new value with '+' prefix should be present.
Program is supposed to work with plain and recursive objects. It also allows to choose difference display format - stylish or plain (-f key).

## Requirements

 - node.js v16+
 - Make
 - git
 
## Installation
 	
To install this project, use following commands:
```bash
git clone https://github.com/DeIndi/backend-project-lvl2
cd backend-project-lvl2
make install
npm link
```
## Demos

Demo of diff check 1 (Plain JSON objects)
[![asciicast](https://asciinema.org/a/5GYpa4JiPZSCsdhCEzyphpJ3e.svg)](https://asciinema.org/a/5GYpa4JiPZSCsdhCEzyphpJ3e)

Demo of diff check 2 (Plain yml objects)
[![asciicast](https://asciinema.org/a/q215zwdBJDRolLTaV8Piv2INT.svg)](https://asciinema.org/a/q215zwdBJDRolLTaV8Piv2INT)

Demo of diff check 3 (Recursive JSON objects)
[![asciicast](https://asciinema.org/a/jpmyCt1rczCtJ9ys55lfArxaO.svg)](https://asciinema.org/a/jpmyCt1rczCtJ9ys55lfArxaO)

Demo of diff check 4 (Plain formatter)
[![asciicast](https://asciinema.org/a/m528hJUU1gB5kQEpl8w6cXL4W.svg)](https://asciinema.org/a/m528hJUU1gB5kQEpl8w6cXL4W)

Demo of diff check 4 (JSON formatter)
[![asciicast](https://asciinema.org/a/AmglcIOLUrfRgv4iD4jjcHFZX.svg)](https://asciinema.org/a/AmglcIOLUrfRgv4iD4jjcHFZX)

