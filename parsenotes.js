// This will convert a notes file to a JSON file with notes categorized and grouped by tag
const fs = require('fs');
console.log("engage!");

// Will contain all tags as keys, with matching notes in arrays
let notesByCategory = {};


// Asynchronously read file contents:
fs.readFile('example-notes.md', 'utf8', (error, data) => {
  if (error) throw error;

  // Any line of text that contains a hashtag preceeded by at least one space char and followed by at least one non-space char
  // TODO: TEST MORE FOR EDGE CASES! ...like what if there's an extra space char at the end of the line??
  let notePattern = /^(.*\s+#\S+)$/gm;

  let notes  = data.match(notePattern);

  // console.log(notes);


  for (let note of notes) {
    
    // Hashtag preceeded by at least 1 space chart and followed at least 1 non-whitespace char
    let hashtagPattern = new RegExp('\\s+#(\\S+)', 'g');
    let nextMatch;
    let hashtags = [];   
   
    // Get all matches but ONLY the capture group matches: 
    while (nextMatch = hashtagPattern.exec(note)) {
      // Capturing group N: match[n] ... in this case, only 1 capture group, so always use [1]
      hashtags.push(nextMatch[1]);
      console.log(nextMatch[1]);
    }

    // console.log("NOTE: " + note);
//    console.log(hashtags);
  //console.log(hashtags[1]);

    for (let hashtag of hashtags) {
      //console.log("HASHTAG: " + hashtag);
      // If tag doesn't already exist, add it as empty array
      if (!notesByCategory[hashtag]) {
        notesByCategory[hashtag] = [];
      }
     
      // Push note to array for each of its tags 
      notesByCategory[hashtag].push(note);

    }//end hashtags loop
 
  }//end notes loop

  //console.log(notesByCategory);

  exportJSON(notesByCategory);

});

// Export as JSON file:
function exportJSON(dataObject) {

  fs.writeFile('notes-category-index.json', JSON.stringify(dataObject), 'utf8', (error) => {
    if (error) throw error;
    console.log("File saved!");
  });
  
  JSON.stringify(dataObject, null, 4);

}


