import { useState } from "react";
import { ArrowUpRight, FileText, Play } from "lucide-react";
import { programmeMedia } from "../data/programmeMedia";
import { youtubeEmbedUrl, reportUrl } from "../utils/media";

function Video({ video, src }) {
  const [playing, setPlaying] = useState(false);
  return <article className="resource-card">
    <div className="video-frame">
      {playing ? <iframe src={src} title={video.title} allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowFullScreen referrerPolicy="strict-origin-when-cross-origin"/> :
        <button type="button" className="video-play" onClick={()=>setPlaying(true)} aria-label={"Load video: " + video.title}><Play size={28}/><span>Watch video</span></button>}
    </div>
    <div className="resource-copy"><h3>{video.title}</h3>{video.description && <p>{video.description}</p>}<a className="text-link" href={"https://www.youtube.com/watch?v=" + src.split("/embed/")[1].split("?")[0]} target="_blank" rel="noreferrer">Watch on YouTube <ArrowUpRight size={15}/></a></div>
  </article>;
}
function Report({ report, src }) {
  const [preview, setPreview] = useState(false);
  return <article className="resource-card report-card">
    <div className="resource-copy"><FileText size={26}/><p className="page-eyebrow">PDF report{report.year ? " / " + report.year : ""}</p><h3>{report.title}</h3>{report.description && <p>{report.description}</p>}
      <div className="resource-actions"><a className="button-outline" href={src} target="_blank" rel="noreferrer">Open PDF <ArrowUpRight size={15}/></a><button type="button" className="text-link" onClick={()=>setPreview(!preview)} aria-expanded={preview}>{preview ? "Close preview" : "Preview report"}</button></div>
    </div>
    {preview && <div className="report-preview"><p>For the best reading experience on your device, you can also open the PDF in a new tab.</p><object data={src} type="application/pdf" aria-label={report.title}><p>Your browser cannot display this PDF here. <a href={src} target="_blank" rel="noreferrer">Open {report.title}</a>.</p></object></div>}
  </article>;
}
export default function ProgrammeResources({ slug, title, hideEmpty = false }) {
  const media = programmeMedia[slug] || {};
  const videos = (media.videos || []).map(video=>({...video, src:youtubeEmbedUrl(video.url)})).filter(v=>v.src && v.title);
  const reports = (media.reports || []).map(report=>({...report, src:reportUrl(report.url)})).filter(r=>r.src && r.title);
  if (hideEmpty && !videos.length && !reports.length) return null;
  return <section className="page-section programme-resources" aria-label={title + " videos and reports"}>
    <p className="page-eyebrow">Explore the work</p><h2>Videos &amp; reports</h2>
    {!videos.length && !reports.length ? <p className="resource-empty">Programme videos and PDF reports will appear here when available. <a className="text-link" href={"mailto:hello@africarii.org?subject="+encodeURIComponent(title+" report enquiry")}>Request a report <ArrowUpRight size={15}/></a></p> :
      <>{videos.length>0 && <div className="resource-grid">{videos.map(v=><Video key={v.src} video={v} src={v.src}/>)}</div>}{reports.length>0 && <div className="resource-grid">{reports.map(r=><Report key={r.src} report={r} src={r.src}/>)}</div>}</>}
  </section>;
}
