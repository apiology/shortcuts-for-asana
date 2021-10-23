# Shortcuts for Asana

[![CircleCI](https://circleci.com/gh/apiology/shortcuts_for_asana.svg?style=svg)](https://circleci.com/gh/apiology/shortcuts_for_asana)

WARNING: This is not ready for use yet!

Chrome extension which adds missing keyboard shortcuts/behavior to Asana

## Installing

This isn't in the Chrome App Store, so welcome to the Chrome Extension
development experience!

1. Run 'make' to create the bundle with webpack, or 'make start' to
   start webpack in watch mode.
2. Go to [chrome://extensions/](chrome://extensions/)
3. Make sure 'Developer mode' is flipped on in the upper right.
4. Click the 'Load unpacked' button.
5. Choose the `dist/` directory containing your Chrome extension code.

## Usage
If you mark a task done which has dependent tasks, links to those
tasks appear in the warning dialog.  Shortcuts for Asana adds keyboard
shortcuts for those tasks:

* cmd-ctrl-1: upvote first task in the dependent task warning dialog.
* cmd-ctrl-2...: etc
* cmd-enter: mark the original task as complete and close the dialog.

(see [Upvoter for
Asana](https://github.com/apiology/upvoter_for_asana) for an
interesting use for these links!)
