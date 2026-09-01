#!/usr/bin/env node
/**
 * Generate Starlight term pages from src/data/terminology.json
 */
import { mkdir, readFile, writeFile, rm } from 'node:fs/promises';
import { join } from 'node:path';

const root = join(import.meta.dirname, '..');
const dataPath = join(root, 'src/data/terminology.json');
const outDir = join(root, 'src/content/docs/terminology/terms');

const terms = JSON.parse(await readFile(dataPath, 'utf8'));
const bySlug = new Map(terms.map((t) => [t.slug, t]));

function link(slug) {
	const t = bySlug.get(slug);
	if (!t) return slug;
	return `[${t.term}](/terminology/terms/${slug}/)`;
}

function yamlEscape(s) {
	return String(s).replace(/"/g, '\\"');
}

await rm(outDir, { recursive: true, force: true });
await mkdir(outDir, { recursive: true });

for (const t of terms) {
	const related =
		t.related?.length > 0
			? `\n## Related terms\n\n${t.related.map((s) => `- ${link(s)}`).join('\n')}\n`
			: '';

	const notSame =
		t.notSameAs?.length > 0
			? `\n## Not the same as\n\n${t.notSameAs.map((s) => `- ${s}`).join('\n')}\n`
			: '';

	const aliases =
		t.aliases?.length > 0
			? `\n**Also called:** ${t.aliases.map((a) => `*${a}*`).join(', ')}\n`
			: '';

	const body = `---
title: ${yamlEscape(t.term)}
description: ${yamlEscape(t.short || t.term)}
---

${aliases}
## What it means

${t.what}

## How to use this term

${t.usage || '_Use the name consistently in training and on radios._'}
${notSame}${related}
`;

	await writeFile(join(outDir, `${t.slug}.md`), body, 'utf8');
}

// Terminology index — MDX with icon list
const indexPath = join(root, 'src/content/docs/terminology/index.mdx');
const indexBody = `---
title: Terminology
description: Every Arnold Alert and emergency procedure term — click any highlighted word on the site to land here.
---

import TerminologyList from '../../../components/TerminologyList.astro';

When you see a **dotted green link** anywhere on this site, it is a defined term. Click it for what it means and how we use it.

No one should have to guess what **Arnold Alert**, **Code Blue**, or **Fob Arm** means — if it is in the glossary, it is linked.

## A–Z

<TerminologyList />
`;

await mkdir(join(root, 'src/content/docs/terminology'), { recursive: true });
await rm(join(root, 'src/content/docs/terminology/index.md'), { force: true });
await writeFile(indexPath, indexBody, 'utf8');
console.log(`Generated ${terms.length} term pages + index`);
