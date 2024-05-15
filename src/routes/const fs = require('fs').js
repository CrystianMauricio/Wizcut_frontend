const fs = require("fs").promises;
const path = require("path");

async function createFileObject(filePath) {
  try {
    const buffer = await fs.readFile(filePath);
    const file = {
      name: path.basename(filePath),
      size: buffer.length,
      type: "text/plain", // You might need a way to determine this based on the file content or extension
      lastModified: (await fs.stat(filePath)).mtime.getTime(),
      content: buffer,
    };
    return file;
  } catch (error) {
    console.error("Error creating file object:", error);
    return null;
  }
}

async function processFile() {
  const filePath = path.join(__dirname, "filename.txt");
  const fileObject = await createFileObject(filePath);
  if (fileObject) {
    console.log("Custom File Object:", fileObject);
    // Here, you can use fileObject.content.toString() to get the file's text content if needed
  }
}

processFile();
