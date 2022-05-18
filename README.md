# Root Automated Setup
Welcome to the GitHub page for the Root Automated Setup. If you wish to run it, simply head over to [https://ewendc.github.io/root-automated-setup/](https://ewendc.github.io/root-automated-setup/). If you wish to contribute to the project, please read on.

## Reporting an issue
If you have encountered a bug or unexpected behaviour when running the app, or you have run into an obstacle while trying to contribute a translation or code change, then please do not hesitate to raise a new issue [here](https://github.com/EwenDC/root-automated-setup/issues).

## Setting Up the Developer Environment
If you wish to contribute code or translations to this project, you will be required to run it on your local machine. To get started:
1. Download [Node.js](https://nodejs.org/) and the [Yarn](https://yarnpkg.com/) package manager. If you wish to contribute code, it is also recommended that you download [Visual Studio Code](https://code.visualstudio.com/) to take advantage of the pre-existing workplace configuration.
2. Once you have installed Node and Yarn, [clone](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) the repository to your computer.
3. Open the command line program for your operating system, navigate to the folder you cloned the repository to, and execute the `yarn install` command.

The application is now ready to be run on your computer. To run it, execute the `yarn start` command, then navigate to [http://localhost:3000](http://localhost:3000) in your web browser.

## Translations
This project was built from the ground up with translation support using [i18next](https://www.i18next.com/), more specifically with the [react-i18next](https://react.i18next.com/) and [i18next-http-backend](https://github.com/i18next/i18next-http-backend) plugins. This means that translations are loaded from a .json file on the webserver at runtime.

### Updating a Translation
All translations are located in the `/public/locales/` folder of the repo. You can learn more about the .json translation file format [here](https://www.i18next.com/misc/json-format#i18next-json-v4). To summarise the basics, the file is formatted as a set of nested translation keys and translation values like this:
```JSON
{
  "deck": {
    "exiles": "Exiles and Partisans",
    "standard": "Standard"
  }
}
```
The translation keys are required for the application to know what translation to use, so you will (mostly*) not change the keys (or the file's structure in general) when translating. Instead, you will edit the values to match the translated text for the given language. i.e. if the previous example came from `auset-en.json`, this is what that same example would look like in `auset-nl.json`:
```JSON
{
  "deck": {
    "exiles": "Ballingen en Partizanen",
    "standard": "Standaard"
  }
}
```
Some translated text will include substitutions, demoted by double curly braces like so:
```JSON
"setUpMapLandmark": {
  "subtitle": "Set up the {{landmark}}"
},
```
When translating, place the substitution (as-is) in the correct place in your text like so:
```JSON
"setUpMapLandmark": {
  "subtitle": "Het {{landmark}} instellen"
},
```
If the substitution is `{{count}}`, that represents a contextual number for the text. You can provide plural forms of the text for your language in separate keys, even if the English translation does not include those keys. See the [i18next documentation](https://www.i18next.com/translation-function/plurals) for more information.<br/>
*This is the only situation in which you will modify the structure/keys of the translation file

### Testing a Translation
Open the command line program for your operating system and navigate to the folder you cloned this repository to. Execute the `yarn start` command, then navigate to [http://localhost:3000](http://localhost:3000) in your web browser, ensuring that your browser and/or device are set to the language you wish to test the translation of. When you make changes and save the .json translation file, the webpage should refresh with your changes reflected in the app.

### Adding a New Language
To add a new language translation, simply copy and paste the `auset-en.json` file located in the `/public/locales/` folder of the repo. Rename your new file to match the format of `auset-`[[Two letter language code]](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes)`.json`. Open the file and change any of the English strings, then run the app with your device and/or browser language set to the newly added language. You should see your changes reflected in the app text.

### Translation Standards
1. As much as possible, please copy the punctuation of the original English text. (i.e. If a sentence ends without a full stop, don't include a full stop in your translation, and vice-versa).
2. Match the translation of your language’s official localization where possible.

## Contributing Code
Over on the [issues page](https://github.com/EwenDC/root-automated-setup/issues) I have already flagged some potential functionality that can be added to the app. You can feel free to have a crack at implementing one of them, or any other feature or minor fix you can think of. When you are done, fork this repository then submit your changes as a [pull request](https://github.com/EwenDC/root-automated-setup/pulls).

### Code Standards
1. Before submitting code for review, please ensure it has been formatted using [Prettier](https://prettier.io/). If you are using Visual Studio Code, and you have installed the workspace recommended Prettier editor extension, then this should happen automatically whenever you save a file.
2. As of me writing this, there are currently no automated tests set up for this project, but I would like to add them in the future. When submitting a change, please ensure that you maintain or raise the current level of test coverage.

### Frameworks
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template. You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started). To learn React, check out the [React documentation](https://reactjs.org/).

## Available Scripts
In the project directory, you can run:

### `yarn start`
Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser. The page will reload if you make edits. You will also see any lint errors in the console.

### `yarn test`
Launches the test runner in the interactive watch mode. See the Create React App documentation about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`
Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance (minifying it and adding hashes to the filenames).

## License
Unless covered under an existing license, all work included in this repository is licensed under [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International](https://creativecommons.org/licenses/by-nc-sa/4.0/). "Root", images of Root components, and art or text taken from Root, are the intellectual property of [Leder Games](https://ledergames.com/) and fall under the license provisions set forward by them. This repository includes icons taken from [Font Awesome Free](https://github.com/FortAwesome/Font-Awesome), and fall under their [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) License.
