# Adding a product

1. Put your images in `public/images/` and an optional MP4 in `public/videos/`.
2. Add an entry to `app/data/projects.ts`. The `Project` type lists all fields.
3. Use a unique, lowercase hyphenated `slug`, for example `desk-lamp`. It creates `/work/desk-lamp` automatically.
4. Set the title, category, short summary, cover, optional video, description paragraphs, and gallery images. Give each image its actual dimensions, descriptive alt text, caption, and note. Mark a gallery image `wide: true` to span both columns.
5. Keep the list in editorial order. The first entry is featured on the homepage; the next four appear as image cards. Remaining entries appear only on `/work`, linked by a View all projects link once the list exceeds five.
6. Run `npm run lint` and `npm run build` before publishing.

The homepage uses a still image below 901px and for reduced-motion visitors. The featured film loads only on larger screens when motion is allowed. Project pages retain the full film and gallery. No placeholder projects are shown.

Do not invent outcomes, client names, roles, or specifications. Add those to a project story only when confirmed.

## Completing the studio and case studies

Set the real enquiry email, team information, introduction, services, and approach in `app/data/site.ts`. Null values display explicit placeholders; the email becomes a working mail link only after a real address is supplied.

For each product, fill `credits` (role, client, year, stage) and `caseStudy` (brief, approach, validation, outcome) in `app/data/projects.ts`. Unfilled fields remain visibly labelled placeholders. Keep image context notes accurate, especially for AI concept imagery.
