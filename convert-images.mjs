import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// Get directory path from command line arguments
const targetDirectory = process.argv[2];

if (!targetDirectory) {
    console.error('Please provide a directory path as an argument.');
    process.exit(1); // Exit with an error code
}

// Use the provided directory path
const directoryPath = path.resolve(targetDirectory);
const outputDirectory = directoryPath; // Output to the same directory

// Ensure the target directory exists
if (!fs.existsSync(directoryPath)){
    console.error(`Error: Directory not found - ${directoryPath}`);
    process.exit(1);
}

// Ensure output directory exists (it should, but good practice)
if (!fs.existsSync(outputDirectory)){
    fs.mkdirSync(outputDirectory, { recursive: true });
}

fs.readdir(directoryPath, (err, files) => {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }

    files.forEach(file => {
        // Process only jpg files (case-insensitive)
        // if (path.extname(file).toLowerCase() === '.jpg') {
        // Process jpg or png files (case-insensitive)
        const extension = path.extname(file).toLowerCase();
        if (extension === '.jpg' || extension === '.png') {
            const inputFilePath = path.join(directoryPath, file);
            const outputFileName = path.basename(file, path.extname(file)) + '.webp';
            const outputFilePath = path.join(outputDirectory, outputFileName);

            console.log(`Converting ${inputFilePath} to ${outputFilePath}...`);

            sharp(inputFilePath)
                .webp({ quality: 80 }) // Adjust quality as needed (0-100)
                .toFile(outputFilePath, (err, info) => {
                    if (err) {
                        console.error(`Error converting ${file}:`, err);
                    } else {
                        console.log(`Successfully converted ${file} to WebP. Output size: ${info.size} bytes`);
                    }
                });
        }
    });
}); 