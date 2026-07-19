const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, HeadingLevel, ShadingType } = require('docx');
const fs = require('fs');
const path = require('path');

const PRIMARY = "1A365D";
const WHITE = "FFFFFF";

function classifyLine(line) {
  const trimmed = line.trim();
  if (trimmed === '') return { type: 'blank' };
  if (/^#{1,3}\s+/.test(trimmed)) {
    const level = trimmed.match(/^(#{1,3})/)[1].length;
    return { type: `heading${level}`, text: trimmed.replace(/^#{1,3}\s+/, '') };
  }
  if (/^-\s+/.test(trimmed)) {
    return { type: 'bullet', text: trimmed.replace(/^-\s+/, '') };
  }
  if (/^\|?[\s:|-]+\|?$/.test(trimmed) && trimmed.includes('-')) {
    return { type: 'table-separator' };
  }
  if (/^\|.*\|$/.test(trimmed)) {
    const cells = trimmed.slice(1, -1).split('|').map(c => c.trim());
    return { type: 'table-row', cells };
  }
  return { type: 'paragraph', text: trimmed };
}

function headingParagraph(text, level) {
  const headingLevel = { 1: HeadingLevel.HEADING_1, 2: HeadingLevel.HEADING_2, 3: HeadingLevel.HEADING_3 }[level];
  return new Paragraph({ heading: headingLevel, spacing: { before: 300, after: 100 }, children: [new TextRun({ text, bold: true, color: PRIMARY })] });
}

function paraParagraph(text) {
  return new Paragraph({ spacing: { after: 120 }, children: [new TextRun({ text, size: 22 })] });
}

function bulletParagraph(text) {
  return new Paragraph({ bullet: { level: 0 }, spacing: { after: 60 }, children: [new TextRun({ text, size: 22 })] });
}

function tableRowEl(cells, isHeader) {
  return new TableRow({
    children: cells.map(text => new TableCell({
      width: { size: 100 / cells.length, type: WidthType.PERCENTAGE },
      shading: isHeader ? { type: ShadingType.SOLID, color: PRIMARY } : undefined,
      children: [new Paragraph({ children: [new TextRun({ text, size: 20, bold: isHeader, color: isHeader ? WHITE : "333333" })] })]
    }))
  });
}

function buildDocChildren(markdown) {
  const lines = markdown.split('\n');
  const children = [];
  let tableRows = null;

  const flushTable = () => {
    if (tableRows && tableRows.length) {
      children.push(new Table({ width: { size: 100, type: WidthType.PERCENTAGE }, rows: tableRows }));
    }
    tableRows = null;
  };

  for (const line of lines) {
    const c = classifyLine(line);
    if (c.type === 'table-row') {
      if (!tableRows) tableRows = [];
      tableRows.push(tableRowEl(c.cells, tableRows.length === 0));
      continue;
    }
    if (c.type === 'table-separator') continue; // marks header/body boundary, not rendered
    flushTable();
    if (c.type === 'heading1') children.push(headingParagraph(c.text, 1));
    else if (c.type === 'heading2') children.push(headingParagraph(c.text, 2));
    else if (c.type === 'heading3') children.push(headingParagraph(c.text, 3));
    else if (c.type === 'bullet') children.push(bulletParagraph(c.text));
    else if (c.type === 'paragraph') children.push(paraParagraph(c.text));
    // blank: skip
  }
  flushTable();
  return children;
}

async function exportDocx(mdPath) {
  const markdown = fs.readFileSync(mdPath, 'utf-8');
  const doc = new Document({
    styles: { default: { document: { run: { font: "Calibri", size: 22 } } } },
    sections: [{ properties: { page: { margin: { top: 1000, bottom: 1000, left: 1200, right: 1200 } } }, children: buildDocChildren(markdown) }]
  });
  const buffer = await Packer.toBuffer(doc);
  const outPath = mdPath.replace(/\.md$/, '.docx');
  fs.writeFileSync(outPath, buffer);
  console.log(`Written: ${outPath}`);
}

module.exports = { classifyLine, buildDocChildren };

if (require.main === module) {
  const mdPath = process.argv[2];
  if (!mdPath) {
    console.error('Uso: node scripts/export-docx.js <arquivo.md>');
    process.exit(1);
  }
  exportDocx(path.resolve(mdPath)).catch(err => { console.error(err); process.exit(1); });
}
