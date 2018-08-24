# Soliloquy

A note-taking and organizational tool based on stream-of-consciousness writing. Very much experimental, work in progress!

<hr/>

## Version 0:

For now, the only working code is a tiny command line interface (see code in `notecli.js`). If you install it globally with `npm install soliloquy -g`, it should register a global `note` command that you can use in your command line from any directory. (Yay!)

**Features:**

  - Type `note` to create/open a Markdown file for today's notes (in the format `yyyy-mm-dd.md`)

  - Type `note "Some notes go here"` to append the note (must be surrounded by quote marks) to today's notes file.
  
  - Type `note --categoryfile.md` to create/open a file named `categoryfile.md`

  - Type `note "Notes about penguins here" --penguins.md` to append the note to *both* today's notes file *and* to the file named `penguins.md`.

  - A Bash autocompletion script is included in the `note-autocomplete.bash` file, so you can type `note --p` and then press TAB to complete it to `--penguins.md`, or if more than one file begins with P, it'll list all files in the notes directory that begin with the letter P.


**Stuff to fix:**

  - Create a config file; for now, all directories and settings specific to my computer are hard-coded. Boooo!
  - Make the time/date stuff configurable; for now, it always appends the date or time along with the note.
  - I'm sure the date/time formatting could be much improved. Just threw it together!
  - The elephant in the room: figure out what my ideal workflow is, before I spend any more time hacking this stuff together with no clear goal. (But it has been really fun exploring/experimenting!)
 
## Idea backlog:

**Some questions/challenges to return to later:**

  - It's easy enough to append data into a bunch of files, but how could I handle *editing* those files and keeping the updates in sync? That sounds terribly complicated! For example: I append `"note about penguins and robots"` to `penguins.md` and `robots.md`, but then I update the note in just one of those files. How could I identify that the note was changed and then sync it up with the other file? Lots of duplicate information means... super messy!

  - The idea of every paragraph or bullet point being a piece of data that could be synced across different views (chronological or categorical) would be doable with a custom interface that creates the *illusion* of editing everything in one big file. Maybe whenever edits are made to any text, the app identifies which note is being updated and then updates its "single source of truth". (I'm imagining a relationship database here, where every note has a unique ID and every view is just a list of notes in some order.)

  - But that idea doesn't translate so well to plain text editing! Line numbers wouldn't work as unique identifiers for each "chunk" because they always change... A lazy/ugly solution would be to prepend or append each chunk with some characters that serve as its unique ID.

  - I wonder how hard it would be to hack together some sort of file snippet glue mechanism in Vim where I could technically be editing just one file, but still see the contents of the other file snippets above and below it. (Basically just recreating my custom UI idea.)

  - How does file "diff"ing work, exactly? Git is pretty smart about recognizing additions/edits/deletions from plain text files. I'd love to learn more about its inner workings.

  - How do incremental builds work (like for static site generators like Jekyll)? If one update to one file means regenerating the entire collection of files, that gets very slow! I wonder how other apps have solved that issue. Do they do some sort of "diff" internally to identify which pieces need to be updates? Do they have a queue of actions saved to keep track of which pieces were changed?

  - For any kind of database that isn't normalized, like with noSQL databases, how do people handle syncing changes across duplicated data?

  - And that reminds me that I do want to learn more about how data is indexed, or what indexes even are exactly. That stuff seems totally mystifying to me, and super interesting!


**Some feature ideas from previous brainstorming sessions:**

  - Parse URLs automatically (if saving them to some structured data, or maybe to auto-generate a bookmarks file)
  - For editing within a larger file: parse tags for individual bullet points (not just paragraphs)
  - Support subcategories, like `#birds.penguins` or at least have a way to find all notes with both `#birds` and `#penguins`?

  - Learn how to make a vim plugin for custom autocompletion
  - Integration with a pomodoro-style timer / time-tracking, in-line with notes. (Might also be a Vim plugin)
  - Analytics on data, categories, dates
  - Web-based text editor
  - Markdown preview built in
  - Host online and sync across devices
  - Offline storage
  - Combine with a static blogging tool
 
