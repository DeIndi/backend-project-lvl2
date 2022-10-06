#!/usr/bin/env node
import { Command } from 'commander';
import genDiff from '../src/genDiff.js';

const cli = new Command();

cli
  .description('Compares two configuration files and shows a difference.')
  .usage('[options] <filepath1> <filepath2>')
  .addHelpCommand(false)
  .helpOption(true)
  .version('1.001')
  .option('-f, --format <type>', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2, options) => {
    console.log(genDiff(filepath1, filepath2, options.format));
  });

cli.parse(process.argv);
