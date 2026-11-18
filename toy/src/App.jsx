import { useEffect, useState } from 'react'
import ToyCard from './components/ToyCard.jsx'
import ToyForm from './components/ToyForm.jsx'
import './App.css'

const TOYS_URL = import.meta.env.VITE_TOYS_API_URL || 'http://localhost:3001/toys'

async function readResponse(response) {
  const text = await response.text()
  return text ? JSON.parse(text) : null
}

function App() {
  const [toys, setToys] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [savingToy, setSavingToy] = useState(false)
  const [busyToyIds, setBusyToyIds] = useState(() => new Set())

  useEffect(() => {
    const controller = new AbortController()

    async function loadToys() {
      try {
        const response = await fetch(TOYS_URL, { signal: controller.signal })
        if (!response.ok) {
          throw new Error(`Could not load toys (${response.status}).`)
        }

        const data = await response.json()
        if (!Array.isArray(data)) {
          throw new Error('The toys API did not return a list.')
        }
        setToys(data)
      } catch (requestError) {
        if (requestError.name !== 'AbortError') {
          setError(requestError.message || 'Could not load toys.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    loadToys()
    return () => controller.abort()
  }, [])

  async function handleAddToy(toyDetails) {
    setError('')
    setSavingToy(true)

    try {
      const response = await fetch(TOYS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...toyDetails, likes: 0 }),
      })
      if (!response.ok) {
        throw new Error(`Could not add toy (${response.status}).`)
      }

      const createdToy = await readResponse(response)
      if (!createdToy || createdToy.id == null) {
        throw new Error('The toys API did not return the created toy.')
      }
      setToys((currentToys) => [...currentToys, createdToy])
    } catch (requestError) {
      setError(requestError.message || 'Could not add toy.')
      throw requestError
    } finally {
      setSavingToy(false)
    }
  }

  async function handleLikeToy(toy) {
    setError('')
    setBusyToyIds((currentIds) => new Set(currentIds).add(toy.id))

    try {
      const likes = (Number(toy.likes) || 0) + 1
      const response = await fetch(`${TOYS_URL}/${encodeURIComponent(toy.id)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ likes }),
      })
      if (!response.ok) {
        throw new Error(`Could not like toy (${response.status}).`)
      }

      const updatedToy = await readResponse(response)
      setToys((currentToys) =>
        currentToys.map((currentToy) =>
          currentToy.id === toy.id
            ? { ...currentToy, ...updatedToy, likes: updatedToy?.likes ?? likes }
            : currentToy,
        ),
      )
    } catch (requestError) {
      setError(requestError.message || 'Could not like toy.')
    } finally {
      setBusyToyIds((currentIds) => {
        const nextIds = new Set(currentIds)
        nextIds.delete(toy.id)
        return nextIds
      })
    }
  }

  async function handleDonateToy(toy) {
    setError('')
    setBusyToyIds((currentIds) => new Set(currentIds).add(toy.id))

    try {
      const response = await fetch(`${TOYS_URL}/${encodeURIComponent(toy.id)}`, {
        method: 'DELETE',
      })
      if (!response.ok) {
        throw new Error(`Could not donate toy (${response.status}).`)
      }

      setToys((currentToys) => currentToys.filter((currentToy) => currentToy.id !== toy.id))
    } catch (requestError) {
      setError(requestError.message || 'Could not donate toy.')
    } finally {
      setBusyToyIds((currentIds) => {
        const nextIds = new Set(currentIds)
        nextIds.delete(toy.id)
        return nextIds
      })
    }
  }

  return (
    <main className="toy-app">
      <header className="page-header">
        <p className="eyebrow">A little joy goes a long way</p>
        <h1>Toy Tales</h1>
        <p className="intro">Share a favorite, give it some love, or pass it along.</p>
      </header>

      <ToyForm onAddToy={handleAddToy} disabled={loading || savingToy} />

      {error && (
        <p className="error-message" role="alert">
          {error}
        </p>
      )}

      <section className="toy-shelf" aria-labelledby="shelf-heading">
        <div className="shelf-heading">
          <div>
            <p className="eyebrow">The collection</p>
            <h2 id="shelf-heading">Toys to love</h2>
          </div>
          {!loading && <span className="toy-count">{toys.length} toys</span>}
        </div>

        {loading ? (
          <p className="status-message" role="status">Loading toys…</p>
        ) : toys.length === 0 ? (
          <p className="status-message">No toys yet. Add one to start the collection!</p>
        ) : (
          <div className="toy-grid">
            {toys.map((toy) => (
              <ToyCard
                key={toy.id}
                toy={toy}
                disabled={busyToyIds.has(toy.id)}
                onLike={() => handleLikeToy(toy)}
                onDonate={() => handleDonateToy(toy)}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

export default App
