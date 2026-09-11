export default function PhotoCollage({ photos, caption }) {
  return (
    <figure className="photo-collage">
      <div className="photo-collage-grid">
        {photos.map((photo, index) => (
          <a
            key={photo.src + index}
            href={photo.src}
            target="_blank"
            rel="noreferrer"
            aria-label={"Open photograph: " + photo.alt}
          >
            <img src={photo.src} alt={photo.alt} loading="lazy" />
          </a>
        ))}
      </div>
      <figcaption>{caption} Select a photograph to view it in full.</figcaption>
    </figure>
  );
}
