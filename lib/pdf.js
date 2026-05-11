function escapePdfText(value = '') {
  return String(value)
    .replace(/\\/g, '\\\\')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)');
}

function wrapLine(value, maxLength = 84) {
  const words = String(value || '').split(/\s+/).filter(Boolean);
  if (!words.length) return [''];

  const lines = [];
  let current = words[0];

  for (const word of words.slice(1)) {
    const next = `${current} ${word}`;
    if (next.length <= maxLength) {
      current = next;
    } else {
      lines.push(current);
      current = word;
    }
  }

  lines.push(current);
  return lines;
}

function formatDate(value) {
  if (!value) return 'Not available';
  return new Intl.DateTimeFormat('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value));
}

function applicationLines(application, index, total) {
  return [
    'Ignite360 application record',
    `Record ${index + 1} of ${total}`,
    '',
    `Applicant: ${application.name || 'Not provided'}`,
    `Email: ${application.email || 'Not provided'}`,
    `Phone: ${application.phone || 'Not provided'}`,
    `Programme: ${application.courseSelection || 'Not provided'}`,
    `Organisation: ${application.organization || 'Not provided'}`,
    `Status: ${application.status || 'pending'}`,
    `Submitted: ${formatDate(application.createdAt)}`,
    application.reviewedAt ? `Last reviewed: ${formatDate(application.reviewedAt)}` : 'Last reviewed: Not reviewed yet',
    '',
    'Motivation essay',
    ...wrapLine(application.motivation || 'Not provided', 82),
  ];
}

function buildPages(applications) {
  const pages = [];
  let current = [];
  let lineCount = 0;
  const maxLines = 34;

  applications.forEach((application, index) => {
    const lines = applicationLines(application, index, applications.length);

    lines.forEach((line) => {
      if (lineCount >= maxLines) {
        pages.push(current);
        current = [];
        lineCount = 0;
      }

      current.push(line);
      lineCount += 1;
    });

    if (index < applications.length - 1) {
      if (lineCount + 2 > maxLines) {
        pages.push(current);
        current = [];
        lineCount = 0;
      }

      current.push('');
      current.push('------------------------------------------------------------');
      lineCount += 2;
    }
  });

  if (current.length) {
    pages.push(current);
  }

  return pages;
}

export function createApplicationsPdf(applications) {
  const safeApplications = Array.isArray(applications) ? applications : [];
  const pages = buildPages(safeApplications.length ? safeApplications : [{ motivation: 'No applications found.' }]);
  const objects = [];

  const catalogId = 1;
  const pagesId = 2;
  const fontId = 3;
  let nextId = 4;
  const pageObjectIds = [];

  const pageEntries = pages.map((lines) => {
    const contentLines = [
      'BT',
      '/F1 12 Tf',
      '50 790 Td',
      '14 TL',
    ];

    lines.forEach((line, index) => {
      if (index === 0) {
        contentLines.push(`(${escapePdfText(line)}) Tj`);
      } else {
        contentLines.push('T*');
        contentLines.push(`(${escapePdfText(line)}) Tj`);
      }
    });

    contentLines.push('ET');
    const stream = contentLines.join('\n');
    const contentId = nextId++;
    const pageId = nextId++;

    pageObjectIds.push(pageId);
    objects[contentId] = `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`;
    objects[pageId] = `<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 ${fontId} 0 R >> >> /Contents ${contentId} 0 R >>`;

    return { pageId };
  });

  objects[catalogId] = `<< /Type /Catalog /Pages ${pagesId} 0 R >>`;
  objects[pagesId] = `<< /Type /Pages /Count ${pageEntries.length} /Kids [${pageObjectIds.map((id) => `${id} 0 R`).join(' ')}] >>`;
  objects[fontId] = '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>';

  let pdf = '%PDF-1.4\n';
  const offsets = [0];

  for (let id = 1; id < objects.length; id += 1) {
    offsets[id] = pdf.length;
    pdf += `${id} 0 obj\n${objects[id]}\nendobj\n`;
  }

  const xrefOffset = pdf.length;
  pdf += `xref\n0 ${objects.length}\n`;
  pdf += '0000000000 65535 f \n';

  for (let id = 1; id < objects.length; id += 1) {
    pdf += `${String(offsets[id]).padStart(10, '0')} 00000 n \n`;
  }

  pdf += `trailer\n<< /Size ${objects.length} /Root ${catalogId} 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;
  return Buffer.from(pdf, 'binary');
}
