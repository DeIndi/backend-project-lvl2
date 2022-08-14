# "Difference checker" Project

[![Actions Status](https://github.com/DeIndi/backend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/DeIndi/backend-project-lvl2/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/090084e3341710243205/maintainability)](https://codeclimate.com/github/DeIndi/backend-project-lvl2/maintainability)
[![Node CI](https://github.com/DeIndi/backend-project-lvl1/actions/workflows/nodejs.yml/badge.svg)](https://github.com/DeIndi/backend-project-lvl1/actions/workflows/nodejs.yml)

This is the second project out of four, required for the node.js course.
The program is expected to check and display difference between two files, containing JSON or yml objects. Each property of an object is prefixed with '+' if it was added, '-' if it was removed or nothing if it was left unchanged. If its value was changed, both old value with '-' prefix and new value with '+' prefix should be present.

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

Demo of diff check 2 (Plain yml objects)

Demo of diff check 3 (Recursive JSON objects)
[![asciicast](https://asciinema.org/a/aTh36evu0q8ngwCrYgILaXANz.svg)](https://asciinema.org/a/aTh36evu0q8ngwCrYgILaXANz)

Demo of diff check 4 (Plain formatter)
[![asciicast](https://asciinema.org/a/8dBM3GOvzfWbQqQOMJAr83Bv8.svg)](https://asciinema.org/a/8dBM3GOvzfWbQqQOMJAr83Bv8)

Demo of diff check 4 (JSON formatter)
[![asciicast](https://asciinema.org/a/BcUT6CVGs6s7ql06JqVSWWhIB.svg)](https://asciinema.org/a/BcUT6CVGs6s7ql06JqVSWWhIB)

