(function () {
    var saySentence = function (sentence) {
        if (sentence) {
            console.log(sentence);
        }
    };
    var saySentenceTwo = function (sentence) {
        if (sentence === void 0) { sentence = "Default sentence"; }
        console.log(sentence);
    };
    saySentence();
    saySentenceTwo();
    var getSum = function (x, y) {
        return x + y;
    };
    var sum = getSum(3, 5);
    var doFunction = function (callback) {
        callback();
    };
    doFunction(function () {
        console.log("Hallo");
    });
    var doCallbackReturn = function (getContent) {
        console.log(getContent(10));
    };
    doCallbackReturn(function (x) {
        return "Het getal is ".concat(x);
    });
})();
