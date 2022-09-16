"use strict"
var width, height, resize;

// edit below
var collator = "en";
var webUrl = "https://world-geography-games.com/asia.html";

var labels =
{
    website         : "World Geography Games",
    title           : "Turkey: Provinces",
    titleTwo        : "Turkey:\nProvinces",
    play            : "play",
    options         : "options",
    map             : "map",
    tapStart        : "Tap on the map to start",
    clickStart      : "Click on the map to start\nUse mouse wheel to zoom",
    incorrect       : "Incorrect. Try again!",
    score           : "Score: ",
    attempts        : "Attempts: ",
    attemptsEnd     : "Attempts",
    countries       : "Provinces",
    sound           : "SOUND",
	  numOfCountries  : "Number of Provinces",
	  select          : "select",
    selectAtleast   : "Please select at least 5 provinces",
    back            : "back",
    map             : "map",
    playAgain       : "Play Again",
    stop            : "Stop",
    skip            : "Skip",
    skipped         : "Skipped",

    region1         : "Aegean Region",
    region2         : "Black Sea Region",
    region3         : "Central Anatolia",
    region4         : "Eastern Anatolia",
    region5         : "Marmara Region",
    region6         : "Mediterranean Region",
    region7         : "Southeastern Anatolia",
}

var countriesLabels = {
  // Aegean Region
  aydin:          "Aydın",
  afyonkarahisar: "Afyonkarahisar",
  denizli:        "Denizli",
  izmir:          "İzmir",
  kutahya:        "Kütahya",
  manisa:         "Manisa",
  usak:           "Uşak",
  // Black Sea Region:
  amasya:         "Amasya",
  artvin:         "Artvin",
  bartin:         "Bartın",
  bayburt:        "Bayburt",
  bolu:           "Bolu",
  cankiri:        "Çankırı",
  duzce:          "Düzce",
  giresun:        "Giresun",
  gumushane:      "Gümüşhane",
  karabuk:        "Karabük",
  kastamonu:      "Kastamonu",
  ordu:           "Ordu",
  rize:           "Rize",
  samsun:         "Samsun",
  sinop:          "Sinop",
  tokat:          "Tokat",
  trabzon:        "Trabzon",
  zonguldak:      "Zonguldak",
  // Central Anatolia:
  aksaray:        "Aksaray",
  ankara:         "Ankara",
  corum:          "Çorum",
  eskisehir:      "Eskişehir",
  kayseri:        "Kayseri",
  kirikkale:      "Kırıkkale",
  kirsehir:       "Kırşehir",
  konya:          "Konya",
  nevsehir:       "Nevşehir",
  nigde:          "Niğde",
  sivas:          "Sivas",
  yozgat:         "Yozgat",
  // Eastern Anatolia
  agri:           "Ağrı",
  ardahan:        "Ardahan",
  bingol:         "Bingöl",
  bitlis:         "Bitlis",
  elazig:         "Elâzığ",
  erzincan:       "Erzincan",
  erzurum:        "Erzurum",
  hakkari:        "Hakkâri",
  igdir:          "Iğdır",
  kars:           "Kars",
  malatya:        "Malatya",
  mus:            "Muş",
  tunceli:        "Tunceli",
  van:            "Van",
  // Marmara Region
  balikesir:      "Balıkesir",
  bilecik:        "Bilecik",
  bursa:          "Bursa",
  canakkale:      "Çanakkale",
  edirne:         "Edirne",
  istanbul:       "Istanbul",
  kirklareli:     "Kırklareli",
  kocaeli:        "Kocaeli",
  sakarya:        "Sakarya",
  tekirdag:       "Tekirdağ",
  yalova:         "Yalova",
  // Mediterranean Region:
  adana:          "Adana",
  antalya:        "Antalya",
  burdur:         "Burdur",
  hatay:          "Hatay",
  isparta:        "Isparta",
  karaman:        "Karaman",
  kahramanmaras:  "Kahramanmaraş",
  mersin:         "Mersin",
  mugla:          "Muğla",
  osmaniye:       "Osmaniye",
  // Southeastern Anatolia:
  adiyaman:       "Adıyaman",
  batman:         "Batman",
  diyarbakir:     "Diyarbakır",
  gaziantep:      "Gaziantep",
  kilis:          "Kilis",
  mardin:         "Mardin",
  sanliurfa:      "Şanlıurfa",
  siirt:          "Siirt",
  sirnak:         "Şırnak"
}

// don't edit below
var attempts = +0;
var skips = +0;
var questionsArray = Object.values(countriesLabels);
const questionsArrayStatic = questionsArray.slice();

