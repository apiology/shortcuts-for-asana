# Shortcuts for Asana

[![CircleCI](https://circleci.com/gh/apiology/shortcuts-for-asana.svg?style=svg)](https://circleci.com/gh/apiology/shortcuts-for-asana)

[![Available in the Chrome Web Store](https://storage.googleapis.com/web-dev-uploads/image/WlD8wC6g8khYWPJUsQceQkhXSlv1/tbyBjqi7Zu733AAKA5n4.png)](https://chrome.google.com/webstore/detail/shortcuts-for-asana/oaofildmfdagenngppcgdgmonboohjil)

Chrome extension which adds missing keyboard shortcuts/behavior to Asana.

Not created, maintained, reviewed, approved, or endorsed by Asana, Inc.

## Using

### Tasks

You can now remove the assignee of a task using cmd-ctrl-r.

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

* cmd-ctrl-1: click on first task in the dependent task warning dialog.
* cmd-ctrl-2...: etc
* cmd-enter: mark the original task as complete and close the dialog.

(see [Upvoter for
Asana](https://github.com/apiology/upvoter-for-asana) for an
interesting use for these links!)

## Installing

This isn't in the Chrome App Store, so welcome to the Chrome Extension
development experience!

1. Run 'make' to create the bundle with webpack, or 'make start' to
   start webpack in watch mode.
2. Go to [chrome://extensions/](chrome://extensions/)
3. Make sure 'Developer mode' is flipped on in the upper right.
4. Click the 'Load unpacked' button.
5. Choose the [dist](./dist) directory
