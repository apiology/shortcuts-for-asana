/**
 * @jest-environment jsdom
 */
// filter button pulled 2022-11

import { shortcutsKeyDownBeforeOthers } from './shortcuts-for-asana.js';
import { waitForElement, htmlElementByClass, htmlElementBySelector } from './chrome-extension/dom-utils.js';
import { setPlatform } from './platform.js';
import { TestPlatform } from './__mocks__/test-platform.js';
import {
  filterButtonClickHtml,
  filterButtonClickDismissingTaskHtml,
  removeAssigneeHtml,
  openLinkHtmlCustomField,
  openLinkHtmlPlateSpinnerAction,
  settingTaskTimeHtml,
  settingTaskTimeNoExistingTimeHtml,
} from './__fixtures__/shortcuts-for-asana-fixtures.js';

afterEach(() => {
  document.body.innerHTML = '';
});

test('filterButtonClick', () => {
  document.body.innerHTML = filterButtonClickHtml;
  setPlatform(new TestPlatform());

  const filterButton = htmlElementByClass('SearchGridPageToolbar-advancedSearchFiltersAppliedButton', HTMLDivElement);
  if (filterButton == null) {
    throw Error('filterButton was null!');
  }
  jest.spyOn(filterButton, 'click');
  shortcutsKeyDownBeforeOthers(new window.KeyboardEvent('keydown', { ctrlKey: true, key: 'r' }));
  expect(filterButton.click).toHaveBeenCalled();
});

test('filterButtonClickDismissingTask', () => {
  document.body.innerHTML = filterButtonClickDismissingTaskHtml;
  setPlatform(new TestPlatform());

  shortcutsKeyDownBeforeOthers(new window.KeyboardEvent('keydown', { ctrlKey: true, key: 'r' }));

  const filterButton = waitForElement('div.SearchGridPageToolbar-advancedSearchFiltersAppliedButton');
  expect(filterButton).not.toBeNull();
});

test('removeAssignee', () => {
  document.body.innerHTML = removeAssigneeHtml;
  setPlatform(new TestPlatform());

  const removeButton = htmlElementByClass('TaskPaneAssigneeToken-removeButton', HTMLDivElement);
  if (removeButton == null) {
    throw Error('filterButton was null!');
  }
  jest.spyOn(removeButton, 'click');
  shortcutsKeyDownBeforeOthers(new window.KeyboardEvent('keydown', { ctrlKey: true, metaKey: true, key: 'r' }));
  expect(removeButton.click).toHaveBeenCalled();
});

test('openLinkCustomField', () => {
  document.body.innerHTML = openLinkHtmlCustomField;
  setPlatform(new TestPlatform());

  const linkAnchor = htmlElementByClass('ProsemirrorEditor-link', HTMLAnchorElement);
  if (linkAnchor == null) {
    throw Error('linkAnchor was null!');
  }
  jest.spyOn(window, 'open').mockImplementation();
  shortcutsKeyDownBeforeOthers(new window.KeyboardEvent('keydown', { ctrlKey: true, metaKey: true, key: '1' }));
  expect(window.open).toHaveBeenCalledWith('https://www.cnn.com/', '_blank');
});

test('openLinkPlateSpinnerAction', () => {
  document.body.innerHTML = openLinkHtmlPlateSpinnerAction;
  setPlatform(new TestPlatform());

  const button = htmlElementBySelector('#plate-spinner-actions .ActionList [role="button"]', HTMLDivElement);
  if (button == null) {
    throw Error('button was null!');
  }
  jest.spyOn(button, 'click').mockImplementation();
  shortcutsKeyDownBeforeOthers(new window.KeyboardEvent('keydown', { ctrlKey: true, metaKey: true, key: '1' }));
  expect(button.click).toHaveBeenCalledWith();
});

test('setting task time dismisses task time', () => {
  document.body.innerHTML = settingTaskTimeHtml;
  setPlatform(new TestPlatform());
  const dismissTaskTimeButtonParent = document.querySelector('#task_pane_due_date_input > div.RemoveButton--isEnabled')?.parentElement;
  if (dismissTaskTimeButtonParent == null) {
    throw Error('dismissTaskTimeButtonParent was null!');
  }
  jest.spyOn(dismissTaskTimeButtonParent, 'click').mockImplementation();
  shortcutsKeyDownBeforeOthers(new window.KeyboardEvent('keydown', { ctrlKey: true, metaKey: false, key: 't' }));
  expect(dismissTaskTimeButtonParent.click).toHaveBeenCalledWith();
});

test('setting task time with no existing time does not create click', () => {
  // as of 2023-03 there's actually a button there regardless, even if
  // it's not visible, but clicking it triggers Asana's crash
  // detection, meaning we have to avoid clicking it.
  //
  // Unfortunately I don't have a convenient way to test htat, as the
  // click on the larger element to select the due date defeats my
  // attempts so far to detect the non-click to the remove button
  document.body.innerHTML = settingTaskTimeNoExistingTimeHtml;
  setPlatform(new TestPlatform());
  shortcutsKeyDownBeforeOthers(new window.KeyboardEvent('keydown', { ctrlKey: true, metaKey: false, key: 't' }));
  // ensure no exception thrown at least
});
