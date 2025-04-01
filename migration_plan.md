# WordPress Blog Migration Plan for Astro

**Goal:** Migrate blog content from `thegoodside.WordPress.2025-04-01.xml` export to the Astro project using Content Collections, ensuring SEO optimization.

**Steps:**

1.  **Analyze XML:**
    *   File: `thegoodside.WordPress.2025-04-01.xml` (root directory)
    *   Format: WordPress WXR
    *   Identify: `<item>` tags for posts, `<wp:post_type>`, `<wp:status>`, `<title>`, `<content:encoded>`, `<wp:post_name>` (slug), `<pubDate>`/`<wp:post_date_gmt>`, `<dc:creator>`, `<category>`, `<wp:postmeta>` (for SEO fields like `_genesis_description`, `_genesis_title`, and `_thumbnail_id`), inline `<img>` tags.

2.  **Conversion Strategy & Scripting:**
    *   Use a Node.js script (e.g., `scripts/migrate-blog.mjs`) to automate the process.
    *   Install necessary Node.js libraries:
        *   `fs-extra` (for file system operations)
        *   `xml2js` (to parse XML)
        *   `turndown` (to convert HTML to Markdown)
        *   `node-fetch` (or similar, to download images)
        *   `path` (for handling file paths)
        *   `js-yaml` (to format frontmatter)

3.  **Extraction & Transformation (per post):**
    *   Filter for `<item>` where `<wp:post_type>` is `post` and `<wp:status>` is `publish`.
    *   Parse metadata: title, slug, date, author, categories, SEO description (`_genesis_description`), SEO title (`_genesis_title`), thumbnail ID (`_thumbnail_id`).
    *   Parse HTML content from `<content:encoded>`.
    *   Convert HTML content to Markdown using `turndown`.

4.  **Image Handling (Option A - Download Locally):**
    *   **Featured Image:**
        *   Find the `attachment` item corresponding to the `_thumbnail_id`.
        *   Get the image URL from the attachment's `<guid>`.
        *   Download the image.
        *   Save it to `src/assets/blog/images/[post-slug]/featured.[ext]`.
        *   Store the *local relative path* (e.g., `./images/[post-slug]/featured.[ext]`) in the frontmatter (e.g., `heroImage`).
    *   **Inline Images:**
        *   Find all `<img>` tags in the HTML *before* converting to Markdown.
        *   For each `<img>` src URL:
            *   Download the image.
            *   Save it to `src/assets/blog/images/[post-slug]/[image-filename].[ext]`.
            *   Update the `src` attribute in the HTML to the *new local relative path* (e.g., `./images/[post-slug]/[image-filename].[ext]`).
        *   *After* updating paths and downloading, convert the modified HTML to Markdown.

5.  **File Creation:**
    *   Create the target directory `src/content/blog/` if it doesn't exist.
    *   Create the image directory `src/assets/blog/images/` if it doesn't exist.
    *   For each post, create `src/content/blog/[slug].md`.

6.  **Frontmatter Generation:**
    *   Write extracted metadata (title, pubDate, description (from SEO meta), author, tags, local heroImage path) into YAML frontmatter at the top of each `.md` file.

7.  **Astro Setup:**
    *   Define the content collection schema in `src/content/config.ts` (or `.js`). Include fields for `title`, `pubDate`, `description`, `author`, `tags`, `heroImage` (using `image()` helper if storing in `src/assets`).
    *   Create the blog index page: `src/pages/blog/index.astro`. Fetch posts using `getCollection('blog')` and list them.
    *   Create the dynamic route for single posts: `src/pages/blog/[...slug].astro`. Use `getCollection('blog')` and `entry.render()` to display content.
    *   Create a layout for blog posts: `src/layouts/BlogPostLayout.astro`. Include slots for content and add SEO meta tags using frontmatter data.
    *   Add basic styling for the blog list and post pages.
    *   Add a link to `/blog` in the site navigation (`src/components/Header.astro` or similar). 