const fs = require('fs');

function parseFile (indata, outdata, delimiter = ";") {

//Returns -1 if the input file does not exits 
  if (!fs.existsSync(indata)) {
   return -1; 
  }

//Deletes the current output file 
  fs.existsSync(outdata) ? fs.unlinkSync(outdata) : false

//Splits the input file in ot an array by line
  const data = fs.readFileSync(indata, "utf-8");
  const lines = data.split(/\n/);

  let review 
  let sentiment
  let numRecords = 0
//Re assisgns the delimiter to the specific in the given input file
  delimiter = lines[0].at(6)

//Iterates through the lines array to find the reviews and sentiments
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    const elements = line.split(delimiter);
    const review = elements[0].trim().slice(0, 20)
    const sentiment = elements[1].trim()

    //Appends the reviews and sentiments to the output file
    fs.appendFileSync(outdata, `${sentiment}${delimiter}${review}\n`, "utf-8");
    numRecords++
  }
  return numRecords
}




parseFile("datafile.csv", "outputfile.csv")

  



// Leave this code here for the automated tests
module.exports = {
  parseFile,
}