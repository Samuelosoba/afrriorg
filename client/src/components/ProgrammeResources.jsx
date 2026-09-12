import { useProgrammes } from "../utils/useProgrammes";
import { lazy, Suspense, useState } from "react";
import { ArrowUpRight, FileText, Play } from "lucide-react";
import { programmeMedia } from "../data/programmeMedia";
import { youtubeEmbedUrl, reportUrl } from "../utils/media";

const PdfPreview = lazy(() => import("./PdfPreview"));

function Video({ video, src }) {
  const [playing, setPlaying] = useState(false);
  return (
    <article className="resource-card video-card">
      <div className="video-frame">
        {playing ? (
          <iframe
            src={src}
            title={video.title}
            allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        ) : (
          <button
            type="button"
            className="video-play"
            onClick={() => setPlaying(true)}
            aria-label={"Load video: " + video.title}
          >
            <img className="video-thumbnail" src={"https://i.ytimg.com/vi/" + src.split("/embed/")[1].split("?")[0] + "/hqdefault.jpg"} alt="" loading="lazy" />
            <Play size={28} />
            <span>Watch video</span>
          </button>
        )}
      </div>
      <div className="resource-copy">
        <h3>{video.title}</h3>
        {video.description && <p>{video.description}</p>}
        <a
          className="text-link"
          href={
            "https://www.youtube.com/watch?v=" +
            src.split("/embed/")[1].split("?")[0]
          }
          target="_blank"
          rel="noreferrer"
        >
          Watch on YouTube <ArrowUpRight size={15} />
        </a>
      </div>
    </article>
  );
}
function Report({ report, src }) {
  const [preview, setPreview] = useState(false);
  return (
    <article className="resource-card report-card">
      <div className="resource-copy">
        <FileText size={26} />
        <p className="page-eyebrow">
          PDF report{report.year ? " / " + report.year : ""}
        </p>
        <h3>{report.title}</h3>
        {report.description && <p>{report.description}</p>}
        <div className="resource-actions">
          <a
            className="button-outline"
            href={src}
            target="_blank"
            rel="noreferrer"
          >
            Open PDF <ArrowUpRight size={15} />
          </a>
          <button
            type="button"
            className="text-link"
            onClick={() => setPreview(!preview)}
            aria-expanded={preview}
          >
            {preview ? "Close preview" : "Preview report"}
          </button>
        </div>
      </div>
      {preview && (
        <div className="report-preview">
          <p>
            For the best reading experience on your device, you can also open
            the PDF in a new tab.
          </p>
          <Suspense fallback={<p role="status">Loading PDF viewer...</p>}>
            <PdfPreview key={src} src={src} title={report.title} />
          </Suspense>
        </div>
      )}
    </article>
  );
}
export default function ProgrammeResources({
  slug,
  title,
  hideEmpty = false,
  resource,
}) {
  const { categories } = useProgrammes();
  const item =
    resource ||
    categories.find((c) => c.slug === slug) ||
    categories.flatMap((c) => c.programs).find((p) => p.slug === slug);
  const media =
    item && (item.videos || item.reports) ? item : programmeMedia[slug] || {};
  const videos = (media.videos || [])
    .map((video) => ({ ...video, src: youtubeEmbedUrl(video.url) }))
    .filter((v) => v.src && v.title);
  const reports = (media.reports || [])
    .map((report) => ({ ...report, src: reportUrl(report.url) }))
    .filter((r) => r.src && r.title);
  if (hideEmpty && !videos.length && !reports.length) return null;
  return (
    <section
      className="page-section programme-resources"
      aria-label={title + " videos and reports"}
    >
      <p className="page-eyebrow">Explore the work</p>
      <h2>Videos &amp; reports</h2>
      {!videos.length && !reports.length ? (
        <p className="resource-empty">
          Programme videos and PDF reports will appear here when available.{" "}
          <a
            className="text-link"
            href={
              "mailto:hello@africarii.org?subject=" +
              encodeURIComponent(title + " report enquiry")
            }
          >
            Request a report <ArrowUpRight size={15} />
          </a>
        </p>
      ) : (
        <div className="resource-grid">
          {videos.map((v) => (
            <Video key={"video-" + v.src} video={v} src={v.src} />
          ))}
          {reports.map((r) => (
            <Report key={"report-" + r.src} report={r} src={r.src} />
          ))}
        </div>
      )}
    </section>
  );
}
