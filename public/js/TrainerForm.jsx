import { h, render } from 'preact';
import { useState } from 'preact/hooks';

const TrainerForm = ({ initial }) => {
    const [trainer, setTrainer] = useState(initial || { Courses: [] });
    const [status, setStatus] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // This line sends the form data to the backend
        // This does not update anything itself, it just makes the request to update
        const res = await fetch('/api/v1/trainers', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            // Convert the trainer state into a JSON string for sending
            body: JSON.stringify(trainer)
        });

        // This creates a JavaScript object called data that I can use in the frontend
        const data = await res.json();
        setStatus(data.success ? 'Saved!' : data.error);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Contact ID</label>
            <input value={trainer.Contact || ''} onInput={e => setTrainer({ ...trainer, Contact: e.target.value })} />

            <label>Notes</label>
            <textarea value={trainer.Notes || ''} onInput={e => setTrainer({ ...trainer, Notes: e.target.value })} />

            <button type="submit">Save</button>
            {status && <p>{status}</p>}
        </form>
    );
};

const mount = document.getElementById('app');
const initialData = mount.dataset.initial ? JSON.parse(mount.dataset.initial) : {};
render(<TrainerForm initial={initialData} />, mount);

/*

FRONTEND (TrainerForm.js)
    ↓ Sends trainer data
POST /api/v1/trainers
    ↓
BACKEND (new.js)
    - Validates data
    - Saves to the database
    - Returns JSON { success: true }
    ↑
FRONTEND receives the response
    - Reads res.json()
    - Updates UI with setStatus()


 */