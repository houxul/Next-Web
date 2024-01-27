function isJSON(str: string): boolean {
  return str.includes("json");
}

function isChinese(text: string) {
  var chinesePattern = /[\u4e00-\u9fa5]/;
  return chinesePattern.test(text);
}

function splitSentence(longSentence: string) {
  var sentences = longSentence.split(/[\.\?\!\;\:\,]/);
  sentences = sentences.filter(function (sentence) {
    return sentence.trim() !== "";
  });
  return sentences;
}

export function speakWord(message: string, speed: number = 1) {
  console.log("speakWord", message, speed);
  if (isJSON(message)) {
    return;
  }
  if (isChinese(message)) {
    return;
  }

  let sentences = splitSentence(message);
  sentences.forEach((sentence, index) => {
    setTimeout(() => {
      speak(sentence, speed);
    }, index * 300); // 每隔 0.3 秒读一个短句子
  });
}

function speak(message: string, speed: number = 1) {
  var speech = new SpeechSynthesisUtterance();
  speech.text = message;
  speech.lang = "en-US"; // 设置语言为英语（美国）
  speech.rate = speed; // 设置语速
  window.speechSynthesis.speak(speech);
}
