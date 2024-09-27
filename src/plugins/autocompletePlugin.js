import { Plugin } from 'prosemirror-state';
import { Decoration, DecorationSet } from 'prosemirror-view'; // Corrected import for Decoration and DecorationSet
import { fakeData } from '../data/fakeData'; // Import fake data for suggestions

// Function to find the trigger character in the text
function findTrigger(state, triggers) {
  const { $from } = state.selection;
  const text = $from.parent.textBetween(0, $from.parent.content.size, null, '\ufffc');
  let triggerPos = -1;
  let triggerChar = null;

  triggers.forEach(trigger => {
    const pos = text.lastIndexOf(trigger, $from.parentOffset - 1);
    if (pos > triggerPos) {
      triggerPos = pos;
      triggerChar = trigger;
    }
  });

  console.log('Trigger detected:', { triggerChar, triggerPos });
  return { triggerPos, triggerChar };
}

// Function to get suggestions based on trigger and match string
function getSuggestions(triggerChar, match) {
  console.log(`Getting suggestions for: ${triggerChar}${match}`);
  switch (triggerChar) {
    case '#':
      return fakeData.hashtags.filter(item => item.startsWith(`#${match}`));
    case '@':
      return fakeData.users.filter(item => item.startsWith(`@${match}`));
    case '<>':
      return fakeData.ideas.filter(item => item.includes(match));
    default:
      return [];
  }
}

const autocompletePlugin = new Plugin({
  state: {
    init() {
      return {
        active: false,
        triggerPos: null,
        triggerChar: null,
        suggestions: [],
        match: '',
      };
    },
    apply(tr, prev) {
      const { triggerPos, triggerChar } = findTrigger(tr.doc.resolve(tr.selection.from), ['#', '@', '<>']);
      if (triggerPos !== -1) {
        const match = tr.doc.textBetween(triggerPos + 1, tr.selection.from, null, '\ufffc');
        const suggestions = getSuggestions(triggerChar, match);
        console.log('Suggestions found:', suggestions);
        return { active: true, triggerPos, triggerChar, suggestions, match };
      }
      return { ...prev, active: false };
    },
  },
  props: {
    decorations(state) {
      const { active, suggestions, triggerPos } = this.getState(state);
      if (!active || suggestions.length === 0) return null;

      const deco = Decoration.widget(triggerPos + 1, () => {
        const div = document.createElement('div');
        div.className = 'autocomplete-suggestions';
        suggestions.forEach((suggestion, index) => {
          const option = document.createElement('div');
          option.className = 'autocomplete-suggestion';
          option.textContent = suggestion;
          if (index === 0) option.classList.add('highlighted');
          div.appendChild(option);
        });
        return div;
      });
      return DecorationSet.create(state.doc, [deco]);
    },
    handleKeyDown(view, event) {
      const { active, suggestions, triggerPos } = this.getState(view.state);
      if (!active) return false;

      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        // Handle navigation
        event.preventDefault();
        console.log('Navigating suggestions...');
        // Add logic for handling navigation (highlighting suggestions)
        return true;
      } else if (event.key === 'Enter' || event.key === 'Tab') {
        // Handle selection
        event.preventDefault();
        if (suggestions.length > 0) {
          view.dispatch(
            view.state.tr.replaceWith(triggerPos + 1, view.state.selection.to, view.state.schema.text(suggestions[0]))
          );
          console.log(`Selected suggestion: ${suggestions[0]}`);
        }
        return true;
      }
      return false;
    },
  },
});

export default autocompletePlugin;

