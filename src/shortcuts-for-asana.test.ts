/**
 * @jest-environment jsdom
 * @jest-environment-options {"html": "<html><div class=\"ThemeableRectangularButtonPresentation--isEnabled ThemeableRectangularButtonPresentation ThemeableRectangularButtonPresentation--medium SubtleToggleButton--isPressed SubtleToggleButton--standardTheme SubtleToggleButton SearchGridPageToolbar-advancedSearchFiltersAppliedButton SubtleToggleButton--isPressed SubtleToggleButton--standardTheme SubtleToggleButton SearchGridPageToolbar-advancedSearchFiltersAppliedButton\" role=\"button\" tabindex=\"0\" aria-pressed=\"true\"><svg class=\"MiniIcon ThemeableRectangularButtonPresentation-leftIcon FilterMiniIcon\" viewBox=\"0 0 24 24\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M20,8H4C3.4,8,3,7.6,3,7s0.4-1,1-1h16c0.6,0,1,0.4,1,1S20.6,8,20,8z M18,13c0-0.6-0.4-1-1-1H7c-0.6,0-1,0.4-1,1s0.4,1,1,1h10C17.6,14,18,13.6,18,13z M15,19c0-0.6-0.4-1-1-1h-4c-0.6,0-1,0.4-1,1s0.4,1,1,1h4C14.6,20,15,19.6,15,19z\"></path></svg>Filter: 3</div></html>"}
 */
// filter button pulled 2022-11

import { shortcutsKeyDownBeforeOthers } from './shortcuts-for-asana.js';
import { htmlElementByClass } from './chrome-extension/dom-utils.js';
import { setPlatform } from './platform.js';
import { TestPlatform } from './__mocks__/test-platform.js';

test('filterButtonClick', () => {
  setPlatform(new TestPlatform());

  const filterButton = htmlElementByClass('SearchGridPageToolbar-advancedSearchFiltersAppliedButton', HTMLDivElement);
  if (filterButton == null) {
    throw Error('filterButton was null!');
  }
  jest.spyOn(filterButton, 'click');
  shortcutsKeyDownBeforeOthers(new window.KeyboardEvent('keydown', { ctrlKey: true, key: 'r' }));
  expect(filterButton.click).toHaveBeenCalled();
});
