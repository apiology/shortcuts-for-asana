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
  document.body.innerHTML = '<html><div id="task_pane_assignee_input" class="ThemeableCardPresentation--isValid ThemeableCardPresentation ThemeableInteractiveCardPresentation--isNotSelected ThemeableInteractiveCardPresentation--isEnabled ThemeableInteractiveCardPresentation SubtleButtonCard SubtleTokenButton--editable SubtleTokenButton--subtle SubtleTokenButton AssigneeTokenButton--assigned AssigneeTokenButton AssigneeToken TaskPaneAssigneeToken-assigneeToken" role="button" tabindex="0" aria-disabled="false" aria-describedby="task_pane_assignee_label" aria-expanded="false"><div class="SubtleTokenButton-leftIcon"><div aria-hidden="true" class="AssigneeTokenButton-avatar Avatar AvatarPhoto AvatarPhoto--default AvatarPhoto--small AvatarPhoto--color0" style="background-image: url(&quot;https://s3.amazonaws.com/profile_photos/53283930106304.5490822957495.cPelBpSR2PebMrowdg50_60x60.png&quot;);"></div></div><div class="AssigneeTokenButton-label"><span class="AssigneeToken-label"><span class="AssigneeToken-userNameLabel">Vince Broz</span></span></div><div class="RemoveButton--isEnabled RemoveButton SubtleTokenButton-removeButton RemoveButton--small" role="button" tabindex="0" aria-label="Remove"><svg class="CompoundIcon--small CompoundIcon XCircleCompoundIcon" viewBox="0 0 32 32" aria-hidden="true" focusable="false"><path d="M31,16c0,8.3-6.7,15-15,15S1,24.3,1,16S7.7,1,16,1S31,7.7,31,16z" class="CompoundIcon-outer"></path><path d="M22.5,20.7c0.5,0.5,0.5,1.3,0,1.8c-0.2,0.2-0.5,0.4-0.9,0.4s-0.6-0.1-0.9-0.4L16,17.8l-4.7,4.7c-0.2,0.2-0.5,0.4-0.9,0.4s-0.6-0.1-0.9-0.4C9,22,9,21.2,9.5,20.7l4.7-4.7l-4.7-4.7C9,10.8,9,10,9.5,9.5c0.2-0.2,0.5-0.4,0.9-0.4s0.6,0.1,0.9,0.4l4.7,4.7l4.7-4.7c0.2-0.2,0.5-0.4,0.9-0.4s0.6,0.1,0.9,0.4c0.5,0.5,0.5,1.3,0,1.8L17.8,16L22.5,20.7z" class="CompoundIcon-inner"></path></svg></div></div></html>';
  setPlatform(new TestPlatform());

  const removeButton = htmlElementByClass('RemoveButton', HTMLDivElement);
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
