import { useEffect, useRef, useState } from "react";
import * as pdfjs from "pdfjs-dist";
import workerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";
pdfjs.GlobalWorkerOptions.workerSrc = workerUrl;
export default function PdfPreview({ src, title }) {
  const host = useRef(null),
    canvas = useRef(null),
    [document, setDocument] = useState(null),
    [page, setPage] = useState(1),
    [width, setWidth] = useState(280),
    [error, setError] = useState("");
  useEffect(() => {
    const task = pdfjs.getDocument({ url: src });
    let active = true;
    task.promise
      .then((pdf) => {
        if (active) setDocument(pdf);
      })
      .catch(() => {
        if (active)
          setError(
            "This PDF could not be loaded. Try Open PDF, or contact the team if its link is unavailable.",
          );
      });
    return () => {
      active = false;
      task.destroy();
    };
  }, [src]);
  useEffect(() => {
    const observer = new ResizeObserver((entries) =>
      setWidth(Math.max(100, Math.floor(entries[0].contentRect.width))),
    );
    if (host.current) observer.observe(host.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!document) return;
    let active = true,
      renderTask;
    document
      .getPage(page)
      .then((pdfPage) => {
        if (!active) return;
        const viewport = pdfPage.getViewport({
          scale: width / pdfPage.getViewport({ scale: 1 }).width,
        });
        const ratio = Math.min(window.devicePixelRatio || 1, 2);
        const target = canvas.current;
        target.width = Math.floor(viewport.width * ratio);
        target.height = Math.floor(viewport.height * ratio);
        target.style.width = "100%";
        target.style.height = "auto";
        renderTask = pdfPage.render({
          canvasContext: target.getContext("2d"),
          viewport,
          transform: ratio === 1 ? null : [ratio, 0, 0, ratio, 0, 0],
        });
        return renderTask.promise;
      })
      .catch((err) => {
        if (active && err.name !== "RenderingCancelledException")
          setError("Unable to render this page. Please open the PDF directly.");
      });
    return () => {
      active = false;
      renderTask?.cancel();
    };
  }, [document, page, width]);
  return (
    <div className="pdf-reader" ref={host}>
      {error ? (
        <p role="alert">{error}</p>
      ) : (
        <>
          {document ? (
            <>
              <div className="pdf-controls">
                <button
                  type="button"
                  className="button-outline"
                  disabled={page === 1}
                  onClick={() => setPage((n) => n - 1)}
                >
                  Previous
                </button>
                <span aria-live="polite">
                  Page {page} of {document.numPages}
                </span>
                <button
                  type="button"
                  className="button-outline"
                  disabled={page === document.numPages}
                  onClick={() => setPage((n) => n + 1)}
                >
                  Next
                </button>
              </div>
              <div className="pdf-page">
                <canvas
                  ref={canvas}
                  role="img"
                  aria-label={title + ", page " + page}
                />
              </div>
              <p className="form-note">
                For searchable text and full-screen reading, use Open PDF.
              </p>
            </>
          ) : (
            <p role="status">Loading report...</p>
          )}
        </>
      )}
    </div>
  );
}
