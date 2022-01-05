# Shortcuts for Asana

[![CircleCI](https://circleci.com/gh/apiology/shortcuts-for-asana.svg?style=svg)](https://circleci.com/gh/apiology/shortcuts-for-asana)

Chrome extension which adds missing keyboard shortcuts/behavior to Asana.

[![Available in the Chrome Web Store](https://storage.googleapis.com/web-dev-uploads/image/WlD8wC6g8khYWPJUsQceQkhXSlv1/tbyBjqi7Zu733AAKA5n4.png)](https://chrome.google.com/webstore/detail/shortcuts-for-asana/oaofildmfdagenngppcgdgmonboohjil)

## Using

### Tasks

Remove the assignee of a task using cmd-ctrl-r:

<img src="./docs/screenshot-4.png" alt="screenshot showing Asana task with an assignee" height="400"/>

Assign the time of a task with ctrl-t:

<img src="./docs/screenshot-3.png" alt="screenshot showing Asana task with cursor in time field" height="400"/>

### Task List

When you mark a task complete using cmd-enter in the task list view,
Shortcuts for Asana will return your focus to the first open task.

## Search Results

ctrl-r will click the 'Refine search' button.

<img src="./docs/screenshot-5.png" alt="screenshot showing a search results screen" height="400"/>

### Task Description

If you have links within a task description, Shortcuts for Asana adds
keyboard shortcuts for those tasks:

* cmd-ctrl-1: open the first link in a new tab
* cmd-ctrl-2...: etc

<img src="./docs/screenshot-1.png" alt="screenshot showing Asana task description and repeating above keystrokes" height="400"/>

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

<img src="./docs/screenshot-2.png" alt="screenshot showing Asana dependent task dialog while closing a task and repeating above keystrokes" height="400"/>

## Legal

Not created, maintained, reviewed, approved, or endorsed by Asana, Inc.

## Contributions

This project, as with all others, rests on the shoulders of a broad
ecosystem supported by many volunteers doing thankless work, along
with specific contributors.

In particular I'd like to call out:

* [Audrey Roy Greenfeld](https://github.com/audreyfeldroy) for the
  cookiecutter tool and associated examples, which keep my many
  projects building with shared boilerplate with a minimum of fuss.
