import fs from 'fs-extra';
import path from 'path';
import xml2js from 'xml2js';
import TurndownService from 'turndown';
import axios from 'axios';
import yaml from 'js-yaml';
import { fileURLToPath } from 'url';

// Helper to resolve paths relative to the script file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..'); // Adjust if script is nested deeper

// --- Configuration ---
const XML_FILE_PATH = path.join(projectRoot, 'thegoodside.WordPress.2025-04-01.xml');
const CONTENT_OUTPUT_DIR = path.join(projectRoot, 'src/content/blog');
const ASSETS_OUTPUT_DIR = path.join(projectRoot, 'src/assets/blog/images');
const BASE_ASSET_URL_PATH = './images'; // Relative path from markdown to asset dir

// --- Initialization ---
const parser = new xml2js.Parser();
const turndownService = new TurndownService({
    headingStyle: 'atx', // Use ## headings
    codeBlockStyle: 'fenced', // Use ``` code blocks
    bulletListMarker: '-',
});

// Add rule for WordPress captions if needed (basic example)
turndownService.addRule('wpCaption', {
    filter: node => {
        return node.nodeName === 'FIGURE' && /wp-caption/.test(node.className);
    },
    replacement: (content, node) => {
        const figcaption = node.querySelector('figcaption');
        const captionText = figcaption ? figcaption.textContent.trim() : '';
        const innerContent = turndownService.turndown(node.innerHTML.replace(/<figcaption.*?<\/figcaption>/i, '')).trim();
        // Return image/content followed by caption on a new line
        return `\n${innerContent}\n\n_${captionText}_\n\n`;
    }
});


// --- Helper Functions ---

/**
 * Downloads an image from a URL and saves it locally.
 * @param {string} imageUrl The URL of the image to download.
 * @param {string} savePath The full path where the image should be saved.
 * @returns {Promise<void>}
 */
async function downloadImage(imageUrl, savePath) {
    try {
        // Ensure directory exists
        await fs.ensureDir(path.dirname(savePath));

        const response = await axios({
            method: 'GET',
            url: imageUrl,
            responseType: 'stream',
        });

        const writer = fs.createWriteStream(savePath);
        response.data.pipe(writer);

        return new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        });
    } catch (error) {
        console.error(`Error downloading image ${imageUrl}:`, error.message);
        // Decide if you want to throw or just skip
        // throw error;
    }
}

/**
 * Extracts a specific meta value from WordPress post meta array.
 * @param {Array} postmeta The wp:postmeta array.
 * @param {string} metaKey The meta key to find (e.g., '_genesis_description').
 * @returns {string | undefined} The meta value or undefined if not found.
 */
function getMetaValue(postmeta, metaKey) {
    const meta = postmeta?.find(meta => meta.hasOwnProperty('wp:meta_key') && meta['wp:meta_key'][0] === metaKey);
    return meta?.['wp:meta_value']?.[0];
}


