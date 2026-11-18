import { useState } from 'react'

function ToyForm({ onAddToy, disabled }) {
  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    const toy = { name: name.trim(), image: image.trim() }
    if (!toy.name || !toy.image) return

    setSubmitting(true)
    try {
      await onAddToy(toy)
      setName('')
      setImage('')
    } catch {
      // The parent displays the request error; keep the form values for retry.
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form className="toy-form" onSubmit={handleSubmit}>
      <div className="form-copy">
        <p className="eyebrow">Add to the shelf</p>
        <h2>Got a toy to share?</h2>
      </div>
      <label>
        Toy name
        <input
          type="text"
          name="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="e.g. Captain Cuddles"
          required
        />
      </label>
      <label>
        Image URL
        <input
          type="url"
          name="image"
          value={image}
          onChange={(event) => setImage(event.target.value)}
          placeholder="https://example.com/toy.jpg"
          required
        />
      </label>
      <button className="add-button" type="submit" disabled={disabled || submitting}>
        {submitting ? 'Adding…' : 'Add toy'}
      </button>
    </form>
  )
}

export default ToyForm
