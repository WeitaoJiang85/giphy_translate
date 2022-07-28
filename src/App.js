import { useState, useEffect } from 'react'
import GifCard from './GifCard'
import './App.css'
const GIPHY_API_KEY = process.env.REACT_APP_GIPHY_API_KEY

function App() {
  const [result, setResult] = useState([])
  const [message, setMessage] = useState('Waiting your request...')
  const [text, setText] = useState('')
  const [rating, setRating] = useState('g')
  const [offset, setOffset] = useState(Number)

  const handleInput = (e) => {
    if (e.target.value !== { text }) setText(e.target.value)
    setResult([])
  }

  const handleRating = (e) => {
    setRating(e.target.value)
  }

  const translate = () => {
    const giphyURL = `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${text}&limit=20&offset=${offset}&rating=${rating}`

    fetch(giphyURL)
      .then((response) => {
        return response.json()
      })
      .then((jsonData) => {
        if (jsonData.meta.status === 200) {
          const searchResult = jsonData.data.map((gif) => ({
            id: gif.id,
            title: gif.title,
            url: gif.images.fixed_width.url,
          }))
          console.log('Raw result:', jsonData)
          console.log('Search result:', searchResult)
          setOffset(20 + offset)
          setResult(result.concat(searchResult))
          console.log('Offset:', offset)
          setMessage(jsonData.meta.msg)
        } else {
          setMessage(jsonData.meta.msg)
        }
      })
      .catch((error) => alert(error))
  }

  useEffect(() => {
    if (text.length > 0) {
      translate()
    }
  }, [rating])

  window.onscroll = function () {
    const scrollHeight = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight
    )

    const scrollTop =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop

    const clientHeight =
      window.innerHeight ||
      Math.min(
        document.documentElement.clientHeight,
        document.body.clientHeight
      )
    if (clientHeight + scrollTop >= scrollHeight) {
      translate()
      console.log('loading more')
    }
  }

  return (
    <div className="container">
      <h1>GIPHY TRANSLATE</h1>
      <div className="search-bar">
        <input
          className="item"
          type="text"
          onChange={handleInput}
          placeholder="Enter your keywords"
        />
        <label className="item" htmlFor="rating">
          Choose Rating :&nbsp;&nbsp;&nbsp;&nbsp;
          <select className="item" onChange={handleRating}>
            <option value="">All</option>
            <option value="g">G</option>
            <option value="pg">PG</option>
            <option value="pg-13">PG-13</option>
            <option value="r">R</option>
          </select>
        </label>
        <button className="item" onClick={translate}>
          Clik to Translate
        </button>
      </div>
      <h2>Search Result:{message}</h2>
      <div className="case">
        {result.map((list) => (
          <GifCard key={`${list.id}`} title={list.title} url={list.url} />
        ))}
      </div>
    </div>
  )
}

export default App
