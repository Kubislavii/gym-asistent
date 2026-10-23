import { useState } from 'react'
import { imageUrl } from '../data/catalog'

interface Props {
  src: string | undefined
  label: string
}

// Shows a grey placeholder with a caption when the image is missing or fails to load.
export default function ExerciseImage({ src, label }: Props) {
  const [failed, setFailed] = useState(false)

  if (!src || failed) {
    return (
      <div className="exercise-image exercise-image--placeholder" role="img" aria-label={label}>
        {label}
      </div>
    )
  }
  return (
    <img
      className="exercise-image"
      src={imageUrl(src)}
      alt={label}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  )
}
