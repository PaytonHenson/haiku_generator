var fs = require("fs");

var cmudictFile = readCmudictFile('./cmudict.txt');

function readCmudictFile(file){
  return fs.readFileSync(file).toString();
}

function formatData(data){

  var masterArr = [[],[],[],[],[],[],[],[],[],[]];

  var wordAndPhonemes = data.toString().split("\n");
   
  for (var i = 0; i < wordAndPhonemes.length; i++) {
    
    wordAndPhonemes[i] = wordAndPhonemes[i].split("  ");
    
    if(wordAndPhonemes[i][1] !== undefined) {
      
      if (wordAndPhonemes[i][1].match(/\d/g) !== null) {

        if (wordAndPhonemes[i][1].match(/\d/g).length !== 12 && wordAndPhonemes[i][1].match(/\d/g).length !== 14) {
          
          masterArr[wordAndPhonemes[i][1].match(/\d/g).length].push(wordAndPhonemes[i][0]); 

        }
      }
      
      else {
        masterArr[0].push(wordAndPhonemes[i][0]);
      }
    }
  }


  

  return masterArr;

  
}

var inputWords = formatData(cmudictFile);

function createHaiku(structure, syllabelsArr){
  var arrOfWords;
  return structure.map(function(lines){
    return lines.map(function(syls){
      arrOfWords = syllabelsArr[syls];
      return arrOfWords[Math.floor(Math.random() * arrOfWords.length)];
    }).join(' ');
  }).join('\n');
}

console.log(createHaiku([[4, 1],[3, 3, 1],[1, 4]], inputWords));


