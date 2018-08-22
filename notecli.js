#!/usr/bin/env node

const fs = require('fs');
const os = require('os');

const HOME = os.homedir();
const NOTES_DIR = HOME + '/Notes/learning-notes/';

// Parse user args
let noteData = parseArgs();
// Get list of all files in the notes folder
let allFiles = getFiles(NOTES_DIR);

console.log("all files:");
console.log(allFiles);

// Generate list of files that match the given tags
let filesToAppend = allFiles.filter(file => {
  //console.log(file + " ----");
  //console.log(noteData.tags);
  for (let tag of noteData.tags) {
//    console.log("check: " + tag + " in " + file + " ?");
    if (file.includes(tag)) return true;
  }
});

console.log("files to append:");
console.log(filesToAppend);

console.log(noteData);

// Append to each file matching the given tags
filesToAppend.forEach(fileToAppend => {

  console.log("=========");
  console.log(noteData.note);

  appendNote(noteData.note, NOTES_DIR + fileToAppend);

});


// Parse arguments supplied when running this file as a command
function parseArgs() {
  let noteString = '';
  let tags = [];

 process.argv.forEach((arg, index) => {
  
    if (index < 2) { return } // Skip arg 0 and 1 
   
    // Parse tag (whichever arg begins with --)
    if (arg.indexOf('--') === 0) {
      tags.push(arg.slice(2)); // slice off the --
    } else {
      noteString += arg;
    }
  
  }); //end forEach
  
 // console.log(tags);
  //console.log(noteString);
  
  // Minimal error handling: a non-empty note is required!
  if (!noteString) {
    console.log("Please include a note surrounded by quote marks.");
  }

  return {note: noteString, tags: tags};

}//end parseArgs




// NOTE: look into how to properly use the async version!
function getFiles (dir) {
  // exclude dot files
  return fs.readdirSync(dir, 'utf8').filter(file => file.indexOf('.') !== 0);
}



// Given a string and list of files, return the file that matches the string (for now, just using .includes)
function tagToFileName (tag, files) {

  for (let file of files) {
    if (file.includes(tag)) {
      return file;
    }
  }
  // If no matches, will return undefined
}



// Append to file
function appendNote (dataToAppend, filePath) {
/*
  let currentDate = new Date();
  let timeString = currentDate.toLocaleTimeString('en-us');
  timeString = timeString.slice(0,4) + timeString.slice(7);

  dataToAppend = "**" + timeString + ":** " + dataToAppend + "\n\n";
*/

  fs.appendFile(filePath, dataToAppend, 'utf8', (error) => {
    if (error) throw error;
    console.log("File saved: " + filePath);
  });
  
}



// Source: https://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback
/* 
const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function lsExample() {
  //const { stdout, stderr } = await exec('ls');
  const output = await exec('ls');
  console.log(output);
}

lsExample();
*/

// TEST

// process.stdin.resume();
/*
process.stdin.setEncoding('utf8');

console.log("Hello! Enter something: ");


process.stdin.on('data', (text) => {

  console.log("received data: " + text);

  if (text === "done\n") {
    console.log("exiting");
    process.exit();
 }

});

*/

/*
const { exec } = require('child_process');

const NOTES_DIR = '~/notes/learning-notes/';

exec('ls ' + NOTES_DIR, 'utf8', (error, stdout, stderr) => {

  if (error) {
    console.log(error);
    return;
  }

  console.log(stdout);
  console.log(stderr);
}); 
*/


