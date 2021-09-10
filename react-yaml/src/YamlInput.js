import React from 'react';
import { StreamLanguage } from '@codemirror/stream-parser';
import { yaml } from '@codemirror/legacy-modes/mode/yaml';
import { EditorView, EditorState, basicSetup } from '@codemirror/basic-setup';
import { keymap, Range, Decoration } from '@codemirror/view';
import { indentWithTab } from '@codemirror/commands';
import { StateField, StateEffect } from '@codemirror/state';
import { Tooltip, hoverTooltip } from '@codemirror/tooltip';

// Effects can be attached to transactions to communicate with the extension
const addMarks = StateEffect.define();
const filterMarks = StateEffect.define();

// This value must be added to the set of extensions to enable this
const markFieldExtension = StateField.define({
  // Start with an empty set of decorations
  create() {
    return Decoration.none;
  },
  // This is called whenever the editor updates—it computes the new set
  update(prevValue, tr) {
    // Move the decorations to account for document changes
    let newValue = prevValue.map(tr.changes);
    // If this transaction adds or removes decorations, apply those changes
    // eslint-disable-next-line no-restricted-syntax
    for (const effect of tr.effects) {
      if (effect.is(addMarks)) {
        newValue = newValue.update({ add: effect.value, sort: true });
      }
      if (effect.is(filterMarks)) {
        newValue = newValue.update({ filter: effect.value });
      }
    }
    return newValue;
  },
  // Indicate that this field provides a set of decorations
  provide: (f) => EditorView.decorations.from(f),
});

const errorMark = Decoration.mark({
  attributes: {
    style: 'background-color: rgba(255, 0, 0, 0.5)',
  },
});

const YamlInput = ({
  value = '',
  onChange = () => null,
  error,
  options: { theme = undefined, handleTabs = false } = {},
}) => {
  const mount = React.useRef(null);
  const view = React.useRef(null);
  const currentValue = React.useRef(value);

  const handleChange = (viewUpdate) => {
    const newValue = viewUpdate.state.doc;

    if (newValue !== currentValue.current) {
      currentValue.current = newValue;
      onChange(newValue);
    }
  };

  const errorHover = hoverTooltip((view, pos, side) => {
    // const { from, to, text } = view.state.doc.lineAt(pos);
    const hasErrors = view.state.field(markFieldExtension)?.size;
    if (!hasErrors) {
      console.log('no error');
      return null;
    }
    return {
      pos,
      above: true,
      create(view) {
        console.log(
          '🚀 ~ file: YamlInput.js ~ line 46 ~ errorHover ~ view',
          view,
        );
        const dom = document.createElement('div');
        dom.style = 'width: 100px; height: 100px';
        dom.textContent = 'error';
        return { dom };
      },
    };
  });

  const initEditor = () => {
    const extensions = [
      basicSetup,
      StreamLanguage.define(yaml),
      EditorView.updateListener.of(handleChange),
      handleTabs && keymap.of([indentWithTab]),
      markFieldExtension,
      errorHover,
      theme,
    ].filter(Boolean);

    const state = EditorState.create({
      doc: value,
      extensions,
    });
    view.current = new EditorView({ state, parent: mount?.current });
    window.view = view.current;
    window.markFieldExtension = markFieldExtension;
  };

  React.useEffect(() => {
    if (!mount.current) {
      throw new Error(`Can't find a mounting point for YamlEditor`);
    }
    initEditor();

    return () => view.current.destroy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme]);

  React.useEffect(
    () => {
      if (!error) {
        console.log('🚀 clear errors', error);
        view.current.dispatch({
          effects: filterMarks.of((from, to) => false),
        });
        return;
      }

      const textLength = view.current.state.doc.length;
      const fromPosition =
        error.position + 1 <= textLength - 1
          ? error.position
          : error.position - 1;
      const toPosition = fromPosition + 1;
      console.log('🚀 textLength', {
        textLength,
        fromPosition,
        toPosition,
        'error.position': error.position,
        'relly?': error.position + 1 <= textLength - 1,
      });

      view.current.dispatch({
        effects: addMarks.of([errorMark.range(fromPosition, toPosition)]),
      });
    } /* [error] */,
  );

  return <div ref={mount} />;
};

export default YamlInput;