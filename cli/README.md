# CLI

A simple command line interface that parses and populates a Mongo database
with the provided JSON file.

## Usage

You can run it as a basic node script. Unfortunately, you cannot have it runnable using a shebang
as it would make it impossible to use `f` and `db` flags.

It is NOT recommended to run this script from root project folder. Run from the `cli` folder instead.

```bash
node cli -f data.json -db mongodb://localhost:27017/testTask
```

## Data structure

The data file is expected to be of the following format:

```json
{
	"<collection-name>": [<records>]
}
```
