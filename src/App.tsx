import ExerciseImage from './components/ExerciseImage'
import { CATALOG, EQUIPMENT_LABELS, GROUP_LABELS, difficultyLabel } from './data/catalog'

// Step 2 placeholder: a catalog preview to check images and texts. Real screens come in step 3.
export default function App() {
  return (
    <main className="catalog-preview">
      <h1>Katalog cviků ({CATALOG.length})</h1>
      <p className="muted">Dočasný náhled ke kontrole obrázků a textů.</p>
      {CATALOG.map((e) => (
        <section key={e.id} className="preview-card">
          <div className="preview-images">
            <ExerciseImage src={e.images[0]} label="Začátek pohybu" />
            <ExerciseImage src={e.images[1]} label="Konec pohybu" />
          </div>
          <h2>
            {e.id} · {e.name}
          </h2>
          <p className="muted">
            {GROUP_LABELS[e.group]} · {e.reps} · pauza {e.rest} ·{' '}
            {e.eq.map((q) => EQUIPMENT_LABELS[q]).join(', ')} · {difficultyLabel(e.difficulty)} ({e.difficulty})
          </p>
          <ol>
            {e.how.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          <p>
            <strong>Častá chyba:</strong> {e.mistake}
          </p>
        </section>
      ))}
    </main>
  )
}
