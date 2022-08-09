import getSpreadsheet from './spreadsheet';
import fs from 'fs';
import getProjects from './getProjects';

export default async function () {
	const projects = await getProjects();
	let out =
		"<hr>\n<div align=center><h1>Projects Directory</h1></div>\n<hr>\n\nA list of all the projects I've made and I'm still working on!";
	for (let j of projects) {
		out += `
# ${j.title}
<i>${j.realtags.map((i) => i[0].toUpperCase() + i.slice(1)).join(' • ')}</i>
<hr/>
<div align=center><img src="${j.image}" width=400></div>
${j.description}
Project link: ${j.link}
Code link: ${j.code_link}
	`;
	}
	fs.writeFileSync('PROJECTS.md', out);
	return out;
}
