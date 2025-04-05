import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';

// Helper to resolve paths relative to the script file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// Paths
const BLOG_DIR = path.join(projectRoot, 'src/content/blog');
const ASSETS_DIR = path.join(projectRoot, 'src/assets/blog/images');

async function updateBlogPosts() {
  console.log('Starting blog post image updates...');
  
  // Get all markdown files in the blog directory
  const files = await fs.readdir(BLOG_DIR);
  const markdownFiles = files.filter(file => file.endsWith('.md'));
  
  for (const file of markdownFiles) {
    const filePath = path.join(BLOG_DIR, file);
    const content = await fs.readFile(filePath, 'utf8');
    
    // Extract frontmatter
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
    if (!frontmatterMatch) continue;
    
    const frontmatterYaml = frontmatterMatch[1];
    const frontmatter = yaml.load(frontmatterYaml);
    
    // Check if heroImage exists and is a string path
    if (frontmatter.heroImage && typeof frontmatter.heroImage === 'string') {
      const imagePath = frontmatter.heroImage;
      
      // Extract the slug from the image path
      const slugMatch = imagePath.match(/\/images\/blog\/([^\/]+)\//);
      if (!slugMatch) continue;
      
      const slug = slugMatch[1];
      const imageName = path.basename(imagePath);
      
      // Check if the image exists in the assets directory
      const assetPath = path.join(ASSETS_DIR, slug, imageName);
      if (await fs.pathExists(assetPath)) {
        // Update the frontmatter to use the image() helper
        const newImagePath = `../../../assets/blog/images/${slug}/${imageName}`;
        
        // Replace the old image path with the new one
        const newContent = content.replace(
          `heroImage: ${imagePath}`,
          `heroImage: ${newImagePath}`
        );
        
        // Write the updated content back to the file
        await fs.writeFile(filePath, newContent, 'utf8');
        console.log(`Updated image path in ${file}`);
      } else {
        console.log(`Image not found for ${file}: ${assetPath}`);
      }
    }
  }
  
  console.log('Blog post image updates completed!');
}

updateBlogPosts().catch(console.error); 