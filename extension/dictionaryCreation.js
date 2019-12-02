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
    'z': 7,
    '%': 6,
    '0': 5,
    '1': 5,
    '2': 5,
    '3': 6,
    '4': 6,
    '5': 6,
    '6': 6,
    '7': 6,
    '8': 6,
    '9': 6,
    '=': 6,
    '?': 10,
    '|': 11,
    '/': 6,
    '\\':19,
    '&':8,
    '-':6,
    '.':6,
    ',':8,
    '_':6,
    '$':13,
    '#':12,
    'A': 6,
    'B': 7,
    'C': 7,
    'D': 7,
    'E': 7,
    'F': 7,
    'G': 7,
    'H': 7,
    'I': 7,
    'J': 7,
    'K': 7,
    'L': 7,
    'M': 7,
    'N': 7,
    'O': 7,
    'P': 7,
    'Q': 7,
    'R': 7,
    'S': 7,
    'T': 7,
    'U': 7,
    'V': 7,
    'W': 7,
    'X': 8,
    'Y': 7,
    'Z': 8
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

const dictionary_words = [
    'dogs', 'cats', 'mice', 'guns', 'what'
];
for (a = 0; a < dictionary_words.length; a++) {
    dictionaryGenerate(dictionary_words[a]);
}
console.log(dictionary)