function isJSON(str: string): boolean {
  return str.includes("json");
}

function isChinese(text: string) {
  var chinesePattern = /[\u4e00-\u9fa5]/;
  return chinesePattern.test(text);
}

export function speakWord(word: string, speed: number = 0.8) {
  console.log("speakWord", word);
  if (isJSON(word)) {
    return;
  }
  if (isChinese(word)) {
    return;
  }

  var speech = new SpeechSynthesisUtterance();
  speech.text = word;
  speech.lang = "en-US"; // 设置语言为英语（美国）
  speech.rate = speed; // 设置语速
  window.speechSynthesis.speak(speech);
}
