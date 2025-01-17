'use strict';
const inquirer = require('inquirer');

function mainMenu() {
  process.stdout.write('\x1Bc');
  const questions = [{
    type: 'rawlist',
    message: '[NiceIdea 音樂靈感隨機產生器 v1.0 - 主選單]',
    name: 'menu',
    pageSize: 12,
    choices: [{
        name: "給我一些隨便的【音】",
        value: "randomNotes"
      },
      {
        name: "給我一些隨便的【和弦】",
        value: "randomChords"
      },
      {
        name: "給我一個隨便的【大小調/調號】",
        value: "randomKeys"
      },
      {
        name: "給我一些隨便的【調式】",
        value: "randomModes"
      },
      {
        name: "給我一個隨便的【拍號】",
        value: "randomMeter"
      },
      {
        name: "給我一個隨便的【速度】",
        value: "randomTempo"
      },
      {
        name: "給我一個隨便的【歌名】",
        value: "randomTitle"
      },
      {
        name: "給我一個隨便的【點子】",
        value: "idea"
      },
      {
        name: "結束",
        value: "quit"
      }
    ],
  }, ]

  inquirer.prompt(questions).then((answers) => {
    // console.log(answers["menu"]);
    switch (answers["menu"]) {
      case "randomNotes":
        randomNotes();
        break;
      case "randomChords":
        randomChords();
        break;
      case "randomKeys":
        randomKeys();
        break;
      case "randomModes":
        randomModes();
        break;
      case "randomMeter":
        randomMeter();
        break;
      case "randomTempo":
        randomTempo();
        break;
      case "randomTitle":
        randomTitle();
        break;
      case "idea":
        idea();
        break;
      case "quit":
        console.log("=== 掰掰！ ===");
        process.exit(0);
        break;
      default:
        console.log("=== 掰掰！ ===");
        process.exit(0);
        break;
    }
  });

}

function exitOrNot() {
  // 要不要結束？
  const questions = [{
    type: 'confirm',
    message: '還要再玩一次嗎？',
    name: 'exit',
    default: true
  }]

  inquirer.prompt(questions).then((answers) => {
    // console.log(answers["exit"]);
    if (answers["exit"]) {
      mainMenu();
    } else {
      console.log("=== 掰掰！記得多到 NiceChord.com 學音樂唷～ ===");
      process.exit(0);
    }
  });

}

