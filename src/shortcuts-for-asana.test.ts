/**
 * @jest-environment jsdom
 */
// filter button pulled 2022-11

import { shortcutsKeyDownBeforeOthers } from './shortcuts-for-asana.js';
import { htmlElementByClass } from './chrome-extension/dom-utils.js';
import { setPlatform } from './platform.js';
import { TestPlatform } from './__mocks__/test-platform.js';

afterEach(() => {
  document.body.innerHTML = '';
});

test('filterButtonClick', () => {
  document.body.innerHTML = '<html><div class="ThemeableRectangularButtonPresentation--isEnabled ThemeableRectangularButtonPresentation ThemeableRectangularButtonPresentation--medium SubtleToggleButton--isPressed SubtleToggleButton--standardTheme SubtleToggleButton SearchGridPageToolbar-advancedSearchFiltersAppliedButton SubtleToggleButton--isPressed SubtleToggleButton--standardTheme SubtleToggleButton SearchGridPageToolbar-advancedSearchFiltersAppliedButton" role="button" tabindex="0" aria-pressed="true"><svg class="MiniIcon ThemeableRectangularButtonPresentation-leftIcon FilterMiniIcon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M20,8H4C3.4,8,3,7.6,3,7s0.4-1,1-1h16c0.6,0,1,0.4,1,1S20.6,8,20,8z M18,13c0-0.6-0.4-1-1-1H7c-0.6,0-1,0.4-1,1s0.4,1,1,1h10C17.6,14,18,13.6,18,13z M15,19c0-0.6-0.4-1-1-1h-4c-0.6,0-1,0.4-1,1s0.4,1,1,1h4C14.6,20,15,19.6,15,19z"></path></svg>Filter: 3</div></html>';
  setPlatform(new TestPlatform());

  const filterButton = htmlElementByClass('SearchGridPageToolbar-advancedSearchFiltersAppliedButton', HTMLDivElement);
  if (filterButton == null) {
    throw Error('filterButton was null!');
  }
  jest.spyOn(filterButton, 'click');
  shortcutsKeyDownBeforeOthers(new window.KeyboardEvent('keydown', { ctrlKey: true, key: 'r' }));
  expect(filterButton.click).toHaveBeenCalled();
});

