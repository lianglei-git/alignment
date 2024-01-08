
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
function getTextWidth(text: string): number {
    if (!ctx) return 0;
    const metrics = ctx.measureText(text);
    return metrics.width;
}

function addSpacesToMatchWidth(text: string, maxWidth: number, spcae: string): string {
    const textWidth = getTextWidth(text);
    if (textWidth >= maxWidth) {
        return text;
    }
    const spaceWidth = getTextWidth(spcae);
    const requiredSpaces = Math.ceil((maxWidth - textWidth) / spaceWidth);
    const spaces = spcae.repeat(requiredSpaces - 1);
    return text + spaces;
}

type Result = {
    results: string[][]
}
function alignmentsV2(params: { strs: string[] | string[][], ctxFont?: string, maxWidth?: number, byteReplacement?: string }): Result {
    let { maxWidth, strs, byteReplacement = " ", ctxFont = '12px initial' } = params;
    // if width not specified
    if (maxWidth == undefined) {
        let _maxWidth = 0;
        strs.flat(3).map((str: string) => {
            const len = getTextWidth(str);
            if (len > _maxWidth) {
                _maxWidth = len;
            }
        })
        _maxWidth += 10;
        maxWidth = _maxWidth;
    }
    if (ctx) {
        ctx.font = ctxFont;
    }
    let isStartWhile = true;
    const results: string[][] = [];
    while (isStartWhile) {
        for (let i = 0; i < strs.length; i++) {
            results[i] = [];
            const every = strs[i];
            (every as any).map((content: string, idx: number) => {
                const outputText = addSpacesToMatchWidth(content, maxWidth as number, byteReplacement);
                results[i][idx] = outputText;
            });
        }
        isStartWhile = false;
    }
    return {
        results
    }

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

export {
    alignmentsV2,
    addSpacesToMatchWidth
}