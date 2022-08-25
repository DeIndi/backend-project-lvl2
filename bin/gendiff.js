#!/usr/bin/env node
import { Command } from 'commander';
import genDiff from '../src/genDiff.js';

const cli = new Command();
cli.description('Compares two configuration files and shows a difference.');
//cli.name('genDiff');
cli.usage('[options] <filepath1> <filepath2>');
cli.addHelpCommand(false);
cli.helpOption(true);
cli.version('1.001');
cli.option('-f, --format <type>', 'output format');
cli.arguments('<filepath1>', '<filepath1>');

cli.parse(process.argv);

console.log(genDiff(process.argv[2], process.argv[3], cli.opts().format));
