import { Plugin } from 'prosemirror-state';

const autocompletePlugin = new Plugin({
  view(editorView) {
    return {
      update(view, prevState) {
        const { state } = view;
        // Check for autocomplete triggers and display suggestion box accordingly.
      },
    };
  },
});

export default autocompletePlugin;

