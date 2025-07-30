"use client"

import { useTransition } from "react"
import { Button } from "./ui/button"
import deleteTrip from "@/lib/actions/delete-trip"

function DeleteButtonTrip({ tripId }: { tripId: string }) {
  const [isPending, startTransition] = useTransition()

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    startTransition(async () => {
      await deleteTrip(tripId)

    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <Button variant="destructive" className="cursor-pointer" type="submit">
        {isPending ? "در حال حذف .." : "حذف"}
      </Button>
    </form>
  )
}

export default DeleteButtonTrip
