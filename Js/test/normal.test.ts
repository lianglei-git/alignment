import { alignment } from "../main";


function TestAnyOne() {
    const example = ["abc哈哈-=`' 你好", "没有a"]
    const standardResults = ["abc哈哈-=`' 你好", "没有a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u3000\u3000"]
    let isMatch = true;
    console.log(alignment(example).results)
    alignment(example).results[0].map((str, index) => {
        if (str !== standardResults[index]) {
            isMatch = false;
        }
    })
    console.log(isMatch)
}


function MainTest() {
    TestAnyOne();
}



MainTest();