import type { Metadata } from "next";
import css from "./CreatePage.module.css";
import NoteForm from "@/components/NoteForm/NoteForm";

export const metadata: Metadata = {
  title: "Create note",
  description: "Creating a new note in NoteHub.",
  openGraph: {
    title: "Create note",
    description: "Createing a new note in NoteHub.",
    url: "/notes/action/create",
    siteName: "NoteHub",
    images: [
      { url: "/notes.jpg", width: 1200, height: 630, alt: "Create note" },
    ],
    type: "website",
  },
};

export default function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}