// --- Main Processing Function ---
async function processWordPressExport() {
    console.log('Starting WordPress migration...');

    try {
        const xmlData = await fs.readFile(XML_FILE_PATH, 'utf8');
        const result = await parser.parseStringPromise(xmlData);

        const channel = result.rss.channel[0];
        const items = channel.item || [];
        const attachments = items.filter(item => item['wp:post_type']?.[0] === 'attachment');

        // Create a map for quick lookup of attachments by ID
        const attachmentMap = attachments.reduce((map, item) => {
            const postId = item['wp:post_id']?.[0];
            if (postId) {
                map[postId] = item['guid']?.[0]?._; // Get URL from guid
            }
            return map;
        }, {});


        const posts = items.filter(item => item['wp:post_type']?.[0] === 'post' && item['wp:status']?.[0] === 'publish');

        console.log(`Found ${posts.length} published posts to migrate.`);

        for (const post of posts) {
            const title = post.title[0] || 'Untitled';
            const slug = post['wp:post_name']?.[0];
            const pubDateGmt = post['wp:post_date_gmt']?.[0];
            const author = post['dc:creator']?.[0];
            const categories = post.category?.filter(cat => cat.$.domain === 'category').map(cat => cat._) || [];
            const postmeta = post['wp:postmeta'];
            const contentHtml = post['content:encoded']?.[0] || '';
            const postId = post['wp:post_id']?.[0];

            if (!slug) {
                console.warn(`Skipping post "${title}" due to missing slug.`);
                continue;
            }

            console.log(`Processing post: ${title} (Slug: ${slug})`);

            // --- Prepare Frontmatter Data ---
            const frontmatter = {};
            frontmatter.title = title.trim();
            if (pubDateGmt) {
                try {
                    frontmatter.pubDate = new Date(pubDateGmt + 'Z').toISOString(); // Ensure UTC
                } catch (e) {
                    console.warn(`Could not parse date for post ${slug}: ${pubDateGmt}`);
                }
            }
            const seoDescription = getMetaValue(postmeta, '_genesis_description');
            if (seoDescription) frontmatter.description = seoDescription.trim();
            const seoTitle = getMetaValue(postmeta, '_genesis_title');
            if (seoTitle && seoTitle.trim() !== title.trim()) frontmatter.seoTitle = seoTitle.trim(); // Optional: only if different from main title

            if (author) frontmatter.author = author;
            if (categories.length > 0) frontmatter.tags = categories.filter(tag => tag.toLowerCase() !== 'blog'); // Filter out generic 'Blog' category

            // --- Handle Featured Image ---
            let featuredImageLocalPath = undefined;
            const thumbnailId = getMetaValue(postmeta, '_thumbnail_id');
            if (thumbnailId && attachmentMap[thumbnailId]) {
                const imageUrl = attachmentMap[thumbnailId];
                const imageName = path.basename(new URL(imageUrl).pathname);
                const localPath = path.join(ASSETS_OUTPUT_DIR, slug, `featured${path.extname(imageName)}`);
                const relativePath = path.join(BASE_ASSET_URL_PATH, slug, `featured${path.extname(imageName)}`).replace(/\\/g, '/'); // Use forward slashes

                console.log(`  Downloading featured image: ${imageUrl}`);
                await downloadImage(imageUrl, localPath);
                featuredImageLocalPath = relativePath;
                frontmatter.heroImage = featuredImageLocalPath; // Relative path for Astro's image() helper
                frontmatter.heroImageAlt = title; // Basic alt text
            }

             // --- Handle Inline Images ---
             let modifiedContentHtml = contentHtml;
             const imageRegex = /<img[^>]+src="([^">]+)"[^>]*>/gi;
             const imagesToDownload = [];
             let match;

             // First pass: identify images and prepare download tasks
             while ((match = imageRegex.exec(contentHtml)) !== null) {
                 const imgTag = match[0];
                 const imageUrl = match[1];

                // Basic check to avoid downloading already local or data URIs
                 if (!imageUrl || imageUrl.startsWith('data:') || imageUrl.startsWith('.') || imageUrl.startsWith('/')) {
                    continue;
                }

                 try {
                    const imageName = path.basename(new URL(imageUrl).pathname);
                    const localPath = path.join(ASSETS_OUTPUT_DIR, slug, imageName);
                    const relativePath = path.join(BASE_ASSET_URL_PATH, slug, imageName).replace(/\\/g, '/');

                    // Avoid downloading duplicates for the same post
                    if (!imagesToDownload.some(img => img.originalUrl === imageUrl)) {
                        imagesToDownload.push({
                            originalUrl: imageUrl,
                            localPath: localPath,
                            relativePath: relativePath,
                            imgTag: imgTag
                        });
                    }
                } catch (urlError) {
                    console.warn(`  Could not parse image URL ${imageUrl} in post ${slug}: ${urlError.message}`);
                }
            }

             // Second pass: download and replace URLs
             for (const img of imagesToDownload) {
                console.log(`  Downloading inline image: ${img.originalUrl}`);
                await downloadImage(img.originalUrl, img.localPath);
                // Replace the original URL within its specific img tag
                // This is safer than a global replace if URLs are similar
                const newImgTag = img.imgTag.replace(img.originalUrl, img.relativePath);
                modifiedContentHtml = modifiedContentHtml.replace(img.imgTag, newImgTag);
             }


            // --- Convert Content to Markdown ---
            const markdownContent = turndownService.turndown(modifiedContentHtml);

            // --- Write Markdown File ---
            const outputFilePath = path.join(CONTENT_OUTPUT_DIR, `${slug}.md`);
            const fileContent = `---
${yaml.dump(frontmatter)}---

${markdownContent}`;

            await fs.ensureDir(path.dirname(outputFilePath));
            await fs.writeFile(outputFilePath, fileContent);
            console.log(`  Successfully migrated to ${outputFilePath}`);
        }

        console.log('WordPress migration finished successfully!');

    } catch (error) {
        console.error('Error during WordPress migration:', error);
    }
}

// --- Run the script ---
processWordPressExport(); 