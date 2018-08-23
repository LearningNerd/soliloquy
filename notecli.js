#!/usr/bin/env node

const fs = require('fs');
const os = require('os');

const HOME = os.homedir();
const NOTES_DIR = HOME + '/Notes/learning-notes/';

const currentDate = getCurrentDate();
const currentDateFriendly = getCurrentDate("friendly");
const TODAY_NOTES_PATH = NOTES_DIR + currentDate + ".md"


const DAILY_TEMPLATE = "# Daily Notes for " + currentDateFriendly + "\n\n";


const { spawn } = require('child_process');

// If no arguments supplied, then just open today's notes file:
if (process.argv.length <= 2) {
  console.log("Opening notes file for " + currentDateFriendly);

  let editor = process.env.EDITOR || 'vi';
  
  let child = spawn(editor, [TODAY_NOTES_PATH], {
      stdio: 'inherit'
  });
  
  child.on('exit', function (e, code) {
      console.log("finished");
  });
  
  
  child.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
  

// Otherwise, parse the arguments and act accordingly!
} else {

  // Parse user args
  let noteData = parseArgs();

  // If no note was supplied (only tags), then open the chosen note files
  if (!noteData.note) {
    console.log("Opening notes file for " + noteData.tags[0]);

    let editor = process.env.EDITOR || 'vi';
    
    let child = spawn(editor, [NOTES_DIR + noteData.tags[0]], {
        stdio: 'inherit'
    });
    
    child.on('exit', function (e, code) {
        console.log("finished");
    });
    
    
    child.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
    });
   
  // If a note was supplied, append it to files accordingly!
  } else {

    // Get list of all files in the notes folder
    let allFiles = getFiles(NOTES_DIR);
    
    console.log(noteData);
    
    // Append to file for current day, with current time:
    appendOrCreateNote("[" + getCurrentTime() + "] " + noteData.note + "\n\n", TODAY_NOTES_PATH, DAILY_TEMPLATE);
    
    // Append to each tag file (or create them), with current date:
    noteData.tags.forEach(tag => {
      console.log("=========");
      console.log(noteData.note);
    
      // For creating new tag files: generate tag title: upper-case first letter, remove .md
      let tagTitle = tag.charAt(0).toUpperCase() + tag.slice(1, -3);
      let tagTemplate = "# " + tagTitle + " Notes" + "\n\n";
    
      appendOrCreateNote("[" + currentDate + "] " + noteData.note + "\n\n", NOTES_DIR + tag, tagTemplate);
    });

  }//end else (note was supplied)

}//end else (more than 3 arguments given)



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



// Append to file, or create a new file from template and then append. filePath must be a full path, not just file name!
function appendOrCreateNote (dataToAppend, filePath, notesTemplate) {

  // If specified file doesn't already exist, create it from template 
  if ( !fs.existsSync(filePath) ) {
    fs.writeFile(filePath, notesTemplate + dataToAppend, 'utf8', (error) => {
      if (error) throw error;
      console.log("File created and saved: " + filePath);
    }); 
  } else {

    fs.appendFile(filePath, dataToAppend, 'utf8', (error) => {
      if (error) throw error;
      console.log("File saved: " + filePath);
    });
 } 
}

// Formats: friendly ... or default: yyyy-mm-dd
function getCurrentDate(format) {
  let d = new Date();

  if (format === "friendly") {
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return d.toLocaleDateString('en-us', options);
  }

  let mm = zeroPad(d.getMonth() + 1);
  let dd = zeroPad(d.getDate());
  let yyyy = d.getFullYear();

  return yyyy + '-' + mm + '-' + dd;
}


function getCurrentTime() {
  let currentDate = new Date();
  let timeString = currentDate.toLocaleTimeString('en-us');
  timeString = timeString.slice(0,4) + timeString.slice(7);

  // dataToAppend = "**" + timeString + ":** " + dataToAppend + "\n\n";

  return timeString;
}

// n must be a number or number-like string
function zeroPad(n){
  let num = parseInt(n, 10);
  let str = String(n);
  return n < 10 ? '0' + str : str;
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


