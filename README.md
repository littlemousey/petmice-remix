# 🐭 Pet Mice Gallery - React + Vite + TypeScript

A gallery displaying the lovely mice from the `r/PetMice` subreddit.
You can find the deployed version on Github [here](https://littlemousey.github.io/petmice-remix/)
In case there are CORS problems with Reddit, you can always run the app locally. You can find instructions below.
If you don't want to install Node and NPM on your computer, the original/initial version built with basic HTML, JavaScript and CSS can be found [here](https://github.com/littlemousey/petmice-subreddit)
Of course you are free to alter/change the code to your liking.

## How to install the app locally

I would recommend installing the latest NodeJS version [here](https://nodejs.org/en/download).
Download the files with [Git](https://git-scm.com/install/) from Github
Open the folder `petmice-remix` and launch a terminal. Run the following commands:

- `npm install`
- `npm run dev`

You should see in the terminal which port is used for the app. You can copy paste that location to your browser url. For example: `http://localhost:5173/petmice-remix/`

When you want to terminate the app, just press the buttons `ctrl` and `c`

## 🎨 Themes

### Rainbow Theme (Default)

- Vibrant rainbow gradient background
- Polaroid-style photo frames
- Rotated frames for dynamic look

### Christmas Theme

- Deep red background with animated snowfall
- Gold accents and festive styling
- Snow animation effect

Theme preference is saved in localStorage.

### Reddit API

The app fetches from:

```
https://www.reddit.com/r/PetMice/top.json?limit=25&t=week&raw_json=1
```

## 🙏 Credits

- Mouse images from [r/PetMice](https://reddit.com/r/PetMice)
- Built with [Vite](https://vite.dev/), [React](https://react.dev/), and [Tailwind CSS](https://tailwindcss.com/)
- Font: [Edu NSW ACT Cursive](https://fonts.google.com/specimen/Edu+NSW+ACT+Foundation)
- Song from [Pixabay](https://pixabay.com/sound-effects/christmas-is-christmas-loop-3-melody-without-drums-409042/)

## 📄 License: MIT

You can use this application and the code however you want

---

Made with ❤️ for mouse lovers everywhere! 🐭
