# Score-Counter
Keeps Track of Pokemon Card Game Matches

# Electron + SCSS how to (refer to changelog 02.03.22)
1. Setup a base Electron project alongside npm and a working CSS + HTML file (Using `<link href="style.css" rel="stylesheet">`)
2. Install [Dart Sass](https://sass-lang.com/dart-sass) using `npm install --save-dev sass`
3. Add this code block to your package.json (NOTE: for the purpose of this tutorial both files need to be in the same directory but this can be changed if wanted): 
```json
"scripts": {
     "startTest": "electron .",
     "start": "sass [SCSS file location] [CSS file location] && electron ."
  },
```
4. run `npm startTest` to confirm your project is working correctly and referencing then close electron
5. Convert your CSS file to SCSS and add some SCSS related content to make sure it really works
6. run `npm start` and tadah!

PS: remember to close electron if you make changes then re-run `npm start` (Ctrl+R won't work)