test('removeAssignee', () => {
  document.body.innerHTML = '<html><div class="TaskPaneFields-assigneeContainer"><div class="TaskPaneAssigneeToken"><div class="ThemeableCardPresentation--isValid ThemeableCardPresentation ThemeableInteractiveCardPresentation--isNotSelected ThemeableInteractiveCardPresentation--isEnabled ThemeableInteractiveCardPresentation SubtleButtonCard SubtleTokenButton--editable SubtleTokenButton--withoutRemoveButton SubtleTokenButton--subtle SubtleTokenButton AssigneeTokenButton--assigned AssigneeTokenButton AssigneeToken TaskPaneAssigneeToken-assigneeToken" aria-expanded="false" tabindex="0" id="task_pane_assignee_input" aria-describedby="task_pane_assignee_label" role="button" aria-disabled="false"><div class="SubtleTokenButton-leftIcon"><div class="AssigneeTokenButton-avatar Avatar AvatarPhoto AvatarPhoto--default AvatarPhoto--small AvatarPhoto--color0" aria-hidden="true"><div class="AvatarPhoto-image" style="background-image: url(&quot;https://s3.amazonaws.com/profile_photos/53283930106304.5490822957495.cPelBpSR2PebMrowdg50_60x60.png&quot;);"></div>VB</div></div><div class="AssigneeTokenButton-label"><span class="AssigneeToken-label"><span class="AssigneeToken-userNameLabel">Vince Broz</span></span></div></div><div class="ThemeableIconButtonPresentation--isEnabled ThemeableIconButtonPresentation ThemeableIconButtonPresentation--medium SubtleIconButton--standardTheme SubtleIconButton TaskPaneAssigneeToken-removeButton SubtleIconButton--standardTheme SubtleIconButton TaskPaneAssigneeToken-removeButton" aria-label="Remove assignee" icon="[object Object]" tabindex="0" role="button"><svg class="MiniIcon--small MiniIcon XThickMiniIcon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M14.5,12l6-6C20.8,5.7,21,5.2,21,4.8s-0.2-0.9-0.5-1.2C20.1,3.2,19.7,3,19.2,3S18.3,3.2,18,3.5l-6,6l-6-6 C5.7,3.2,5.2,3,4.8,3S3.9,3.2,3.5,3.5C3.2,3.9,3,4.3,3,4.8S3.2,5.7,3.5,6l6,6l-6,6c-0.7,0.7-0.7,1.8,0,2.5C3.9,20.8,4.3,21,4.8,21 s0.9-0.2,1.2-0.5l6-6l6,6c0.3,0.3,0.8,0.5,1.2,0.5s0.9-0.2,1.2-0.5c0.7-0.7,0.7-1.8,0-2.5L14.5,12z"></path></svg></div><div class="TaskAssigneeShortcuts"></div></div><div class="TaskPaneFields-assigneeMyTasksSectionsMenuButtonWrapper"><div class="ThemeableRectangularButtonPresentation--isEnabled ThemeableRectangularButtonPresentation ThemeableRectangularButtonPresentation--medium SubtleButton--standardTheme SubtleButton FloatingSelect TaskPotColumnMenuButton-dropdown TaskPaneFields-assigneeMyTasksSectionsMenuButton SubtleButton--standardTheme SubtleButton FloatingSelect TaskPotColumnMenuButton-dropdown TaskPaneFields-assigneeMyTasksSectionsMenuButton" tabindex="0" aria-controls="lui_1580" aria-expanded="false" id="lui_1579" role="button"><span class="FloatingSelect-label">Recently assigned</span><svg class="MiniIcon ThemeableRectangularButtonPresentation-rightIcon ArrowDownMiniIcon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M3.5,8.9c0-0.4,0.1-0.7,0.4-1C4.5,7.3,5.4,7.2,6,7.8l5.8,5.2l6.1-5.2C18.5,7.3,19.5,7.3,20,8c0.6,0.6,0.5,1.5-0.1,2.1 l-7.1,6.1c-0.6,0.5-1.4,0.5-2,0L4,10.1C3.6,9.8,3.5,9.4,3.5,8.9z"></path></svg></div></div></div></html>';
  setPlatform(new TestPlatform());

  const removeButton = htmlElementByClass('TaskPaneAssigneeToken-removeButton', HTMLDivElement);
  if (removeButton == null) {
    throw Error('filterButton was null!');
  }
  jest.spyOn(removeButton, 'click');
  shortcutsKeyDownBeforeOthers(new window.KeyboardEvent('keydown', { ctrlKey: true, metaKey: true, key: 'r' }));
  expect(removeButton.click).toHaveBeenCalled();
});

test('openLink', () => {
  document.body.innerHTML = '<html><div class="ProsemirrorEditor--withDraggableContent ProsemirrorEditor--withParagraphVSpacingNormal ProsemirrorEditor--withHeader1VSpacingNormal ProsemirrorEditor--withHeader2VSpacingNormal ProsemirrorEditor--withInlineAssetNormal ProsemirrorEditor--withTableVSpacingNormal ProsemirrorEditor--withHorizontalRuleVSpacingNormal ProsemirrorEditor--withProjectEmbedVSpacingNormal ProsemirrorEditor TextEditor3-prosemirrorEditor ProseMirror" tabindex="0" aria-label="Edit description for Be able to navigate through Asana project task view without mouse - just keyboard shortcuts" contenteditable="true" translate="no"><p class="ProsemirrorEditor-paragraph"><span data-app-link="1" data-object-id="123" data-href="https://github.com/apiology/shortcuts-for-asana/pull/71" contenteditable="false"><a href="https://www.cnn.com/" class="ProsemirrorEditor-link">https://www.cnn.com/</a></div></html>';
  setPlatform(new TestPlatform());

  const linkAnchor = htmlElementByClass('ProsemirrorEditor-link', HTMLAnchorElement);
  if (linkAnchor == null) {
    throw Error('linkAnchor was null!');
  }
  jest.spyOn(window, 'open').mockImplementation();
  shortcutsKeyDownBeforeOthers(new window.KeyboardEvent('keydown', { ctrlKey: true, metaKey: true, key: '1' }));
  expect(window.open).toHaveBeenCalledWith('https://www.cnn.com/', '_blank');
});

