/**
 * Get a spreadsheet's contents from google sheets
 * @param {String} id The ID of the spreadsheet
 * @returns Array<Object> An array of items in the spreadsheet. The first row of the spreadsheet should be a headers row that contains the key values for this object.
 * @example
 * // If you have this table:
 * // ╔═══════╦═════════════════════╗
 * // ║ Name  ║ Birthday            ║
 * // ╠═══════╬═════════════════════╣
 * // ║ John  ║ January 3rd, 1976   ║
 * // ╠═══════╬═════════════════════╣
 * // ║ Jane  ║ April 8th, 2002     ║
 * // ╠═══════╬═════════════════════╣
 * // ║ Bob   ║ June 14th, 1997     ║
 * // ╠═══════╬═════════════════════╣
 * // ║ Epoch ║ December 31st, 1969 ║
 * // ╚═══════╩═════════════════════╝
 *
 * // You could run this
 * const table = await getTable("<SPREADSHEET_ID>");
 *
 * // table ===
 * // [
 * //     {
 * //         "name": "John",
 * //         "birthday": "January 3rd, 1976"
 * //     },
 * //     {
 * //         "name": "Jane",
 * //         "birthday": "April 8th, 2002"
 * //     },
 * //     {
 * //         "name": "Bob",
 * //         "birthday": "Hune 14th, 1997"
 * //     },
 * //     {
 * //         "name": "Epoch",
 * //         "birthday": "December 31st, 1969"
 * //     }
 * // ]
 */
export default async function getSpreadsheet(id) {
	if (id.includes('/')) {
		//If the ID is a URL
		id = id.split('/')[6];
	}
	//Fetch data from google sheets and get JSON
	const out = await fetch(`https://docs.google.com/spreadsheets/d/e/${id}/pub?output=tsv`)
		.then((res) => res.text())
		.then((res) => {
			return res.split('\n').map((i) => i.split('\t'));
		});
	//Now we need to make it into an object based on the table headers.
	var out2 = [];
	for (let item of out) {
		let _temp = {};
		for (let i in item) {
			//Make it a nice object key.
			const key = out[0][i]
				//Lowercase
				.toLowerCase()
				//Replace all non alphanumeric characters
				.replace(/[^a-zA-Z0-9 _]/g, '')
				//Replace spaces with underscores
				.replace(/ /g, '_');

			_temp[key] = item[i];
		}
		out2.push(_temp);
	}
	//We assume that the table has headers, so we take off the header row.
	return out2.slice(1);
}
