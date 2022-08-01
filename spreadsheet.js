const fetch = require('node-fetch')
const icons = require("./icons.json")
module.exports = async () => {
	var out2 = await getSpreadsheet("2PACX-1vQvFX6gBzJOJEU01O-R_iuMfCr-5k8aQAvEzumMh9nPKjoe3PcOKiZgfG7OWXX1ahV8Alv325H6UqUu")
	out2 = out2.map(i => {
		i.tags = i.tags.split(",").map(i => i.trim());
		i.realtags = [...i.tags]
		i.tags = i.tags.map(i => `${icons[i.toLowerCase()]} ${i}`);
    i.image = i.image || "https://user-images.githubusercontent.com/61319150/121194902-c3935780-c834-11eb-9e67-4c822cd008ea.png"
		return i;
	})
	console.log(out2)
	console.log(icons["javascript"])
	return out2;
}

async function getSpreadsheet(id, pageNum = 1) {
  if (id.includes("/")){
    //If the ID is a URL
    id = id.split("/")[6]
  }
  //Fetch data from google sheets and get JSON
  const out = await fetch(`https://docs.google.com/spreadsheets/d/e/${id}/pub?output=tsv`).then(res => res.text()).then((res) => {
    res = res.split("\n").map(i => i.split("\t"));
    return res  
  })
  //Now we need to make it into an object based on the table headers.
  var out2 = [];
  for (let item of out) {
    let _temp = {};
    for (let i in item) {
      //Make it a nice object key.
      _temp[
        out[0][i]
          //Lowercase
          .toLowerCase()
          //Replace all non alphanumeric characters
          .replace(/[^a-zA-Z0-9 _]/g, "")
          //Replace spaces with underscores
          .replace(/ /g, "_")
      ] = item[i];
    }
    out2.push(_temp);
  }
  //We assume that the table has headers, so we take off the header row.
  return out2.slice(1);
}