#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

import commandLineArgs from 'command-line-args'
import commandLineUsage from 'command-line-usage'

const optionDefinitions = [
  {
    name: 'name',
    type: String,
    defaultOption: true,
  },
  {
    name: 'help',
    alias: 'h',
    type: Boolean,
    description: 'Display this usage guide.',
  },
  {
    name: 'dry-run',
    alias: 'd',
    type: Boolean,
    description: 'Perform a dry run of the shrinkage, without saving any changes.',
  },
]

const options = commandLineArgs(optionDefinitions)

if (options.help || !options.name) {
  console.log(
    commandLineUsage([
      {
        header: '{underline Summary}',
        content:
          'Shrinks the file size of the specified SVG map chart further by rounding coordinates that the SVG optimizer Scour misses.',
      },
      {
        header: '{underline Usage}',
        content: ['shrink-map <name> {gray [--dry-run]}'],
      },
      {
        header: '{underline Arguments}',
        content: [
          {
            name: '<name>',
            description:
              'The name of the map chart file to be processed (excluding its ".svg" extension). Must reside in the "src/images/charts/" folder.',
          },
        ],
      },
      {
        header: '{underline Options}',
        optionList: optionDefinitions,
        hide: ['name'],
      },
    ]).trim(),
  )
  process.exit(options.help ? 0 : 1)
}

const coordinateRegex = /(?<attribute> c?[xy][12]?=")(?<value>[^"]+)"/g

const filePath = resolve(import.meta.dirname, '../src/images/charts/', `${options.name}.svg`)
let fileText = readFileSync(filePath, 'utf-8')

let replaceCount = 0
fileText = fileText.replace(coordinateRegex, (match, attribute, value) => {
  const roundedValue = Math.round(Number(value))
  if (Number.isNaN(roundedValue) || roundedValue.toString() === value) return match

  const replacement = `${attribute}${roundedValue}"`
  console.log(`${match}  -> ${replacement}`)
  replaceCount++
  return replacement
})

if (!options['dry-run']) {
  if (replaceCount > 0) {
    // Save the changes back to the file
    writeFileSync(filePath, fileText, { encoding: 'utf-8' })
    console.log(`Changes saved to ${filePath}.`)
  } else {
    console.log('No changes made.')
  }
}
