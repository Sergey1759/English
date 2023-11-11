module.exports = function (word) {
return `
<strong>${word.word}</strong> -- <i>${word?.meanings[0]}, ${word?.meanings[1]}, ${word?.meanings[2]}</i>
            
${word?.examples[0]?.from}
${word?.examples[0]?.to}

${word?.examples[1]?.from}
${word?.examples[1]?.to}
`
}