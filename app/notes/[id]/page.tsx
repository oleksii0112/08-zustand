import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import NoteDetails from "./NoteDetails.client"
import { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const { id } = await params;
  const note = await fetchNoteById(id);
  const title = `Note: ${note.title}`
  const description = note.content.slice(0, 30)
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `/notes/${id}`,
      siteName: "NoteHub",
      images: [
        {
          url: "/notes.jpg",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: "article",
    },
  };
}

export default async function NoteDetailsPage({ params }: Props) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetails />
    </HydrationBoundary>
  );
}
