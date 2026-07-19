const { test } = require('node:test');
const assert = require('node:assert/strict');
const { classifyLine } = require('./export-docx.js');

test('classifies heading levels', () => {
  assert.deepEqual(classifyLine('# Título'), { type: 'heading1', text: 'Título' });
  assert.deepEqual(classifyLine('## Sub'), { type: 'heading2', text: 'Sub' });
  assert.deepEqual(classifyLine('### Sub-sub'), { type: 'heading3', text: 'Sub-sub' });
});

test('classifies bullets', () => {
  assert.deepEqual(classifyLine('- item um'), { type: 'bullet', text: 'item um' });
});

test('classifies table separator rows distinctly from table rows', () => {
  assert.equal(classifyLine('|---|---|').type, 'table-separator');
  assert.equal(classifyLine('| a | b |').type, 'table-row');
});

test('splits table row cells trimmed, ignoring outer pipes', () => {
  const row = classifyLine('| Coluna A | Coluna B |');
  assert.deepEqual(row.cells, ['Coluna A', 'Coluna B']);
});

test('classifies blank lines', () => {
  assert.equal(classifyLine('').type, 'blank');
  assert.equal(classifyLine('   ').type, 'blank');
});

test('classifies anything else as a paragraph', () => {
  assert.deepEqual(classifyLine('Texto qualquer.'), { type: 'paragraph', text: 'Texto qualquer.' });
});
