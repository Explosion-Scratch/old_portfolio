import getSpreadsheet from './spreadsheet';
import { writeFileSync } from 'fs';

export default async () => {
	const icons = await getSpreadsheet(
		`2PACX-1vRP94O83o7kEYSg73lBCNPezhlWYyWBekwytNoCHfUhSGuTsRRGJ-z1hvBnDidV0xBFv4Oae6LVfyyc`
	);
	let out = {};

	for (let icon of icons) {
		out[icon.name.toLowerCase()] = icon.icon;
	}

	writeFileSync('./icons.json', JSON.stringify(out, null, 2));
	return out;
};
