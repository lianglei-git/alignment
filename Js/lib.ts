

type IAlignmentResult = {
    singleByte_max: number;
    doubleByte_max: number;
    results: string[]
}
type IAlignmentParams = {
    doubleByteReplacement?: string
    singleByteReplacement?: string
    strs: string[] | string[][]
}

function strlen(str: string) {
    let info = {
        singleByteLen: 0,
        doubleByteLen: 0,
        get total() {
            return this.singleByteLen + this.doubleByteLen
        }
    }
    var len = 0;
    for (var i = 0; i < str.length; i++) {
        var c = str.charCodeAt(i);
        // 单字节加1
        if ((c >= 0x0001 && c <= 0x007e) || (c >= 0xff60 && c <= 0xff9f)) {
            len++;
            info.singleByteLen += 1;
        } else {
            len += 2;
            info.doubleByteLen += 2;
        }
    }
    return info;
}

function alignmentCore(strs: IAlignmentParams['strs']):IAlignmentResult 
function alignmentCore(params: IAlignmentParams): IAlignmentResult 
function alignmentCore(params: any): IAlignmentResult {
    if(Array.isArray(params)) {
        params = {strs: params}
    }
    const { strs, doubleByteReplacement =  '\u3000', singleByteReplacement = '\u0020' } = params;
    const result:any = {
        singleByte_max: 0,
        doubleByte_max: 0,
        results: [],
        get total() {
            return this.singleByte_max + this.doubleByte_max
        }
    };

    strs.flat(3).map((str: string) => {
        const lenInfo = strlen(str);
        if (result.singleByte_max < lenInfo.singleByteLen) {
            result.singleByte_max = lenInfo.singleByteLen;
        }
        if (result.doubleByte_max < lenInfo.doubleByteLen) {
            result.doubleByte_max = lenInfo.doubleByteLen;
        }
    })

    let isStartWhile = true;
    const results: string[] = [];
    while (isStartWhile) {
        strs.forEach((content: string, idx: number) => {
            let combination = content;
            let len = strlen(combination)
            if (len.singleByteLen < result.singleByte_max) {
                combination += Array(result.singleByte_max - len.singleByteLen)
                    .fill(singleByteReplacement)
                    .join('');
            }
            if (len.doubleByteLen < result.doubleByte_max) {
                combination += Array((result.doubleByte_max - len.doubleByteLen) >> 1)
                    .fill(doubleByteReplacement)
                    .join('');
            }
            results[idx] = combination;
        });

        isStartWhile = false;
    }
    result.results = results;
    return result;
}

export {
    alignmentCore
}