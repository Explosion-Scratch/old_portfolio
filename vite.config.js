import { sveltekit } from '@sveltejs/kit/vite';
import { presetIcons, presetWind, presetAttributify } from 'unocss';
import Unocss from 'unocss/vite';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [
		sveltekit(),

		Unocss({
			presets: [presetAttributify(), presetWind(), presetIcons()]
		})
	]
};

export default config;
