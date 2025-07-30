import CreateNewNotes from "@/components/CreateNewNote";


interface NotesPageProps {
  params: {
    tripid: string;
  };
}

export default function Notes({ params }: NotesPageProps) {
  return <CreateNewNotes tripId={params.tripid} />;
}
