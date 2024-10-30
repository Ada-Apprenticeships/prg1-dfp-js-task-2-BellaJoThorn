const fs = require('fs');

function parseFile (indata, outdata) {
  
  //Returns -1 if the input file does not exits 
  if (!fs.existsSync(indata)) {
    return -1; 
  }
  
  //Deletes the current output file 
  fs.existsSync(outdata) ? fs.unlinkSync(outdata) : false;
  
  //Reads the input file in read only mode and splits it into lines 
  const data = fs.readFileSync(indata, {encoding: "utf-8", flag: 'r'});
  const lines = data.split(/\n/);
  
  // Initialize a counter for the number of records processed
  let numRecords = 0;
  
  //Extracts the delimiter from the first line of the file
  const delimiter = lines[0].at(6);
  
  //Processes each line to extract and format review data
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    const elements = line.split(delimiter);
    const review = elements[0].trim().slice(0, 20);
    const sentiment = elements[1].trim();

    //Appends the formatted reviews and sentiments to the output file
    fs.appendFileSync(outdata, `${sentiment}${delimiter}${review}\n`, "utf-8");
    numRecords++;
  }

  return numRecords;
  
}

// Leave this code here for the automated tests
module.exports = {
  parseFile,
}