test('setting task time dismisses task time', () => {
  document.body.innerHTML = '<html><div class="TaskDueDateToken"><div id="task_pane_due_date_input" class="ThemeableCardPresentation--isValid ThemeableCardPresentation ThemeableInteractiveCardPresentation--isNotSelected ThemeableInteractiveCardPresentation--isEnabled ThemeableInteractiveCardPresentation SubtleButtonCard SubtleTokenButton--editable SubtleTokenButton--subtle SubtleTokenButton DueDateTokenButton--dueDateSet DueDateTokenButton--editable DueDateTokenButton--past DueDateTokenButton TaskDueDateToken-tokenButton TaskDueDateToken--past" role="button" tabindex="0" aria-disabled="false" aria-describedby="task_pane_due_date_label" aria-expanded="false"><div class="SubtleTokenButton-leftIcon"><div class="DueDateTokenButton-icon"><svg class="Icon CalendarIcon" viewBox="0 0 32 32" aria-hidden="true" focusable="false"><path d="M24,2V1c0-0.6-0.4-1-1-1s-1,0.4-1,1v1H10V1c0-0.6-0.4-1-1-1S8,0.4,8,1v1C4.7,2,2,4.7,2,8v16c0,3.3,2.7,6,6,6h16c3.3,0,6-2.7,6-6V8C30,4.7,27.3,2,24,2z M8,4v1c0,0.6,0.4,1,1,1s1-0.4,1-1V4h12v1c0,0.6,0.4,1,1,1s1-0.4,1-1V4c2.2,0,4,1.8,4,4v2H4V8C4,5.8,5.8,4,8,4z M24,28H8c-2.2,0-4-1.8-4-4V12h24v12C28,26.2,26.2,28,24,28z"></path></svg></div></div><span class="DueDateTokenButton-label Typography Typography--overflowTruncate"><div class="DueDateWithRecurrence--small DueDateWithRecurrence DueDateWithRecurrence--past TaskDueDateToken-label"><div class="DueDate--canWrap DueDate DueDateWithRecurrence-dueDate DueDate--past"><span class="DueDate-dateSpan">Feb 22</span></div></div></span><div class="RemoveButton--isEnabled RemoveButton SubtleTokenButton-removeButton RemoveButton--small" role="button" tabindex="0" aria-label="Remove"><svg class="CompoundIcon--small CompoundIcon XCircleCompoundIcon" viewBox="0 0 32 32" aria-hidden="true" focusable="false"><path d="M31,16c0,8.3-6.7,15-15,15S1,24.3,1,16S7.7,1,16,1S31,7.7,31,16z" class="CompoundIcon-outer"></path><path d="M22.5,20.7c0.5,0.5,0.5,1.3,0,1.8c-0.2,0.2-0.5,0.4-0.9,0.4s-0.6-0.1-0.9-0.4L16,17.8l-4.7,4.7c-0.2,0.2-0.5,0.4-0.9,0.4s-0.6-0.1-0.9-0.4C9,22,9,21.2,9.5,20.7l4.7-4.7l-4.7-4.7C9,10.8,9,10,9.5,9.5c0.2-0.2,0.5-0.4,0.9-0.4s0.6,0.1,0.9,0.4l4.7,4.7l4.7-4.7c0.2-0.2,0.5-0.4,0.9-0.4s0.6,0.1,0.9,0.4c0.5,0.5,0.5,1.3,0,1.8L17.8,16L22.5,20.7z" class="CompoundIcon-inner"></path></svg></div></div></div></html>';
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
  document.body.innerHTML = '<html><div class="TaskDueDateToken"><div id="task_pane_due_date_input" class="ThemeableCardPresentation--isValid ThemeableCardPresentation ThemeableInteractiveCardPresentation--isNotSelected ThemeableInteractiveCardPresentation--isEnabled ThemeableInteractiveCardPresentation SubtleButtonCard SubtleTokenButton--empty SubtleTokenButton--editable SubtleTokenButton--subtle SubtleTokenButton DueDateTokenButton--empty DueDateTokenButton--editable DueDateTokenButton--future DueDateTokenButton TaskDueDateToken-tokenButton TaskDueDateToken--future" role="button" tabindex="0" aria-disabled="false" aria-describedby="task_pane_due_date_label" aria-expanded="false"><div class="SubtleTokenButton-leftIcon"><svg class="DashedIcon--small DashedIcon DueDateTokenButton-emptyIcon DueDateDashedIcon" focusable="false" viewBox="0 0 28 28"><path d="M27.5,14c0,7.5-6,13.5-13.5,13.5S0.5,21.5,0.5,14c0-4.6,2.3-8.7,5.9-11.2c2.2-1.5,4.8-2.3,7.6-2.3 C21.5,0.5,27.5,6.5,27.5,14z" class="DashedIcon-outer"></path><path d="M18,7V6.5C18,6.2,17.8,6,17.5,6S17,6.2,17,6.5V7h-6V6.5C11,6.2,10.8,6,10.5,6S10,6.2,10,6.5V7c-1.7,0-3,1.3-3,3v8 c0,1.7,1.3,3,3,3h8c1.7,0,3-1.3,3-3v-8C21,8.3,19.7,7,18,7z M10,8v0.5C10,8.8,10.2,9,10.5,9S11,8.8,11,8.5V8h6v0.5 C17,8.8,17.2,9,17.5,9S18,8.8,18,8.5V8c1.1,0,2,0.9,2,2v1H8v-1C8,8.9,8.9,8,10,8z M18,20h-8c-1.1,0-2-0.9-2-2v-6h12v6 C20,19.1,19.1,20,18,20z" class="DashedIcon-inner"></path></svg></div><span class="DueDateTokenButton-label Typography Typography--overflowTruncate">No due date</span><div class="RemoveButton--isEnabled RemoveButton SubtleTokenButton-removeButton RemoveButton--small" role="button" tabindex="0" aria-label="Remove"><svg class="CompoundIcon--small CompoundIcon XCircleCompoundIcon" viewBox="0 0 32 32" aria-hidden="true" focusable="false"><path d="M31,16c0,8.3-6.7,15-15,15S1,24.3,1,16S7.7,1,16,1S31,7.7,31,16z" class="CompoundIcon-outer"></path><path d="M22.5,20.7c0.5,0.5,0.5,1.3,0,1.8c-0.2,0.2-0.5,0.4-0.9,0.4s-0.6-0.1-0.9-0.4L16,17.8l-4.7,4.7c-0.2,0.2-0.5,0.4-0.9,0.4s-0.6-0.1-0.9-0.4C9,22,9,21.2,9.5,20.7l4.7-4.7l-4.7-4.7C9,10.8,9,10,9.5,9.5c0.2-0.2,0.5-0.4,0.9-0.4s0.6,0.1,0.9,0.4l4.7,4.7l4.7-4.7c0.2-0.2,0.5-0.4,0.9-0.4s0.6,0.1,0.9,0.4c0.5,0.5,0.5,1.3,0,1.8L17.8,16L22.5,20.7z" class="CompoundIcon-inner"></path></svg></div></div></div></html>';
  setPlatform(new TestPlatform());
  shortcutsKeyDownBeforeOthers(new window.KeyboardEvent('keydown', { ctrlKey: true, metaKey: false, key: 't' }));
  // ensure no exception thrown at least
});
