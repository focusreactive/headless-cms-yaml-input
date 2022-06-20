/* eslint-disable no-restricted-syntax */
import {
  EditorView,
  Decoration,
  ViewPlugin,
  DecorationSet,
} from '@codemirror/view';
import { Facet, RangeSetBuilder } from '@codemirror/state';

const baseTheme = EditorView.baseTheme({
  '&light .cm-zebraStripe': { backgroundColor: '#f4fafa' },
  '&dark .cm-zebraStripe': { backgroundColor: '#1a2727' },
});

const stepSize = Facet.define({
  combine: (val) => val[0],
});

const stripe = Decoration.line({
  attributes: { class: 'cm-zebraStripe' },
});

function stripeDeco(view) {
  const step = view.state.facet(stepSize);
  const builder = new RangeSetBuilder();
  for (const { from, to } of view.visibleRanges) {
    for (let pos = from; pos <= to; ) {
      const line = view.state.doc.lineAt(pos);
      if (line.number % step === 0) builder.add(line.from, line.from, stripe);
      pos = line.to + 1;
    }
  }
  return builder.finish();
}

const showStripes = ViewPlugin.fromClass(
  class {
    decorations = DecorationSet;

    constructor(view) {
      this.decorations = stripeDeco(view);
    }

    update(update) {
      if (update.docChanged || update.viewportChanged)
        this.decorations = stripeDeco(update.view);
    }
  },
  {
    decorations: (v) => v.decorations,
  },
);

export function zebraStripes(options = {}) {
  window.stepSize = stepSize;
  return [baseTheme, stepSize.of(options?.step || 2), showStripes];
}
