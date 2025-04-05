import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';
import imagemin from 'imagemin';
import imageminPngquant from 'imagemin-pngquant';
import imageminMozjpeg from 'imagemin-mozjpeg';
import { fileURLToPath } from 'url';
import os from 'os';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BLOG_IMAGES_DIR = 'src/assets/blog/images';
const MAX_WIDTH = 1200;
const QUALITY = 80;

async function optimizeImage(inputPath, outputPath) {
    const ext = path.extname(inputPath).toLowerCase();
    const isPNG = ext === '.png';
    const isJPEG = ext === '.jpg' || ext === '.jpeg';

    // Create backup of original
    const backupPath = inputPath.replace(ext, `.original${ext}`);
    await fs.copyFile(inputPath, backupPath);

    // Create temporary file path
    const tempPath = path.join(os.tmpdir(), `optimized-${Date.now()}${ext}`);

    try {
        // Resize and optimize
        let sharpInstance = sharp(inputPath)
            .resize(MAX_WIDTH, null, {
                withoutEnlargement: true,
                fit: 'inside'
            });

        if (isPNG) {
            await sharpInstance
                .png({ quality: QUALITY })
                .toFile(tempPath);
        } else if (isJPEG) {
            await sharpInstance
                .jpeg({ quality: QUALITY })
                .toFile(tempPath);
        }

        // Further compress using imagemin
        await imagemin([tempPath], {
            destination: path.dirname(tempPath),
            plugins: [
                isPNG ? imageminPngquant({
                    quality: [0.6, 0.8]
                }) : imageminMozjpeg({
                    quality: QUALITY
                })
            ]
        });

        // Move optimized file to final location
        await fs.rename(tempPath, outputPath);

        // Create WebP version
        const webpPath = outputPath.replace(ext, '.webp');
        await sharp(outputPath)
            .webp({ quality: QUALITY })
            .toFile(webpPath);

        console.log(`Optimized: ${path.basename(inputPath)}`);
    } catch (error) {
        console.error(`Error optimizing ${inputPath}:`, error);
        // Clean up temp file if it exists
        try {
            await fs.unlink(tempPath);
        } catch (e) {
            // Ignore error if file doesn't exist
        }
        throw error;
    }
}

async function processDirectory(directory) {
    const entries = await fs.readdir(directory, { withFileTypes: true });
    
    for (const entry of entries) {
        const fullPath = path.join(directory, entry.name);
        
        if (entry.isDirectory()) {
            await processDirectory(fullPath);
        } else if (entry.isFile()) {
            const ext = path.extname(entry.name).toLowerCase();
            if (['.png', '.jpg', '.jpeg'].includes(ext)) {
                await optimizeImage(fullPath, fullPath);
            }
        }
    }
}

async function main() {
    try {
        console.log('Starting image optimization...');
        await processDirectory(BLOG_IMAGES_DIR);
        console.log('Image optimization completed!');
    } catch (error) {
        console.error('Error during optimization:', error);
    }
}

main(); 