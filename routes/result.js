const express = require('express');
const generator = require('generate-password');
const router = express.Router();
const ApiResult = require('../api/result');
const isAuthenticated = require('./middleware/isAuthenticated');
const ApiResultRadio = require("../api/result-radio");

const moment = require("moment");

router.get('/all', isAuthenticated,async function(req, res, next) {
    const resultsText = await ApiResult.getByUserID(req.user.id);
    const resultsRadio = await ApiResultRadio.getByUserID(req.user.id);
    let results = [...resultsText,...resultsRadio]
    results = results.map(el => {
        let buf = {...JSON.parse(JSON.stringify(el))}

        buf.time = moment(el.date).format('lll');
        buf.isRadio = el.type == 'radio';
        return buf
    });
    console.log(results)
    res.render('result-pages/all', { title: 'Express' , results});
});

router.get('/:id', isAuthenticated, async function(req, res, next) {
    const answers = await ApiResult.getByID(req.params.id);
    res.render('result-pages/answers', { title: 'Express' , answers });
});

router.get('/radio/:id', isAuthenticated, async function(req, res, next) {
    let result = await ApiResultRadio.getById(req.params.id);
    let edited = [];
    for (const el of result.result) {
        let nameInput = generator.generate();
        edited.push({
            isCorrect: el.question._id.toString() == el.answer._id.toString(),
            variants: el.variants.map(kl => {
                let checked = kl._id.toString() == el.answer._id.toString()
                return {
                    checked,
                    value: kl.current.meaning,
                    nameInput,
                    id: generator.generate()
                }
            }),
            word: el.question.word,
            image: el.question.current.image
        })
    }
    res.render('result-pages/answer-radio', { title: 'Express' , result : edited});
});


module.exports = router;