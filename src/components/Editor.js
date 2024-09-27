// src/components/Editor.js
import React, { useEffect, useRef } from 'react';
import { EditorState } from 'prosemirror-state';
import { EditorView, basicSetup } from 'prosemirror-view';
import { Schema, DOMParser } from 'prosemirror-model';
import { schema } from 'prosemirror-schema-basic';
import { keymap } from 'prosemirror-keymap';
import { history } from 'prosemirror-history';

const Editor = () => {
  const editorRef = useRef();

  useEffect(() => {
    if (!editorRef.current) return;

    const state = EditorState.create({
      schema,
      plugins: [
        keymap({ "Mod-z": history.undo, "Mod-y": history.redo }),
        history()
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

export default Editor;

