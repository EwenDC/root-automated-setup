# Root Automated Setup

Welcome to the GitHub page for the Root Automated Setup. If you wish to run it, simply head over to [https://ewendc.github.io/root-automated-setup/](https://ewendc.github.io/root-automated-setup/). If you wish to contribute to the project, please read on.

## Reporting an issue

If you have encountered a bug or unexpected behavior when running the app, or you have run into an obstacle while trying to contribute a translation or code change, then please do not hesitate to raise a new issue [here](https://github.com/EwenDC/root-automated-setup/issues).

## Setting Up the Developer Environment

If you wish to contribute code or translations to this project, you will be required to run it on your local machine. To get started:

1. Install [pnpm](https://pnpm.io/) using the standalone script relevant to your OS.
2. Once you have installed pnpm, [clone](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) the repository to your computer.
3. In the opened command line program, navigate to the folder you cloned the repository to, and execute the `pnpm install` command. This should automatically download external code dependencies, as well as the version of Node.js required for development.

The application is now ready to be run on your computer. To run it, execute the `pnpm dev` command, then navigate to [http://localhost:5173/root-automated-setup/](http://localhost:5173/root-automated-setup/) in your web browser.

## Translations

This project was built from the ground up with translation support using [i18next](https://www.i18next.com/), more specifically with the [react-i18next](https://react.i18next.com/) plugin. This means that translations are loaded from javascript at runtime.

### Updating a Translation

All translations are located in the `/src/locales/` folder of the repo. You can learn more about the translation format [here](https://www.i18next.com/misc/json-format#i18next-json-v4). To summarize the basics, the file is formatted as a set of nested translation keys and translation values like this:

```TypeScript
export default {
  deck: {
    exiles: `Exiles and Partisans`,
    standard: `Standard`
  },
}
```

The translation keys are required for the application to know what translation to use, so you will (mostly\*) not change the keys (or the file's structure in general) when translating. Instead, you will edit the values to match the translated text for the given language. i.e. if the previous example came from `en-US.ts`, this is what that same example would look like in `nl-NL.ts` (translation is for demonstration purposes, and is not accurate):

```TypeScript
export default {
  deck: {
    exiles: `Ballingen en Partizanen`,
    standard: `Standaard`
  },
}
```

Some translated text will include formatting using HTML or HTML-Like tags like so:

```TypeScript
export default {
  forge: {
    setup: `Player {{count}}, place the Legendary Forge landmark in a clearing. It cannot have a landmark or be adjacent to one. Grab the "Legendary Forge" landmark card from the game box and place it next to the board on it's non-setup side.<br/>Based on the suit of the Legendary Forge's clearing, remove the following items from the item supply on the map, and place them on the Legendary Forge card:<p><Fox/>: <Sword/> <Sword/> <Crossbow/> <Hammer/></p><p><Mouse/>: <Bag/> <Bag/> <Tea/> <Tea/></p><p><Rabbit/>: <Boot/> <Boot/> <Coin/> <Coin/></p>`
  },
}
```

When translating, please edit the text around these tags, but not the tags themselves, like so:

```TypeScript
export default {
  forge: {
    setup: `Speler {{count}}, plaats het Legendary Forge-oriëntatiepunt op een open plek. Het mag geen oriëntatiepunt hebben of er aan grenzen. Pak de oriëntatiepuntkaart "Legendarische Smederij" uit de doos en plaats deze naast het bord op de niet-opgezette kant.<br/>Gebaseerd op de kleur van de ontruiming van de Legendary Forge, verwijder je de volgende items uit de itemvoorraad op de kaart en plaats ze op de Legendary Forge-kaart:<p><Fox/>: <Sword/> <Sword/> <Crossbow/> <Hammer/></p><p><Mouse/>: <Bag/> <Bag/> <Tea/> <Tea/></p><p><Rabbit/>: <Boot/> <Boot/> <Coin/> <Coin/></p>`
  },
}
```

Some translated text will include substitutions, demoted by double curly braces like so:

```TypeScript
export default {
  setUpMapLandmark: {
    subtitle: `Set up the {{landmark}}`
  },
}
```

When translating, place the substitution (as-is) in the correct place in your text like so:

```TypeScript
export default {
  setUpMapLandmark: {
    subtitle: `Het {{landmark}} instellen`
  },
}
```

\*If the substitution is `{{count}}`, that represents a contextual number for the text. You can provide plural forms of the text for your language in separate keys, even if the English translation does not include those keys. See the [i18next documentation](https://www.i18next.com/translation-function/plurals) for more information. This is the only situation in which you will modify the structure/keys of the translation file

### Adding a New Language

To add a new language translation, simply copy and paste the `en-US.ts` file located in the `/src/locales/` folder of the repo. Rename your new file to [locale code]`.ts`. Then, you need to add your language to the list of languages contained in `/src/i18nSetup.ts`. Go to the top of the file and look for the section that matches this format:

```TypeScript
import EnglishFlag from "./images/languages/en-US.svg";

export const languages = [
  { name: "English", locale: "en-US", image: EnglishFlag },
];
```

You will need to add a new entry for your added language inside of the `languages` list. Copy an existing line and replace the name and locale with your language's name and the same [two letter language code](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) you used for the file. You will also need to provide a flag image for the language selector. I recommend finding an appropriate flag SVG on wikimedia. Save it to the `/src/images/languages` folder with an appropriate name, then add an import for it to the above section as per the other languages. You changes should end up looking something like this:

```TypeScript
import EnglishFlag from "./images/languages/en-US.svg";
import DutchFlag from "./images/languages/nl-NL.svg";

export const languages = [
  { name: "English", locale: "en-US", image: EnglishFlag },
  { name: "Nederlands", locale: "nl-NL", image: DutchFlag },
];
```

### Testing a Translation

Open the command line program for your operating system and navigate to the folder you cloned this repository to. Execute the `pnpm dev` command, then navigate to [http://localhost:5173/root-automated-setup/](http://localhost:5173/root-automated-setup/). When you make changes to the translation file inside of `/src/locales/`, the webpage should refresh with your changes reflected in the app.

### Translation Standards

1. As much as possible, please copy the punctuation of the original English text. (e.g. If a sentence ends without a full stop, don't include a full stop in your translation, and vice-versa).
2. Match the translation of your language’s official Root localization where possible (this includes the name of cards in instances where they are referenced in text).

## Adding content

This app was designed from the ground up to easily support the addition of new Root content without any code changes (as long as it doesn't modify the overall advanced setup rules). The game content is loaded from a file called [componentDefinitions.ts](https://github.com/EwenDC/root-automated-setup/blob/main/src/componentDefinitions.ts), which contains a list of all expansions, and what components are included in each expansion. Since it is a TypeScript file, the correct format is enforced by TypeScript. You can see what the expected format is in the [types.ts](https://github.com/EwenDC/root-automated-setup/blob/main/src/types.ts#L33) file. The associated images of new content should be imported into the file as per the example set by existing content. This allows the images to be processed by the compiler.

We are willing to accept contributions for fan-made print-and-play content, provided that there is enough demand from users to do so. Remember, this app is designed specifically for the physical game, so content that only exists on Tabletop Simulator would not be eligible to be added.

### Content Text

All content text is defined within the translation files, using dynamic key lookup based on the code you assigned to the component. For example, if you define the Lake map like so:

```TypeScript
const definitions: Record<ExpansionCode, Expansion> = {
  underworld: {
    base: false,
    image: underworldBox,
    maps: {
      lake: {
        landmark: "ferry",
        image: lakeMap,
      },
    },
  },
}
```

The app will attempt to load all relevant text for this map from the `map.lake` key, which you would define in `/src/locales/en-US.ts` like so:

```TypeScript
export default {
  map: {
    lake: {
      name: `Lake`,
      setupTitle: `Set up the Lake Map`,
      setup: `<i>1.</i> Grab the Lake/Mountain map board from the game box and place it down with the Lake side facing up.<br/><i>2.</i> Collect the 12 suit markers, flip them face down, and shuffle them, then place one on each clearing.<br/><i>3.</i> Place a ruin in each slot on the map marked with an "R" <i>(four in total)</i>.<br/><i>4.</i> Place these items on the matching spaces of the item supply near the top of the map: 2 <Boot/>, 2 <Bag/>, 1 <Crossbow/>, 1 <Hammer/>, 2 <Sword/>, 2 <Tea/>, 2 <Coin/>.<br/><i>5.</i> Place the two dice near the map.`,
      landmarkSetup: `Place the Ferry piece in the corner clearing that is also a coastal clearing. If you have "The Ferry" landmark card, take it from the game box and place it next to the board on its non-setup side.`,
    },
  },
}
```

Most text you define can support the following basic HTML tags (More information in the [react-i18next documentation](https://react.i18next.com/latest/trans-component#usage-with-simple-html-elements-like-less-than-br-greater-than-and-others-v10.4.0)):

- `<br/>`
- `<i></i>`
- `<p></p>`
- `<b></b>`
- `<ol></ol>`
- `<li></li>`

The following list of custom tags are also supported for the purpose of displaying inline suit and item icons:

- `<Fox/>`
- `<Mouse/>`
- `<Rabbit/>`
- `<Bag/>`
- `<Boot/>`
- `<Coin/>`
- `<Crossbow/>`
- `<Hammer/>`
- `<Sword/>`
- `<Tea/>`
- `<Torch/>`

### Content Images

All images used in the app are sourced from official sources, including the [Leder Games Website](https://ledergames.com/pages/resources) and [Board Game Geek](https://boardgamegeek.com/boardgame/237182/root), and also from semi-official sources including the [Tabletop Simulator Mod](https://boardgamegeek.com/boardgame/237182/root). When adding images for components, please try to maintain the same image quality standards as the existing content images. Save your images as either a `.png` or `.svg` file, in a square (1:1) aspect ratio, and at a resolution no greater than 512x512 (if a `.png` file).

## Contributing Code

Over on the [issues page](https://github.com/EwenDC/root-automated-setup/issues) are a list of feature requests for the app. You can feel free to have a crack at implementing one of them, or any other feature or minor fix you can think of. When you are done, fork this repository then submit your changes as a [pull request](https://github.com/EwenDC/root-automated-setup/pulls).

### Code Standards

1. Before submitting code for review, please ensure it has been formatted using [Prettier](https://prettier.io/) (if you are using Visual Studio Code with the Prettier extension then this should happen automatically).

### Frameworks

This project was built using [React](https://reactjs.org/), [Redux](https://redux.js.org/), and [Redux Toolkit](https://redux-toolkit.js.org/).

## Available Scripts

In the project directory, you can run:

### `pnpm dev`

Runs the app in the development mode. Open [http://localhost:5173/root-automated-setup/](http://localhost:5173/root-automated-setup/) to view it in the browser. The page will reload if you make edits. You will also see any lint errors in the console.

### `pnpm build`

Builds the app for production to the `dist` folder. It correctly bundles React in production mode and optimizes the build for the best performance (minifying it and adding hashes to the filenames).

## License

Unless covered under an existing license, all work included in this repository is licensed under [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International](https://creativecommons.org/licenses/by-nc-sa/4.0/). "Root", images of Root components, and art or text taken from Root, are the intellectual property of [Leder Games](https://ledergames.com/) and fall under the license provisions set forward by them. This repository includes icons taken from [Font Awesome Free](https://github.com/FortAwesome/Font-Awesome), which fall under their [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) License.
