"use client";

import React, { useState, useTransition } from "react";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import addNote from "@/lib/actions/addNotes";

function CreateNewNotes({ tripId }: { tripId: string }) {
  const [isPending, startTransation] = useTransition();
  const [color, setColor] = useState<string>("")
  console.log(color)
  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white p-8 shadow-lg rounded-lg">
          <h1 className="text-3xl font-bold text-center mb-6">
            افزودن یادداشت
          </h1>
          <form
            action={(formData: FormData) =>
              startTransation(() => {
                addNote(formData, tripId);
              })
            }
            className="space-y-6"
          >
            <div className="flex flex-col items-center">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                یادداشت
              </label>
              <input
                name="note"
                required
                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition delay-100"
              />
              {/*  */}
              <input type="hidden" name="color" value={color} />
              <Select onValueChange={(color) => setColor(color)}>
                <SelectTrigger className="w-full my-2">
                  <SelectValue placeholder="رنگ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem className="transition focus:bg-sky-400" value="bg-sky-300">آبی</SelectItem>
                  <SelectItem className="transition focus:bg-red-400" value="bg-red-300">قرمز</SelectItem>
                  <SelectItem className="transition focus:bg-green-400" value="bg-green-300">سبز</SelectItem>
                  <SelectItem className="transition focus:bg-purple-400" value="bg-purple-300">بنفش</SelectItem>
                  <SelectItem className="transition focus:bg-yellow-400" value="bg-yellow-300">زرد</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full cursor-pointer" type="submit">
              {isPending ? "اضافه شدن ... " : "افزودن یادداشت"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateNewNotes;