// Aegean Region
var region1Array = [];
for (let x = 0; x < 7; x++) {
  region1Array.push(questionsArray[x]);
}
// Black Sea Region
var region2Array = [];
for (let x = 7; x < 25; x++) {
  region2Array.push(questionsArray[x]);
}
// Central Anatolia
var region3Array = [];
for (let x = 25; x < 37; x++) {
  region3Array.push(questionsArray[x]);
}
// Eastern Anatolia
var region4Array = [];
for (let x = 37; x < 51; x++) {
  region4Array.push(questionsArray[x]);
}
// Marmara Region
var region5Array = [];
for (let x = 51; x < 62; x++) {
  region5Array.push(questionsArray[x]);
}
// Mediterranean Region
var region6Array = [];
for (let x = 62; x < 72; x++) {
  region6Array.push(questionsArray[x]);
}
// Southeastern Anatolia
var region7Array = [];
for (let x = 72; x < 81; x++) {
  region7Array.push(questionsArray[x]);
}

// toggle buttons, by default they are green (frame 0)
var btnRegion1Frame = 0;
var btnRegion2Frame = 0;
var btnRegion3Frame = 0;
var btnRegion4Frame = 0;
var btnRegion5Frame = 0;
var btnRegion6Frame = 0;
var btnRegion7Frame = 0;
var btnRegion8Frame = 0;
var soundButtonFrame = 0;

var toggleButtonsFrames = [];
for (let x = 0; x < questionsArrayStatic.length; x++) {
  toggleButtonsFrames.push(+0);
}

// either regions or provinces are visible
var regionsVisible = true;

function tweenObj(aScene, obj, fromN, toN) {
  obj.alpha = fromN;

  aScene.tweens.add({
      targets: [obj],
      alpha: { value: toN },
      ease: 'Linear',
      duration: 400,
  });
}

// resize
const DEFAULT_WIDTH = 1280
const DEFAULT_HEIGHT = 720
const MAX_WIDTH = DEFAULT_WIDTH * 1.5
const MAX_HEIGHT = DEFAULT_HEIGHT * 1.5
let SCALE_MODE = 'SMOOTH'

const config = {
    type: Phaser.AUTO,
    parent: 'geo-game',
    backgroundColor : 0x34C5EB,
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,

    scale: 
    {
        mode: Phaser.Scale.NONE,
        parent: "geo-game",
    },
    scene: [Loading, Menu, UserInterface, GraphUI, Gameplay, Options, Graph]
}

window.addEventListener('load', () => {
    const game = new Phaser.Game(config)
  
    const resize = () => {
      const w = window.innerWidth
      const h = window.innerHeight
  
      let width = DEFAULT_WIDTH
      let height = DEFAULT_HEIGHT
      let maxWidth = MAX_WIDTH
      let maxHeight = MAX_HEIGHT
      let scaleMode = SCALE_MODE
  
      let scale = Math.min(w / width, h / height)
      let newWidth = Math.min(w / scale, maxWidth)
      let newHeight = Math.min(h / scale, maxHeight)
  
      let defaultRatio = DEFAULT_WIDTH / DEFAULT_HEIGHT
      let maxRatioWidth = MAX_WIDTH / DEFAULT_HEIGHT
      let maxRatioHeight = DEFAULT_WIDTH / MAX_HEIGHT
  
      // smooth scaling
      let smooth = 1
      if (scaleMode === 'SMOOTH') {
        const maxSmoothScale = 1.15
        const normalize = (value, min, max) => {
          return (value - min) / (max - min)
        }
        if (width / height < w / h) {
          smooth =
            -normalize(newWidth / newHeight, defaultRatio, maxRatioWidth) /
              (1 / (maxSmoothScale - 1)) +
            maxSmoothScale
        } else {
          smooth =
            -normalize(newWidth / newHeight, defaultRatio, maxRatioHeight) /
              (1 / (maxSmoothScale - 1)) +
            maxSmoothScale
        }
      }

      // resize the game
      game.scale.resize(newWidth * smooth, newHeight * smooth)
      // scale the width and height of the css
      game.canvas.style.width = newWidth * scale + 'px'
      game.canvas.style.height = newHeight * scale + 'px'
      // center the game with css margin
      game.canvas.style.marginTop = `${(h - newHeight * scale) / 2}px`
      game.canvas.style.marginLeft = `${(w - newWidth * scale) / 2}px`
    }

    window.addEventListener('resize', event => {
      resize()
    })
  
    resize()
  })
