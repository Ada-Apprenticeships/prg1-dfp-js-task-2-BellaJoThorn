const fs = require('fs');
const { escape } = require('querystring');

function parseFile (indata, outdata, delimiter = ";") {

  if (fs.existsSync(indata)) {

   if (fs.existsSync(outdata)) {
     fs.unlinkSync(outdata);
   }

   const data = fs.readFileSync(indata, "utf-8");
   const lines = data.split(/\n/);

   let review 
   let sentiment

   for (let line of lines) {
     const elements = line.split(delimiter);
     const review = elements[0].slice(0, 20)
     const sentiment = elements[1]
     if (review != "review"){
     fs.appendFileSync(outdata, `${sentiment};${review}\n`, "utf-8");
     }
   }

 } else return "-1"

}


parseFile("datafile.csv", "outputfile.csv")

  



// Leave this code here for the automated tests
module.exports = {
  parseFile,
}