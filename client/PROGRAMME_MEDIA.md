# Programme and article media

Use `/admin` to manage live website media:

- **Programmes**: edit category and individual programme videos, PDF reports and images.
- **Articles**: edit Summer School year-specific articles, photo galleries, video embeds and PDFs.

Upload images or PDFs with the editor, or provide a direct HTTPS URL. YouTube
accepts watch/short/embed links or a video ID. Images have descriptions; galleries
can contain multiple photos. Report previews use a responsive page-by-page viewer and an Open PDF link.
Images upload to Cloudinary (8 MB maximum); PDFs upload to MongoDB GridFS
(25 MB maximum), so Cloudinary PDF delivery restrictions do not affect new uploads.
Articles also support editable headline figures.

Run `npm run seed` in `server` to import existing categories and yearly articles.
It preserves existing records. See [backend setup](../server/README.md).

`src/data/reportStories.json`, `src/data/programmeMedia.js` and `src/data/content.js` remain local fallbacks when
the backend is unavailable; saved MongoDB content takes precedence.
