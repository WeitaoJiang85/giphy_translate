const GifCard = ({ title, url }) => {
  return (
    <div className="card">
      <h3>{title} </h3>
      <img src={url} alt={title} />
    </div>
  )
}
export default GifCard
