import getIcons from "./getIcons.js";
import getSpreadsheet from "./spreadsheet.js";

export default async () => {
    const icons = await getIcons();

	var out2 = await getSpreadsheet(
		'2PACX-1vQvFX6gBzJOJEU01O-R_iuMfCr-5k8aQAvEzumMh9nPKjoe3PcOKiZgfG7OWXX1ahV8Alv325H6UqUu'
	);
	out2 = out2.map((i) => {
		i.tags = i.tags.split(',').map((i) => i.trim());
		i.realtags = [...i.tags];
		i.tags = i.tags.map((i) => `${icons[i.toLowerCase()]} ${i}`);
		i.image =
			i.image ||
			'https://user-images.githubusercontent.com/61319150/121194902-c3935780-c834-11eb-9e67-4c822cd008ea.png';
		return i;
	});
	return out2;
};
