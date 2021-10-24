# Shortcuts for Asana

[![CircleCI](https://circleci.com/gh/apiology/shortcuts_for_asana.svg?style=svg)](https://circleci.com/gh/apiology/shortcuts_for_asana)

Chrome extension which adds missing keyboard shortcuts/behavior to Asana

## Using

### Task List

When you mark a task complete using cmd-enter in the task list view,
Shortcuts for Asana will return your focus to the first open task.

### Task Description

If you have links within a task description, Shortcuts for Asana adds
keyboard shortcuts for those tasks:

* cmd-ctrl-1: open the first link in a new tab
* cmd-ctrl-2...: etc

### Dependent Task Dialog

If you mark a task done which has dependent tasks, links to those
tasks appear in the warning dialog.  Shortcuts for Asana adds keyboard
shortcuts for those tasks:

* cmd-ctrl-1: upvote first task in the dependent task warning dialog.
* cmd-ctrl-2...: etc
* cmd-enter: mark the original task as complete and close the dialog.

(see [Upvoter for
Asana](https://github.com/apiology/upvoter_for_asana) for an
interesting use for these links!)

## Installing

This isn't in the Chrome App Store, so welcome to the Chrome Extension
development experience!

1. Run 'make' to create the bundle with webpack, or 'make start' to
   start webpack in watch mode.
2. Go to [chrome://extensions/](chrome://extensions/)
3. Make sure 'Developer mode' is flipped on in the upper right.
4. Click the 'Load unpacked' button.
5. Choose this directory
