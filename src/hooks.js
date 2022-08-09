import getIcons from './helpers/getIcons.js';
import getProjects from './helpers/getProjects.js';
import buildReadme from './helpers/buildReadme.js';

buildReadme();

const icons = getIcons();
const projects = getProjects();

// I know this isn't really what sessions are intended for but it just works so well!
export async function getSession() {
	return {
		icons: await icons,
		projects: await projects
	};
}
