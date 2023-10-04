(() => {
  const saySentence = (sentence?: string): void => {
    if (sentence) {
      console.log(sentence);
    }
  };

  const saySentenceTwo = (sentence: string = "Default sentence"): void => {
    console.log(sentence);
  };

  saySentence();
  saySentenceTwo();

  const getSum = (x: number, y: number): number => {
    return x + y;
  };
  const sum = getSum(3, 5);

  const doFunction = (callback: () => void) => {
    callback();
  };
  doFunction(() => {
    console.log("Hallo");
  });

  const doCallbackReturn = (getContent: (x: number) => string) => {
    console.log(getContent(10));
  };

  doCallbackReturn((x: number) => {
    return `Het getal is ${x}`;
  });
})();
