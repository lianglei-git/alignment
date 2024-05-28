function strlen(str) {
    var info = {
        singleByteLen: 0,
        doubleByteLen: 0,
        get total() {
            return this.singleByteLen + this.doubleByteLen;
        }
    };
    var len = 0;
    for (var i = 0; i < str.length; i++) {
        var c = str.charCodeAt(i);
        // 单字节加1
        if ((c >= 0x0001 && c <= 0x007e) || (c >= 0xff60 && c <= 0xff9f)) {
            len++;
            info.singleByteLen += 1;
        }
        else {
            len += 2;
            info.doubleByteLen += 2;
        }
    }
    return info;
}
function alignmentsV1(params) {
    if (Array.isArray(params)) {
        params = { strs: params };
    }
    if (!Array.isArray(params.strs[0])) {
        params.strs = [params.strs];
    }
    var strs = params.strs, _a = params.doubleByteReplacement, doubleByteReplacement = _a === void 0 ? '\u3000' : _a, _b = params.singleByteReplacement, singleByteReplacement = _b === void 0 ? '\u0020' : _b;
    var result = {
        singleByte_max: 0,
        doubleByte_max: 0,
        results: [],
        get total() {
            return this.singleByte_max + this.doubleByte_max;
        }
    };
    strs.flat(3).map(function (str) {
        var lenInfo = strlen(str);
        if (result.singleByte_max < lenInfo.singleByteLen) {
            result.singleByte_max = lenInfo.singleByteLen;
        }
        if (result.doubleByte_max < lenInfo.doubleByteLen) {
            result.doubleByte_max = lenInfo.doubleByteLen;
        }
    });
    var isStartWhile = true;
    var results = [];
    while (isStartWhile) {
        var _loop_1 = function (i) {
            results[i] = [];
            var every = strs[i];
            every.forEach(function (content, idx) {
                var combination = content;
                var len = strlen(combination);
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
                results[i][idx] = combination;
            });
        };
        for (var i = 0; i < strs.length; i++) {
            _loop_1(i);
        }
        isStartWhile = false;
    }
    result.results = results;
    return result;
}
export { alignmentsV1 };
