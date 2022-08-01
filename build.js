const fetch = require("node-fetch")
;(async () => {
	const fs = require("fs");
	const data = require("./spreadsheet.js");
	var stuff = await data();
	var out = "<hr>\n<div align=center><h1>Projects Directory</h1></div>\n<hr>\n\nA list of all the projects I've made and I'm still working on!"
	for (let j of stuff){
		out += `
# ${j.title}
<i>${j.realtags.map(i => i[0].toUpperCase() + i.slice(1)).join(" • ")}</i>
<hr/>

<div align=center><img src="${j.image}" width=400></div>

${j.description}

Project link: ${j.link}

Code link: ${j.code_link}


	`
	}
	fs.writeFileSync("README.md", out);

	var icons = await getSpreadsheet("https://docs.google.com/spreadsheets/d/e/2PACX-1vRP94O83o7kEYSg73lBCNPezhlWYyWBekwytNoCHfUhSGuTsRRGJ-z1hvBnDidV0xBFv4Oae6LVfyyc/pubhtml");
	
	out = {};
	for (let icon of icons){
		out[icon.name.toLowerCase()] = icon.icon;
	}

	fs.writeFileSync("./icons.json", JSON.stringify(out, null, 2))
})()



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