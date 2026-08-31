// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { remarkGlossary } from './src/plugins/remark-glossary.mjs';
import terminology from './src/data/terminology.json';

// https://astro.build/config
export default defineConfig({
	site: 'https://emergency.arnoldcoc.org',
	markdown: {
		remarkPlugins: [[remarkGlossary, { terms: terminology }]],
	},
	integrations: [
		starlight({
			title: 'Arnold Emergency',
			description:
				'Emergency response procedures for Arnold Church of Christ — the live source of truth.',
			logo: { alt: 'Arnold Emergency', src: './src/assets/logo.svg' },
			customCss: ['./src/styles/custom.css'],
			components: {
				PageFrame: './src/components/PageFrame.astro',
				PageTitle: './src/components/PageTitle.astro',
				Hero: './src/components/Hero.astro',
				SidebarSublist: './src/components/SidebarSublist.astro',
			},
			editLink: {
				baseUrl: 'https://github.com/BadBraddA1/arnold-emergency/edit/main/',
			},
			social: [
				{
					icon: 'github',
					label: 'GitHub',
					href: 'https://github.com/BadBraddA1/arnold-emergency',
				},
			],
			head: [
				{
					tag: 'meta',
					attrs: { name: 'robots', content: 'noindex, nofollow' },
				},
			],
			sidebar: [
				{
					label: 'Start here',
					items: [
						{ label: 'Overview', slug: 'index' },
						{ label: 'Campus audio — hear clips', slug: 'system/campus-audio' },
						{ label: 'Quick reference', slug: 'quick-reference' },
						{ label: 'Terminology', slug: 'terminology' },
					],
				},
				{
					label: 'Emergency codes',
					items: [
						{ label: 'Codes overview', slug: 'codes/overview' },
						{ label: 'Code Red — Evacuate', slug: 'codes/code-red' },
						{ label: 'Code Blue — Lockdown', slug: 'codes/code-blue' },
						{ label: 'All clear', slug: 'codes/all-clear' },
					],
				},
				{
					label: 'People & process',
					items: [
						{ label: 'Roles & responsibilities', slug: 'roles' },
						{ label: 'Who may trigger a code', slug: 'triggers' },
						{ label: 'Medical emergency (draft)', slug: 'medical-emergency' },
						{ label: 'Communication checklist', slug: 'communication' },
						{ label: 'Training & drills', slug: 'training' },
						{ label: 'Post-incident', slug: 'post-incident' },
						{ label: 'Leadership approval', slug: 'approval' },
					],
				},
				{
					label: 'Arnold Alert (system)',
					items: [
						{ label: 'How the system works', slug: 'system/arnold-alert' },
						{ label: 'Arm & standby', slug: 'system/arm-standby' },
						{ label: 'System limits', slug: 'system/limits' },
						{ label: 'Naming guide', slug: 'system/naming' },
					],
				},
				{
					label: 'Terminology (A–Z)',
					items: [{ autogenerate: { directory: 'terminology/terms' } }],
				},
				{
					label: 'Classrooms',
					items: [
						{ label: 'Room evacuation posters', slug: 'classroom/room-posters' },
						{ label: 'Room handout template', slug: 'classroom/handout-template' },
						{ label: 'Edit & publish', slug: 'contributing' },
					],
				},
			],
		}),
	],
});
