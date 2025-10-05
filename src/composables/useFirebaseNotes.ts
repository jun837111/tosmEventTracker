import { ref, Ref } from 'vue';
import { db } from '../firebase';
import { ref as dbRef, onValue, set, remove, update } from 'firebase/database';
import type { Note } from '../types/Note';

// Firebase note - only sync essential event tracking data
interface FirebaseNote {
  id: string;
  mapLevel: number;
  noteText: string;
  channel: number;
  state: string;
  onTime: number | null;
  stageTime: number | null;
  respawnTime: number | null;
  maxStages: number;
}

export function useFirebaseNotes() {
  const notes = ref<FirebaseNote[]>([]);
  const isFirebaseEnabled = ref(false);

  // Check if Firebase is configured
  const checkFirebaseConfig = () => {
    const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
    const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID;
    return apiKey && projectId &&
           apiKey !== 'your_api_key_here' &&
           projectId !== 'your_project_id';
  };

  // Initialize Firebase listener
  const initFirebase = () => {
    if (!checkFirebaseConfig()) {
      console.warn('Firebase not configured, falling back to localStorage');
      isFirebaseEnabled.value = false;
      return;
    }

    isFirebaseEnabled.value = true;
    const notesRef = dbRef(db, 'notes');

    onValue(notesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        notes.value = Object.values(data);
      } else {
        notes.value = [];
      }
    });
  };

  // Convert Note to FirebaseNote (only essential fields)
  const toFirebaseNote = (note: Note): FirebaseNote => ({
    id: note.id,
    mapLevel: note.mapLevel,
    noteText: note.noteText,
    channel: note.channel,
    state: note.state,
    onTime: note.onTime ?? null,
    stageTime: note.stageTime ?? null,
    respawnTime: note.respawnTime ?? null,
    maxStages: note.maxStages,
  });

  // Save a single note to Firebase
  const saveNoteToFirebase = async (note: Note) => {
    if (!isFirebaseEnabled.value) return;

    const noteRef = dbRef(db, `notes/${note.id}`);
    await set(noteRef, toFirebaseNote(note));
  };

  // Save all notes to Firebase (use sparingly - only for bulk operations)
  const saveNotesToFirebase = async (notesData: Note[]) => {
    if (!isFirebaseEnabled.value) return;

    const notesRef = dbRef(db, 'notes');
    const notesObj = notesData.reduce((acc, note) => {
      acc[note.id] = toFirebaseNote(note);
      return acc;
    }, {} as Record<string, FirebaseNote>);

    await set(notesRef, notesObj);
  };

  // Update a single note
  const updateNoteInFirebase = async (noteId: string, updates: Partial<Note>) => {
    if (!isFirebaseEnabled.value) return;

    const noteRef = dbRef(db, `notes/${noteId}`);
    await update(noteRef, updates);
  };

  // Delete a note
  const deleteNoteFromFirebase = async (noteId: string) => {
    if (!isFirebaseEnabled.value) return;

    const noteRef = dbRef(db, `notes/${noteId}`);
    await remove(noteRef);
  };

  // Clear all notes
  const clearAllNotesInFirebase = async () => {
    if (!isFirebaseEnabled.value) return;

    const notesRef = dbRef(db, 'notes');
    await remove(notesRef);
  };

  return {
    notes,
    isFirebaseEnabled,
    initFirebase,
    saveNoteToFirebase,
    saveNotesToFirebase,
    updateNoteInFirebase,
    deleteNoteFromFirebase,
    clearAllNotesInFirebase,
  };
}
