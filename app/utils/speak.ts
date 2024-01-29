var speaking = false;

function sleep(milliseconds: number) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

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

export async function speakWord(message: string, speed: number = 1) {
  if (speaking) {
    speaking = false;
    stopSpeak();
    return;
  }

  console.log("speakWord", message, speed);
  if (isJSON(message)) {
    return;
  }
  if (isChinese(message)) {
    return;
  }

  speaking = true;
  let sentences = splitSentence(message);
  for (let sentence of sentences) {
    await speak(sentence, speed);
    if (!speaking) {
      break;
    }
    await sleep(400);
  }
  speaking = false;
}

async function speak(message: string, speed: number = 1) {
  return new Promise((resolve, reject) => {
    var speech = new SpeechSynthesisUtterance();
    speech.text = message;
    speech.lang = "en-US"; // 设置语言为英语（美国）
    speech.rate = speed; // 设置语速

    speech.onend = function (event: any) {
      resolve(undefined);
    };
    speech.onerror = function (event: any) {
      reject(event.error);
    };
    window.speechSynthesis.speak(speech);
  });
}

function stopSpeak() {
  window.speechSynthesis.cancel();
}
