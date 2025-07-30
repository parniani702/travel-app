"use client";

import { createTrip } from "@/lib/actions/create-trip";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import DatePicker from "react-multi-date-picker";

import { cn } from "@/lib/utils";
import { useState, useTransition } from "react";
import { UploadButton } from "@/utils/uploadthing";
import Image from "next/image";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

export default function NewTrip() {
  const [isPending, startTransition] = useTransition();
  const [iamgeUrl, setImageUrl] = useState<string | null>();

  return (
    <div className="max-w-lg mx-auto mt-10">
      <Card>
        <CardHeader className="font-bold text-green-500">سفر جدید</CardHeader>
        <CardContent>
          <form
            className="space-y-6"
            action={(formData: FormData) => {
              if (iamgeUrl) {
                formData.append("imageUrl", iamgeUrl);
              }
              startTransition(() => {
                createTrip(formData);
              });
            }}
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {" "}
                موضوع
              </label>
              <input
                type="text"
                name="title"
                placeholder="سفر به تهران ..."
                className={cn(
                  "w-full border border-gray-300 px-3 py-2",
                  "rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                )}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                توضیحات
              </label>
              <textarea
                name="description"
                placeholder="توضیحات سفر ..."
                className={cn(
                  "w-full border border-gray-300 px-3 py-2",
                  "rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                )}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  تاریخ شروع سفر
                </label>
                <DatePicker
                  required
                  calendar={persian}
                  locale={persian_fa}
                  name="startDate"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {" "}
                  تاریخ پایان سفر
                </label>
                <DatePicker
                  required
                  calendar={persian}
                  locale={persian_fa}
                  name="endDate"
                />
              </div>
            </div>
            <div>
              {iamgeUrl && (
                <Image
                  src={iamgeUrl}
                  alt="Trip Preview"
                  className="w-full mb-4 rounded-md max-h-48 object-cover"
                  width={300}
                  height={100}
                />
              )}
              <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  if (res && res[0].ufsUrl) {
                    setImageUrl(res[0].ufsUrl);
                  }
                }}
                onUploadError={(error: Error) => {
                  console.error("Upload error: ", error);
                }}
                content={{
                  button({ isUploading }) {
                    return isUploading ? "در حال آپلود..." : "آپلود تصویر";
                  },
                }}
              />
            </div>
            <Button type="submit" disabled={isPending} className="w-full">
              {isPending ? "در حال ساخت ..." : "ساخت"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
