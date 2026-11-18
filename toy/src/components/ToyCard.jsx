function ToyCard({ toy, disabled, onLike, onDonate }) {
  return (
    <article className="toy-card">
      <div className="toy-image-wrap">
        <img className="toy-image" src={toy.image} alt={toy.name} />
      </div>
      <div className="toy-info">
        <h3>{toy.name}</h3>
        <div className="toy-actions">
          <button
            type="button"
            className="like-button"
            onClick={onLike}
            disabled={disabled}
            aria-label={`Like ${toy.name}. ${Number(toy.likes) || 0} likes`}
          >
            <span aria-hidden="true">♥</span> {Number(toy.likes) || 0}
            <span className="sr-only"> likes</span>
          </button>
          <button
            type="button"
            className="donate-button"
            onClick={onDonate}
            disabled={disabled}
          >
            Donate toy
          </button>
        </div>
      </div>
    </article>
  )
}

export default ToyCard
