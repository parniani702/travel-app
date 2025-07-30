"use client";

import { User } from "@/lib/generated/prisma";
import React, { useState, useTransition } from "react";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import editUSer from "@/lib/actions/editUser";
import { UploadButton } from "@/utils/uploadthing";


function ProfileClient({ user }: { user: User }) {
  const [isPending, startTransition] = useTransition();
  const [imageUrl, setImageUrl] = useState<string>("")
  return (
    <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
      <Card className="min-w-[300px] flex items-center justify-center flex-col">
        <CardContent>
          <div className="flex flex-col items-center gap-3">
            <Image
              className="rounded-full object-cover aspect-square w-32 h-32"
              src={user.image || "/profile.jpg"}
              alt={user.name || ""}
              width={100}
              height={100}
            />
            <h1>نام و نام خانوادگی : {user.name}</h1>
            <div className="">
              ایمیل : <span className="text-sky-600">{user.email}</span>
            </div>
          </div>
          <span className="border-1 flex w-full my-2"></span>
          <div className="my-2">
            <form
              action={(formData: FormData) => {
                startTransition(() => {
                  editUSer(formData, user, imageUrl);
                });
              }}
              className="flex flex-col items-center justify-center gap-2"
            >
              <div className="my-2 text-sm">
                <label>نام و نام خانوادگی :</label>
                <Input placeholder={user.name || ''} type="text" name="name" />
              </div>
              <div className="my-2 text-sm">
                <label>ایمیل :</label>
                <Input placeholder={user.email || ''} className="w-full" type="email" name="email" />
              </div>
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
                appearance={{
                  button({ ready, isUploading }) {
                    return {
                      fontSize: "1rem",
                      width: '240px',
                      color: "black",
                      background: "black",
                      ...(ready && { color: "#ecfdf5" }),
                      ...(isUploading && { color: "black" }),
                    };
                  },
                }}
              />
              <Button className="w-full cursor-pointer" type="submit">
                {isPending ? "در حال ویرایش ..." : "ویرایش"}
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default ProfileClient;
