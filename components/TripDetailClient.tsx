"use client";

import { Notes, Trip } from "@/lib/generated/prisma";
import { Calendar, Notebook, NotepadText } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import { Card, CardContent } from "./ui/card";
import DeleteButtonTrip from "./DeleteButtonTrip";

interface TripDetailClientProps {
  trip: Trip;
  notes: Notes[];
}

export default function TripDetailClient({ trip, notes }: TripDetailClientProps) {
  const tripId = trip.id
  return (
    <div className="container mx-auto px-4 py-8 space-y-8 ">
      {trip.imageUrl && (
        <div className="w-full h-72 md:h-96 overflow-hidden rounded-md shadow-lg relative">
          <Image
            src={trip.imageUrl}
            alt={trip.title}
            className="object-cover "
            fill
            priority
          />
        </div>
      )}
      <div className="bg-white p-6 shadow rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center">
        <div className="">
          <h1 className="text-4xl font-extrabold text-gray-900">
            {trip.title}
          </h1>
          <div className="flex items-center text-gray-500 mt-4">
            <span
              dir=""
              className="text-lg mx-2 flex flex-row-reverse items-center gap-2"
            >
            </span>
          </div>
        </div>
        <div className="mt-4 md:mt-0 flex gap-1">
          <Link href={`/trips/${trip.id}/notes`}>
            <Button className="cursor-pointer">
              اضافه کردن یادداشت
              <NotepadText className="mr-2 h-5 w-5 cursor-pointer" />
            </Button>
          </Link>
          <DeleteButtonTrip tripId={tripId}  />
        </div>

      </div>
      <div className="bg-white p-6 shadow rounded-lg">
        <Tabs dir="rtl">
          <TabsList defaultValue="overview" className="mb-6">
            <TabsTrigger value="overview">اطلاعات</TabsTrigger>
            <TabsTrigger value="notes">یادداشت ها</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="">
                <h2 className="text-2xl font-semibold mb-4">اطلاعات سفر</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Calendar className="h-6 w-6 mr-3 text-gray-500 " />
                    <div className="">
                      <p className="font-medium text-gray-700 mb-2 mx-2">تاریخ ها</p>
                      <p className="text-sm text-gray-500">
                        <span>رفت : </span>
                        {trip.startDate}
                        <span className="mx-4">|</span>
                        <span>برگشت : </span>
                        {trip.endDate}
                        <br />
                      </p>
                    </div>
                  </div>
                    <div className="text-sm text-gray-700">
                      {trip.description}
                    </div>
                </div>
              </div>
            </div>
          </TabsContent>
          {/*  */}
          <TabsContent value="notes">
            یادداشت ها
            <Card>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2">
                  {notes.map((note) => (
                    <div className={`${note.color} text-white rounded-xl max-w-[300px] flex items-center justify-between px-6 py-2`} key={note.id}>
                      <Notebook />
                      <span className="mx-2">{note.noteTitle}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