function randomNotes() {

  const questions = [{
      type: 'checkbox',
      message: '[隨機音符產生器] 選擇要抽的音：',
      name: 'notes',
      pageSize: 12,
      choices: ["C", "Db", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B"],
      default: ["C", "Db", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B"],
      validate(answer) {
        if (answer.length < 1) {
          return '至少要選一個音唷！';
        }
        return true;
      },
    },
    {
      type: 'number',
      message: '要產生幾個音？（1-100）',
      name: 'howmany',
      default: 8,
    },
  ]

  inquirer.prompt(questions).then((answers) => {
    // console.log(answers["notes"][0]);
    // console.log(answers["howmany"]);
    let choices = answers["notes"];
    let result = [];
    let howmany = answers["howmany"];
    for (let i = 0; i < howmany; i++) {
      result.push(choices[Math.floor(Math.random() * choices.length)])
    }
    console.log(result);
    exitOrNot();
  });

}

function randomChords() {

  const questions = [{
      type: 'checkbox',
      message: '[隨機和弦產生器] 選擇要抽的和弦類型：',
      name: 'chords',
      pageSize: 12,
      choices: ["major", "minor", "augmented", "diminished", "sus2", "maj7", "m7", "7", "7sus", "m7(b5)", "dim7"],
      default: ["maj7", "m7", "7sus"],
      validate(answer) {
        if (answer.length < 1) {
          return '至少要選一種喔！';
        }
        return true;
      },
    },
    {
      type: 'number',
      message: '要產生幾個和弦？（1-100）',
      name: 'howmany',
      default: 8,
    },
  ]

  inquirer.prompt(questions).then((answers) => {
    // console.log(answers["notes"][0]);
    // console.log(answers["howmany"]);
    let types = answers["chords"]; // 使用者選的和弦類型
    let choices = []; // 納入抽獎的和弦 - 候選名單
    let result = []; // 最終輸出結果
    let howmany = answers["howmany"]; // 幾個

    // 所有和弦名單
    let major = ["C", "Db", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B"];
    let minor = ["Cm", "C#m", "Dm", "Ebm", "Em", "Fm", "F#m", "Gm", "G#m", "Am", "Bbm", "Bm"];
    let augmented = ["C+", "Db+", "D+", "Eb+", "E+", "F+", "Gb+", "G+", "Ab+", "A+", "Bb+", "B+"];
    let diminished = ["Cdim", "C#dim", "Ddim", "D#dim", "Edim", "Fdim", "F#dim", "Gdim", "G#dim", "Adim", "A#dim", "Bdim"];
    let sus2 = ["Csus2", "Dbsus2", "Dsus2", "Ebsus2", "Esus2", "Fsus2", "F#sus2", "Gsus2", "Absus2", "Asus2", "Bbsus2", "Bsus2"];
    let maj7 = ["Cmaj7", "Dbmaj7", "Dmaj7", "Ebmaj7", "Emaj7", "Fmaj7", "Gbmaj7", "Gmaj7", "Abmaj7", "Amaj7", "Bbmaj7", "Bmaj7"];
    let m7 = ["Cm7", "C#m7", "Dm7", "Ebm7", "Em7", "Fm7", "F#m7", "Gm7", "G#m7", "Am7", "Bbm7", "Bm7"];
    let dom7 = ["C7", "Db7", "D7", "Eb7", "E7", "F7", "F#7", "G7", "Ab7", "A7", "Bb7", "B7"];
    let dom7sus = ["C7sus", "C#7sus", "D7sus", "Eb7sus", "E7sus", "F7sus", "F#7sus", "G7sus", "Ab7sus", "A7sus", "Bb7sus", "B7sus"];
    let m7b5 = ["Cm7(b5)", "C#m7(b5)", "Dm7(b5)", "D#m7(b5)", "Em7(b5)", "Fm7(b5)", "F#m7(b5)", "Gm7(b5)", "G#m7(b5)", "Am7(b5)", "A#m7(b5)", "Bm7(b5)"];
    let dim7 = ["Cdim7", "C#dim7", "Ddim7", "D#dim7", "Edim7", "Fdim7", "F#dim7", "Gdim7", "G#dim7", "Adim7", "A#dim7", "Bdim7"];

    // 把選擇的和弦放入候選名單
    if (types.includes("major")) {
      choices = choices.concat(major);
    }
    if (types.includes("minor")) {
      choices = choices.concat(minor);
    }
    if (types.includes("augmented")) {
      choices = choices.concat(augmented);
    }
    if (types.includes("diminished")) {
      choices = choices.concat(diminished);
    }
    if (types.includes("sus2")) {
      choices = choices.concat(sus2);
    }
    if (types.includes("maj7")) {
      choices = choices.concat(maj7);
    }
    if (types.includes("m7")) {
      choices = choices.concat(m7);
    }
    if (types.includes("7")) {
      choices = choices.concat(dom7);
    }
    if (types.includes("7sus")) {
      choices = choices.concat(dom7sus);
    }
    if (types.includes("m7(b5)")) {
      choices = choices.concat(m7b5);
    }
    if (types.includes("dim7")) {
      choices = choices.concat(dim7);
    }
    //

    for (let i = 0; i < howmany; i++) {
      result.push(choices[Math.floor(Math.random() * choices.length)])
    }
    console.log(result);
    exitOrNot();
  });

}

function randomModes() {

  const questions = [{
    type: 'number',
    message: '要產生幾個調式？（1-100）',
    name: 'howmany',
    default: 4,
  }, ]

  inquirer.prompt(questions).then((answers) => {
    let roots = ["C", "Db", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B"];
    let modes = ["Ionian", "Dorian", "Phrygian", "Lydian", "Mixolydian", "Aeolian", "Locrian"]
    let result = [];


    let howmany = answers["howmany"];
    for (let i = 0; i < howmany; i++) {
      result.push(roots[Math.floor(Math.random() * roots.length)] + " " + modes[Math.floor(Math.random() * modes.length)])
    }
    console.log(result);
    exitOrNot();
  });

}

function randomKeys() {
  let tips = [
    "C 大調 / A 小調 （沒有升降記號）",
    "G 大調 / E 小調 （1 個升記號）",
    "D 大調 / B 小調 （2 個升記號）",
    "A 大調 / F# 小調 （3 個升記號）",
    "E 大調 / C# 小調 （4 個升記號）",
    "B 大調 / G# 小調 （5 個升記號）",
    "F# 大調 / D# 小調 （6 個升記號）",
    "C# 大調 / A# 小調 （7 個升記號）",
    "F 大調 / D 小調 （1 個降記號）",
    "Bb 大調 / G 小調 （2 個降記號）",
    "Eb 大調 / C 小調 （3 個降記號）",
    "Ab 大調 / F 小調 （4 個降記號）",
    "Db 大調 / Bb 小調 （5 個降記號）",
    "Gb 大調 / Eb 小調 （6 個降記號）",
    "Cb 大調 / Ab 小調 （7 個降記號）",
  ]
  console.log("\n 🎹 " + tips[Math.floor(Math.random() * tips.length)] + "\n");
  exitOrNot();
}

function randomMeter() {
  let tips = [
    "2/4", "3/4", "4/4", "5/4", "6/4", "7/4", "3/8", "5/8", "6/8", "7/8", "9/8", "11/8", "12/8", "13/8", "15/8", "2/2", "3/2"
  ]
  console.log("\n 🎼 " + tips[Math.floor(Math.random() * tips.length)] + " 拍\n");
  exitOrNot();
}

function randomTempo() {
  console.log("\n 🎲 " + Math.floor((Math.random() * 210) + 30) + " BPM\n");
  exitOrNot();
}

function randomTitle() {

  let noun = ['愛情',
    '戀愛',
    '電影',
    '飛鳥',
    '火神',
    '城市',
    '名字',
    '規則',
    '我',
    '我們',
    '你',
    '你們',
    '他',
    '她',
    '貓',
    '狗',
    '魚',
    '雨',
    '細雨',
    '大雨',
    '太陽',
    '雲',
    '太空',
    '宇宙',
    '天空',
    '雪',
    '海灣',
    '眼淚',
    '感動',
    '情書',
    '明天',
    '昨天',
    '今天',
    '距離',
    '靈魂',
    '答案',
    '少年',
    '風景',
    '浪子',
    '大海',
    '戒指',
    '唯一',
    '綠色',
    '紅色',
    '藍色',
    '橘色',
    '紫色',
    '黃色',
    '朋友',
    '情人',
    '男人',
    '女人',
    '玫瑰花',
    '歌聲',
    '北方',
    '東方',
    '南方',
    '西方',
    '手掌心',
    '寶貝',
    '聲音',
    '貓叫聲',
    '狗叫聲',
    '鳥叫聲',
    '魔鬼',
    '天堂',
    '寂寞',
    '夜晚',
    '理由',
    '悲傷',
    '幸福',
    '喜劇',
    '魔女',
    '泡沫',
    '天使',
    '懸崖',
    '關鍵字',
    '命運',
    '十字路口',
    '獅子',
    '獅子王',
    '台北',
    '台灣',
    '和弦',
    '鋼琴',
    '小提琴',
    '牛肉',
    '拉麵',
    '蛋餅',
    '胡椒',
    '咖哩',
    '烤箱',
    '回憶',
    '糖果',
    '巧克力',
    '咖啡',
    '瞬間',
    '過客',
    '酒吧',
    '氣球',
    '公園',
    '離別',
    '道別',
    '飛機',
    '機場',
    '一切',
    '回答',
    '恐龍',
    '蘋果',
    '葡萄王',
    '伯母',
    '叔叔',
    '阿姨',
    '阿嬤',
    '媽媽',
    '爸爸',
    '嬰兒',
    '秋天',
    '夏天',
    '春天',
    '冬天',
    '浴缸',
    '海灘',
    '美麗',
    '腳踏車',
    '黑板',
    '積木',
    '麵包',
    '書店',
    '日常',
    '蛋糕',
    '事實',
    '偶然',
    '小鳥',
    '聖誕節',
    '端午節',
    '中秋節',
    '教堂',
    '餅乾',
    '日子',
    '書桌',
    '晚餐',
    '早餐',
    '眼睛',
    '鼻子',
    '嘴巴',
    '嘴唇',
    '肚子',
    '農夫',
    '少女',
    '姑娘',
    '旅館',
    '醫院',
    '冰淇淋',
    '風箏',
    '騙子',
    '檸檬',
    '郵差',
    '片刻',
    '喧鬧聲',
    '筆記本',
    '遊樂園',
    '野餐',
    '爆米花',
    '海洋',
    '病毒',
    '床',
    '動物園',
    '情人節',
    '灰姑娘',
    '丈母娘',
    '印度洋',
    '太平洋',
    '蜘蛛網',
    '雕像',
    '麻辣燙',
    '口香糖',
    '大西洋',
    '雙人床',
    '機車',
    '行李箱',
    '手槍',
    '太空艙',
    '焦糖',
    '棉花糖',
    '老闆娘',
    '番茄醬',
    '捉迷藏',
    '董事長',
    '保險套',
    '啤酒',
    '空姐',
    '拖鞋',
    '乳液',
    '番茄',
    '世界',
    '微波爐',
    '未婚夫',
    '未婚妻',
    '牛仔褲',
    '休止符',
    '音符',
    '五線譜',
    '林森北路',
    '台北車站',
    '高速公路',
  ]

  let around = ['戀愛中的ooo',
    '進擊的ooo',
    '百分百ooo',
    'ooo之吻',
    'ooo女孩',
    'ooo男孩',
    'ooo大嬸',
    'ooo大叔',
    'ooo大神',
    'ooo大魔咒',
    'ooo的冒險',
    '世紀ooo',
    '搖滾ooo',
    '超人氣ooo',
    'ooo白皮書',
    'ooo宿舍',
    'ooo角落',
    '極速ooo',
    '雪地裡的ooo',
    '草原中的ooo',
    '高原上的ooo',
    '地底下的ooo',
    'ooo花園',
    'ooo之戀',
    '我的秘密ooo',
    '愛之ooo',
    'ooo日記',
    '原味的ooo',
    'ooo天使',
    'ooo事務所',
    'ooo傳說',
    'ooo之舞',
    'ooo任務',
    'ooo天王',
    'ooo在身邊',
    'ooo愛上xxx',
    '當ooo遇見xxx',
    '我只在乎ooo',
    'ooo變xxx',
    '失戀ooo',
    '惡作劇之ooo',
    'ooo宅急便',
    '愛情ooo',
    '東方ooo',
    'ooo情人',
    '我要成為ooo',
    '終極ooo',
    'ooo，要不要？',
    '發現ooo',
    '幸福ooo',
    '看見ooo',
    'ooo的抉擇',
    '我的億萬ooo',
    '爵士ooo',
    '就是要ooo',
    '這不是ooo',
    'ooo日記',
    '戀愛就像ooo',
    'ooo愛上你',
    '前男友的ooo',
    '前女友的ooo',
    'ooo戀人',
    '你是ooo，我是xxx',
    '原來愛就是ooo',
    '我租了一個ooo',
    'ooo向前走',
    '沒有名字的ooo',
    '兩個ooo',
    '三個ooo',
    'ooo夏令營',
    'ooo365',
    '二號出口的ooo',
    '三號出口的ooo',
    '喜歡，ooo',
    '一百種ooo',
    '一百萬種ooo',
    '我的寶貝ooo',
    '你的ooo對我說',
    '小ooo',
    '孤獨的ooo',
    'ooo的床邊故事',
    '迷人的ooo',
    'xxx',
    '當你和ooo一起出現',
    '小時候的ooo',
    'ooo的瓦解',
    'ooo的辛苦',
    'ooo空間',
    'ooo，謝謝',
    'ooo的狂野',
    '想像中的ooo',
    '遺失的ooo',
    '消失的ooo',
    '城市裡的ooo',
    '鳥鳥的ooo',
    '廁所裡的ooo',
    '我最愛的ooo',
    '你最愛的ooo',
    '怎麼了，ooo？',
    '你說過的ooo',
    '刻在我心底的ooo',
    '你教我的ooo',
    '藍色的ooo',
    '紅色的ooo',
    '黃色的ooo',
    '綠色的ooo',
    '粉紅色的ooo',
    '灰色的ooo',
    '紫色的ooo',
    'ooo與我無關',
    '台灣的ooo',
    '去你的ooo',
    '來一個ooo',
    '我把ooo弄丟了',
    'ooo好神奇',
    '你才ooo，你全家都ooo',
    '失眠的ooo',
    '明天的ooo',
    '愛的ooo',
    '我的ooo',
    '你的ooo',
    '妳的ooo',
    '近距離愛上ooo',
    '可不可以，你也剛好喜歡ooo',
    '很久以後的ooo',
    '囂張的ooo',
    '最美的ooo',
    '哇！ooo！',
    '如果能再擁有ooo',
    'ooo是科學',
    'ooo是假的',
    'ooo是幻覺',
    'ooo最討厭了',
    '十點半的ooo',
    '午夜的ooo',
    '我看見ooo',
    '我看不見ooo',
    'Why？ooo？',
    '有一種ooo叫做xxx',
    'ooo與xxx',
    'ooo與xxx的故事',
    '沙漠中的ooo',
    '我想要ooo',
    'oooxxx',
    '那女孩的ooo',
    '說好的ooo呢？',
    '沒有ooo的日子',
    '有一種ooo',
    '最後一次ooo',
    'ooo',
    '來個ooo',
    '你也有ooo',
    '對的ooo',
    '錯的ooo',
    '如果我沒有ooo',
    '在青春迷失的ooo',
    '鄉下的ooo',
    '流浪ooo',
    'ooo的約定',
    'ooo的證明',
    'ooo的回憶',
    'ooo之夢',
    'ooo怎麼了嗎？',
    '好多ooo',
    'ooo專賣店',
    'ooo是什麼？',
    'ooo就是一切',
    'ooo來了！',
    '生氣的ooo',
    '誰都不准搶走我的ooo',
    'ooo病毒',
    'ooo派對',
    'ooo又來了',
    '我愛ooo',
    '伯母的ooo',
    '爺爺的ooo',
    '爸爸的ooo',
    '媽媽的ooo',
    '黑暗的ooo',
    'ooo在你後面',
    'ooo在你身旁',
    '火熱的ooo',
    '性感的ooo',
    '在ooo與xxx之間',
    'ooo與xxx的雙聲道',
    '打破ooo',
    '發亮的ooo',
    'ooo拿來',
    '但是我沒有ooo',
    'ooo之歌',
    '不變的ooo',
    '聖誕節的ooo',
    '情人節的ooo',
    '愛乾淨的ooo',
    'ooo好好玩',
    'ooo好舒服',
    '涼快的ooo',
    '姊姊的ooo',
    '妹妹的ooo',
    '哥哥的ooo',
    '弟弟的ooo',
    '危險ooo',
    '危險的ooo',
    'ooo百貨',
    'ooo的狂想',
    'ooo的即興',
    'ooo狂想曲',
    'ooo奏鳴曲',
    '骯髒的ooo',
    'ooo的旅行',
    '宇宙的ooo',
    '興奮的ooo',
    '激動的ooo',
    '再見，ooo！',
    'ooo？門都沒有！',
    'ooo！',
    'ooo？',
    '巨大的ooo',
    '想起ooo',
    'ooo怎麼樣',
    'ooo說來話長',
    'ooo的安全感',
    '下一站，ooo',
    '超自然ooo',
    'ooo大挑戰',
    '快樂的ooo',
    '溫柔的ooo',
    'ooo知道了',
    '勇敢的ooo',
    '不幸的ooo',
    '可怕的ooo',
    'ooo的可怕',
    'ooo的痛',
    'ooo的困惑',
    'ooo的絕望',
    '該死的ooo',
    '聰明的ooo',
    '我的今天很ooo',
    'ooo的xxx',
    'ooo又不是xxx',
    'ooo沒有xxx',
    '心中的ooo',
    'ooo在我心中',
    'ooo狂熱',
    '這就是ooo',
    '我有八百萬個ooo',
    '我買不到ooo',
    '我看不見ooo',
    '我找不到ooo和xxx',
    'ooo又不是我的',
    'ooo的笑話',
    'ooo與xxx的笑話',
    '超能力ooo',
    '春天的ooo',
    '夏天的ooo',
    '秋天的ooo',
    '冬天的ooo',
    'ooo的春天',
    'ooo的夏天',
    'ooo的秋天',
    'ooo的冬天',
    '我的寶貝ooo',
    'ooo俱樂部',
    '只在回憶中的ooo',
    '我失去了ooo',
    'ooo的一天',
    'ooo的名字',


  ]

  let result = around[Math.floor(Math.random() * around.length)];
  result = result.replace("ooo", noun[Math.floor(Math.random() * noun.length)]);
  result = result.replace("xxx", noun[Math.floor(Math.random() * noun.length)]);
  console.log("\n 🤔 " + result + "\n");
  exitOrNot();

}

function idea() {
  let tips = [
    "寫一首很圓滑（Legato）的曲子吧！",
    "寫一首使用很多斷奏（Staccato）的曲子吧！",
    "主旋律不一定要在最高音阿！用低音來當主旋律如何？",
    "主旋律不一定要在最高音阿！用中音的聲部來當主旋律如何？",
    "試試看寫一首雙旋律並行的曲子，聽過巴赫的《創意曲》嗎？",
    "寫一首 3/4 拍的曲子吧！碰恰恰碰恰恰～",
    "寫一首 5 拍子的曲子吧！聽過 Dave Brubeck 的《Take Five》嗎？",
    "寫一首 7 拍子的曲子吧！",
    "寫一首 9/8 拍子的曲子吧！",
    "寫一個完全沒有拍子的段落吧！",
    "要不要試試看寫一首速度超快的曲子？",
    "試試看寫一首速度很慢的曲子吧！",
    "選一個你從來沒有用過的樂器，用它來當作主旋律試試看！",
    "用一個你從來沒有用過的調式來寫曲子吧！",
    "試試看不斷重複同一個旋律，但是配上不同和聲吧！",
    "拿起你身旁的任何產品，用上面的條碼/序號來當作主旋律！",
    "寫一首只有兩個和弦不斷來回切換的歌。",
    "取樣你身邊物品的聲音，把它當作主角來做一首曲子！",
    "試試看寫一首旋律音一直往上走的歌？",
    "試試看寫一首旋律音一直往下走的歌？",
    "寫一個音域超高的段落如何？",
    "寫一個音域超低的段落如何？",
    "試試看寫一個全部只用大（major）和弦的段落？",
    "試試看寫一個全部只用小（minor）和弦的段落？",
    "試試看寫一個全部只用屬（dominant）和弦的段落？",
    "試試看寫一個全部只用 7sus 和弦的段落？",
    "寫一首全部只用打擊樂器的曲子吧！",
    "寫一首全部只用弦樂器的曲子吧！",
    "寫一首全部只用管樂器的曲子吧！",
    "寫一首全部只用合成器的曲子吧！",
    "寫一首全部只用人聲的曲子吧！",
    "寫一首充滿民族樂器的曲子吧！",
    "寫一首全部只用你自己取樣的樂器的曲子吧！",
    "試試看寫一首充滿二度音程的曲子？",
    "試試看寫一首充滿三度音程的曲子？",
    "試試看寫一首充滿完全四度和五度音程的曲子？",
    "試試看寫一首日本風的曲子？",
    "試試看寫一首中國風的曲子？",
    "試試看寫一首西班牙風的曲子？",
    "試試看寫一首印度風的曲子？",
    "試試看寫一首拉丁風的曲子？",
    "找一首別人的曲子，把它的主旋律音順序反過來，當作你的主旋律。",
    "找一首別人的曲子，用它的主旋律節奏，當作你的主旋律節奏。",
    "這次試試看先決定和弦，再寫主旋律如何？",
    "到 YouTube 取樣一小段影片當作素材如何？（當然要注意版權問題）",
    "如果一直沒有靈感就起身走走吧！",
    "去洗個熱水澡可能就會有靈感了！",
    "先去吃個零食，回來可能會更有靈感？",
    "找一首你喜歡的歌，使用跟它一模一樣的曲式。",
    "從副歌開始如何？",
    "不要有前奏，直接開始如何？",
    "最前面加個前奏好像會不錯？",
    "最後面加個尾奏好像會不錯？",
    "不一定要每四小節一句呀！寫一個五小節的句子如何？",
    "不一定要每四小節一句呀！寫一個三小節的句子如何？",
    "試試看寫一首一分鐘以內的曲子吧！",
    "你試過用淡入（fade in）的方式開始一首曲子嗎？",
    "你試過用淡出（fade out）的方式結束一首曲子嗎？",
    "用某些「自然環境音效」當開頭好像也不錯？",
    "除了一般樂器的聲音之外，加點特殊音效吧！",
    "試試看先想歌詞，然後用歌詞的自然語調決定旋律。",
    "不一定要從最前面開始寫呀！從曲子最精采的那一段開始寫如何？",
    "試試看寫一個只用三個樂器的曲子吧！",
    "段落連接處來點過門吧！",
    "亂數產生器很好用：用亂數決定你的主旋律吧！",
    "亂數產生器很好用：用亂數決定你的和弦吧！",
    "試試看只用兩個動機（音樂小片段、想法），就發展成一整首曲子。",
    "打開你的編曲軟體/合成器/音源器，把每一個音色都試一遍，有什麼音色適合當作下一首曲子的主角呢？",
    "記得天底下沒有什麼是原創的，找一些你喜歡的作品，把它的其中一些元素偷過來吧！",
    "隨便找幾首古典音樂，把其中的一些小片段重組、拼在一起？",
    "「輸入」是很重要的，如果你不想寫出某種音樂，那就儘量避免讓自己聽到那種音樂。",
    "「輸入」是很重要的，想寫出某種音樂，就儘量讓自己多聽到那種音樂。",
    "不要急著開始寫，先計畫一下大綱。你的曲子要多長、要有幾段、哪一段是最高潮呢？",
    "只參考一個人是「抄襲」，參考一百個人，然後把他們混在一起就是「創新和研究」。",
    "用過純文字編輯器作曲嗎？試試看不要碰樂器，把你的和弦跟旋律用純文字方式記錄下來，完全用頭腦想像聲音來作曲。",
    "去聽聽看一個你從來不聽的音樂類型吧！",
    "去分析一個你不愛聽，但卻很受歡迎的曲子。這首曲子到底好在哪裡？",
    "到 Google 搜尋「MIDI Files」，下載幾首放到編曲軟體去研究看看吧！",
    "到 imslp.org 下載一首古典音樂的樂譜研究看看吧！",
    "去隨便看一部好和弦的影片，然後用影片裡面提到的技巧當主軸來作曲。",
    "音感更好的話作曲編曲都會更方便喔！找一個音感訓練軟體或網站開始練習吧。",
    "你有沒有認真看過你的編曲軟體/打譜軟體的說明書？",
    "你知道你常用的編曲軟體/打譜軟體的所有快速鍵嗎？那會增加你的工作效率喔！現在就背兩個起來吧！",
    "不要再買了，你不需要最新最好的樂器也能做出好音樂的。",
    "硬碟裡躺著一堆未完成的作品嗎？把其中一個挖出來然後完成它吧！",
    "找一首你喜歡的古典音樂，把它改成爵士版如何？",
    "找一首你喜歡的古典音樂，把它改成搖滾版如何？",
    "找一首你喜歡的鋼琴獨奏曲，把它改成管弦樂版如何？",
    "用另一個喇叭播放你的作品試試看，也許你會發現之前沒聽到的問題。",
    "多練點琴吧～",
    "你上一次看樂理/作曲相關的書籍是什麼時候？",
    "卡住的話，把你的曲子拿給其他人聽聽看吧！",
    "考慮一下 CP 值，如何可以用最簡單的方式產生效果好的音樂？",
    "不要太在意「樂理規則」：是作品造就了規則，而不是規則造就了作品。",
    "給自己一點時間限制吧！人類在時間不夠時的潛能是很厲害的阿！",
    "寫不出好東西嗎？很可能是因為你的爛東西寫得不夠多，試試看寫出爛東西吧！",
    "有任何音樂想法時，記得趕快拿手機的語音備忘錄 app 錄下來。",
    "試試看把東西用在「不該用的地方」。",
    "記得做音樂之餘也要記得運動喔！",
    "建模板：把常用的音色載入好，存檔成為一個模板，以後每次打開編曲軟體就可以直接開始創作了！",
    "參考別人的作品並不可恥，不要整個照抄就好，學習一些你喜歡的元素放到自己的作品中吧！",
    "不要被社群媒體的數字迷惑：點閱/按讚數最多的作品，不見得是最好的作品。",
    "多花一點錢在投資自己上，少一點在投資設備上。",
    "自己一個人做音樂卡住的話，試試看找別人合作吧！",
    "沒有人每天都狀況好的，今天如果真的沒有做音樂的感覺，就先去做別的事情吧！",
    "你的工作桌面堆滿東西嗎？把空間清出來，工作會更有效率喔！",
    "建立一個「創作靈感播放清單」，聽到喜歡的、以後可能會想要參考的音樂時，趕快把它放入清單中。",
    "在編曲軟體裡把每一軌好好取名字吧！誰知道「Audio Track 05」是什麼東西阿？",
    "你的工作硬碟有備份嗎？沒有？這樣你晚上也睡得著？",
    "備份備份，至少三份：電腦、外接硬碟、雲端都有的才是真備份阿！",
    "什麼都是假的，存檔了才是真的。記得時時 Ctrl+S/Command+S！",
    "拜託一定要記得備份！",
    "寫曲子的初期，不要太在意細節，先把整首曲子的流程設定好更重要喔！",
    "不要邊做音樂邊滑社群網站！專心阿！",
    "不要坐在椅子上太久阿！站起來動一動吧！",
    "你用過雙螢幕工作嗎？沒有的話，你一定要試試看，那會大大增加工作效率喔！",
    "不要照著 SOP 做音樂：發現自己「每次都這麼做」的時候，故意不要這樣做吧！",
    "少即是多：加入更多東西並不一定會讓你的音樂聽起來更龐大。",
    "低音聽起來很髒嗎？選一個樂器當作你的「Bass」，然後禁止其他的樂器侵犯神聖的低音區域！",
    "一開始就把曲子寫好，不要期待編曲、錄音、混音的人可以拯救一個爛作品。",
    "連續混音太久耳朵會疲勞、影響判斷。一旦開始混音就儘量迅速完成吧！",
    "如果你說不出自己一年前作品的缺點，那麼你要反省一下這一年是不是有學到東西。"
  ]
  console.log("\n 💡 " + tips[Math.floor(Math.random() * tips.length)] + "\n");
  exitOrNot();
}



mainMenu();
// randomNotes();
