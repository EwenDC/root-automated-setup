const { join } = require("path");
const { readdir, readFileSync, writeFileSync } = require("fs");

const minifyJSON = (filePath) => {
  try {
    const data = readFileSync(filePath, "utf8");
    // Minify file by removing white space
    writeFileSync(filePath, JSON.stringify(JSON.parse(data)));
  } catch (error) {
    console.error(`Unable to minify JSON file at path "${filePath}":`, error);
  }
};

// Minify locale files
const localesPath = join(__dirname, "build", "locales");
readdir(localesPath, (err, files) => {
  if (err)
    console.error(`Unable to scan directory at path "${localesPath}":`, err);
  else
    files.forEach((file) => {
      minifyJSON(join(localesPath, file));
    });
});

// Minify manifest.json
minifyJSON(join(__dirname, "build", "manifest.json"));
