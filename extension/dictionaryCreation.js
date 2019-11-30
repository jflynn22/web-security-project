var charLength = {
    'a': 5,
    'b': 6,
    'c': 5,
    'd': 6,
    'e': 5,
    'f': 6,
    'g': 6,
    'h': 6,
    'i': 5,
    'j': 7,
    'k': 7,
    'l': 6,
    'm': 6,
    'n': 6,
    'o': 5,
    'p': 6,
    'q': 7,
    'r': 6,
    's': 5,
    't': 5,
    'u': 6,
    'v': 7,
    'w': 7,
    'x': 7,
    'y': 7,
    'z': 7
};

var dictionary = {};

var dictionaryGenerate = function (inputWord) {
    for (i = 0; i < 8; i++) {
        var sequence = [];
        var bytes = 7 - i;
        for (char = 0; char < inputWord.length; char++) {
            bytes = bytes + charLength[inputWord[char]];
            sequence.push(Math.floor(bytes/8));
        }
        if (dictionary[sequence] == null) {
            dictionary[sequence] = [];
        }
        dictionary[sequence].push(inputWord)
    }
};