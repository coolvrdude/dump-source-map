Dump Source Map
===============

Extremely minimal example of restoring original source code from a source map.

> This fork allows proper extraction of files that start with "webpack://" or similar.

> Only tested on css source maps so idk if it'll work

> also very bad method of doign this but i really dont care since it works

> -- end of edits

## Setup

1. clone repo
2. install dependencies with `yarn`

## Usage

From the root directory of the repo run:
```
node . [file path to source map] [output directory (default: output)]
```

If successful, original source code should be written to output directory.
