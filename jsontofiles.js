// Given a JSON file of notes mapped to tags, export Markdown files for each tag
const fs = require('fs');
console.log("engage!");

// Will contain all tags as keys, with matching notes in arrays
let notesByCategory = {};


// Asynchronously read file contents:
fs.readFile('notes-category-index.json', 'utf8', (error, data) => {
  if (error) throw error;

  let dataObject = JSON.parse(data); 

  console.log(dataObject);

  exportMarkdown(dataObject);

});


// Export a Markdown file for each tag:
function exportMarkdown(dataObject) {

  for (let tag in dataObject) {

    fs.writeFile(tag + '.md', JSON.stringify(dataObject[tag]), 'utf8', (error) => {
      if (error) throw error;
      console.log("File saved: " + tag + ".md");
    });
  
  }//end tag loop
  

}

  

