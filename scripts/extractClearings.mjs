import { readFileSync } from 'node:fs'
import { join } from 'node:path'

import commandLineArgs from 'command-line-args'
import commandLineUsage from 'command-line-usage'

const optionDefinitions = [
  {
    name: 'name',
    type: String,
    defaultOption: true,
  },
  {
    name: 'viewbox',
    alias: 'v',
    type: Number,
    description: 'The SVG viewBox width and height used by the loaded map chart [default: 2050].',
    typeLabel: '<number>',
    defaultValue: 2050,
  },
  {
    name: 'help',
    alias: 'h',
    type: Boolean,
    description: 'Display this usage guide.',
  },
]

const options = commandLineArgs(optionDefinitions)

if (options.help || !options.name) {
  console.log(
    commandLineUsage([
      {
        header: '{underline Summary}',
        content:
          'Outputs the clearing coordinates for the specified SVG map chart, for use in the "componentDefinitions.ts" file.',
      },
      {
        header: '{underline Usage}',
        content: ['extract-clearings <name> {gray [--viewbox <number>]}'],
      },
      {
        header: '{underline Arguments}',
        content: [
          {
            name: '<name>',
            description:
              'The name of the map chart file to be processed (excluding its ".svg" extension). Must reside in the "../src/images/charts/" folder.',
          },
        ],
      },
      {
        header: '{underline Options}',
        optionList: optionDefinitions,
        hide: ['name'],
      },
    ]),
  )
  process.exit(options.help ? 0 : 1)
}

const clearingRegex = /<circle[^>]+?cx="(?<x>[^"]+)"[^>]+?cy="(?<y>[^"]+)"/g

const viewBoxScale = options.viewbox / 1000
// Round to 2 decimal places
const rescale = match => Math.round(Number(match) / (viewBoxScale / 100)) / 100

const filePath = join(import.meta.dirname, '../src/images/charts/', `${options.name}.svg`)
const file = readFileSync(filePath, 'utf-8')

const clearings = [...file.matchAll(clearingRegex)].map(match => ({
  x: rescale(match.groups.x),
  y: rescale(match.groups.y),
}))

console.log(JSON.stringify(clearings))
