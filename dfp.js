const fs = require('fs');

function parseFile (indata, outdata, delimiter = ";") {

  if (fs.existsSync(indata)) {

   if (fs.existsSync(outdata)) {
     fs.unlinkSync(outdata);
   }

   const data = fs.readFileSync(indata, "utf-8");
   const lines = data.split(/\n/);

   let review 
   let sentiment
   let numRecords = 0
   delimiter = lines[0].at(6)

   for (let line of lines) {
     const elements = line.split(delimiter);
     const review = elements[0].trim().slice(0, 20)
     const sentiment = elements[1].trim()
     if (review != "review"){
     fs.appendFileSync(outdata, `${sentiment}${delimiter}${review}\n`, "utf-8");
     numRecords++
     }

    }

    return numRecords
    
 } else return -1

}


parseFile("datafile.csv", "outputfile.csv")

  



// Leave this code here for the automated tests
module.exports = {
  parseFile,
}