// src/components/Editor.js
import React, { useEffect, useRef } from 'react';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { schema } from 'prosemirror-schema-basic';
import { keymap } from 'prosemirror-keymap';
import { history } from 'prosemirror-history';
import autocompletePlugin from '../plugins/autocompletePlugin'; // Import the autocomplete plugin

const Editor = () => {
  const editorRef = useRef();

  useEffect(() => {
    if (!editorRef.current) return;

    const state = EditorState.create({
      schema,
      plugins: [
        keymap({ "Mod-z": history.undo, "Mod-y": history.redo }),
        history(),
        autocompletePlugin // Add the autocomplete plugin here
      ],
    });

    new EditorView(editorRef.current, {
      state,
      dispatchTransaction(transaction) {
        const newState = this.state.apply(transaction);
        this.updateState(newState);
      },
    });
  }, []);

  return <div ref={editorRef} className="editor"></div>;
};

const state = EditorState.create({
  schema,
  plugins: [
    keymap({ "Mod-z": history.undo, "Mod-y": history.redo }),
    history(),
    autocompletePlugin  // Ensure the plugin is included here
  ],
});

export default Editor;

