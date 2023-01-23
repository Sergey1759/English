module.exports = function (word,result) {
return `
<strong>${word}</strong> -- <i>${result?.meanings[0]}, ${result?.meanings[1]}, ${result?.meanings[2]}</i>
            
${result?.examples[0]?.from}
${result?.examples[0]?.to}

${result?.examples[1]?.from}
${result?.examples[1]?.to}
`
}