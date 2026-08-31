/**
 * Auto-link glossary terms in markdown body text.
 */
import { visitParents } from 'unist-util-visit-parents';

const SKIP_ANCESTOR = new Set([
	'link',
	'inlineCode',
	'code',
	'definition',
	'yaml',
	'html',
	'heading',
]);

function escapeRegex(s) {
	return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function buildMatchers(terms) {
	const phrases = [];
	for (const t of terms) {
		for (const phrase of [t.term, ...(t.aliases || [])]) {
			if (!phrase?.trim()) continue;
			phrases.push({
				slug: t.slug,
				regex: new RegExp(`(?<![\\w/])${escapeRegex(phrase)}(?![\\w])`, 'gi'),
			});
		}
	}
	return phrases.sort((a, b) => b.regex.source.length - a.regex.source.length);
}

function splitText(value, matchers) {
	if (!value) return [{ type: 'text', value: '' }];

	const parts = [];
	let rest = value;

	while (rest.length > 0) {
		let earliest = null;
		for (const m of matchers) {
			m.regex.lastIndex = 0;
			const match = m.regex.exec(rest);
			if (!match) continue;
			if (!earliest || match.index < earliest.index) {
				earliest = {
					index: match.index,
					length: match[0].length,
					slug: m.slug,
					text: match[0],
				};
			}
		}
		if (!earliest) {
			parts.push({ type: 'text', value: rest });
			break;
		}
		if (earliest.index > 0) {
			parts.push({ type: 'text', value: rest.slice(0, earliest.index) });
		}
		parts.push({
			type: 'link',
			url: `/terminology/terms/${earliest.slug}/`,
			children: [{ type: 'text', value: earliest.text }],
			data: { hProperties: { className: ['term-link'] } },
		});
		rest = rest.slice(earliest.index + earliest.length);
	}

	return parts;
}

export function remarkGlossary(options = {}) {
	const matchers = buildMatchers(options.terms || []);

	return (tree, file) => {
		const path = file.path || file.history?.[0] || '';
		if (path.includes('terminology/terms')) return;

		visitParents(tree, 'text', (node, ancestors) => {
			const parent = ancestors[ancestors.length - 1];
			if (!parent || typeof parent.children === 'undefined') return;
			if (ancestors.some((a) => SKIP_ANCESTOR.has(a.type))) return;

			const idx = parent.children.indexOf(node);
			if (idx === -1) return;

			const replacement = splitText(node.value, matchers);
			if (replacement.length === 1 && replacement[0].type === 'text') return;

			parent.children.splice(idx, 1, ...replacement);
		});
	};
}
