# Programme videos and PDF reports

Edit src/data/programmeMedia.js. Every programme has its own videos and reports arrays.
You can also add category keys: education, community-resource-centre, community-health,
women-and-girls, innovation. Category resources appear below the programme cards.

Example structure (replace placeholders with real content before enabling):

    "summer-school": {
      videos: [
        { title: "Summer School highlights", url: "https://www.youtube.com/watch?v=YOUR_VIDEO_ID", description: "A short description." }
      ],
      reports: [
        { title: "Summer School annual report", year: "2025", url: "/reports/summer-school-2025.pdf", description: "Programme activities and outcomes." }
      ]
    }

YouTube accepts an 11-character video ID, a watch URL, youtu.be, Shorts, live or embed URL.
Videos load only when a visitor presses Watch video; external playback is also available.
Videos must permit embedding on YouTube.

For PDFs, put files in public/reports/ and use /reports/filename.pdf,
or provide a direct HTTPS PDF URL. A shared drive HTML preview link is not a PDF file.
Each report has an Open PDF link and an expandable inline preview.
PDF rendering depends on the browser; the direct link remains available on mobile.
External hosts may prevent embedding; hosting the PDF in public/reports avoids that issue.

No sample videos or fabricated report files are published. Empty programmes show a report enquiry link.

Summer School articles have separate media entries: summer-school-2024,
summer-school-2025 and summer-school-2026. Add videos and reports to the matching
entry in src/data/programmeMedia.js to display them in that year's article.

The article collage uses image and secondImage from src/data/content.js by default.
For a larger gallery, add a photos array to that year's summerStories entry:

    photos: [
      { src: importedPhoto, alt: "A description of the photograph" },
      { src: anotherImportedPhoto, alt: "A description of the second photograph" }
    ]

Use photos verified for the relevant edition; keep archive attribution on draft years.
