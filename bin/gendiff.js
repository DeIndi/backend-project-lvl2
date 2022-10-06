#!/usr/bin/env node
import { Command } from 'commander';
import genDiff from '../src/genDiff.js';

const cli = new Command();
cli.description('Compares two configuration files and shows a difference.');
cli.usage('[options] <filepath1> <filepath2>');
cli.addHelpCommand(false);
cli.helpOption(true);
cli.version('1.001');
cli.option('-f, --format <type>', 'output format');
cli.arguments('<filepath1> <filepath2>');
cli.action((filepath1, filepath2, options) => {
  console.log(genDiff(filepath1, filepath2, options.format));
});
cli.parse(process.argv);
