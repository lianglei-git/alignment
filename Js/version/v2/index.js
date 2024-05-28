var canvas, ctx;
try {
    canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d');
}
catch (e) {
    console.warn("No document, Please install node-canvas.js.");
}
function getTextWidth(text) {
    if (!ctx)
        return 0;
    var metrics = ctx.measureText(text);
    return metrics.width;
}
function addSpacesToMatchWidth(text, maxWidth, spcae) {
    var textWidth = getTextWidth(text);
    if (textWidth >= maxWidth) {
        return text;
    }
    var spaceWidth = getTextWidth(spcae);
    var requiredSpaces = Math.ceil((maxWidth - textWidth) / spaceWidth);
    var spaces = spcae.repeat(requiredSpaces - 1);
    return text + spaces;
}
function alignmentsV2(params) {
    var maxWidth = params.maxWidth, strs = params.strs, _a = params.byteReplacement, byteReplacement = _a === void 0 ? " " : _a, _b = params.ctxFont, ctxFont = _b === void 0 ? '12px initial' : _b;
    // if width not specified
    if (maxWidth == undefined) {
        var _maxWidth_1 = 0;
        strs.flat(3).map(function (str) {
            var len = getTextWidth(str);
            if (len > _maxWidth_1) {
                _maxWidth_1 = len;
            }
        });
        _maxWidth_1 += 10;
        maxWidth = _maxWidth_1;
    }
    if (ctx) {
        ctx.font = ctxFont;
    }
    var isStartWhile = true;
    var results = [];
    while (isStartWhile) {
        var _loop_1 = function (i) {
            results[i] = [];
            var every = strs[i];
            every.map(function (content, idx) {
                var outputText = addSpacesToMatchWidth(content, maxWidth, byteReplacement);
                results[i][idx] = outputText;
            });
        };
        for (var i = 0; i < strs.length; i++) {
            _loop_1(i);
        }
        isStartWhile = false;
    }
    return {
        results: results
    };
}
// const strs = [
//     [
//         "RUS-CHN骨龄等级",
//         "尺骨0",
//         "桡骨5",
//         "第I掌骨3",
//         "第III掌骨4",
//         "第V掌骨3",
//         "近端拇指骨4",
//         "第III近端指骨4",
//         "第V近端指骨4",
//         "第III中间指骨4",
//         "第V中间指骨4",
//         "远端拇指骨4",
//         "第III远端指骨4",
//         "第V远端指骨3",
//         "骨龄7岁2月"
//     ],
//     [
//         "Carpal腕骨骨龄等级",
//         "舟状骨0",
//         "月骨4",
//         "三角骨3",
//         "大多角骨0",
//         "小多角骨3",
//         "头状骨5",
//         "钩骨4",
//         "骨龄6岁4月"
//     ]
// ]
// const { results } = alignmentsV2({
//     strs,
// })
// const contents = [];
// for (let i = 0; i < 20; i++) {
//     let str = '';
//     if (results[0][i]) {
//         str += results[0][i];
//     }
//     if (results[1][i]) {
//         str += results[1][i];
//     }
//     if (str) {
//         contents.push(str);
//     }
// }
// const result = contents.join('\n');
// console.log(result)
export { alignmentsV2, addSpacesToMatchWidth };
