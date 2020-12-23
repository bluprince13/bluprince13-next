export default ({ id }) => (
    <div className="youtube-wrapper">
        <iframe
            title={id}
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${id}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
        />
    </div>
)
