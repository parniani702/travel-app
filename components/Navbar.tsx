import Link from "next/link";
import React from "react";
import { Github,  LogOut, MapPin } from "lucide-react";
import { login, logoout } from "@/lib/actions/auth-actions";
import { Session } from "next-auth";
import Image from "next/image";


function Navbar({ session }: { session: Session | null }) {

  return (
    <nav className="bg-white py-4 shadow-md border-b border-gray-200">
      {" "}
      <div className="container mx-auto flex justify-between items-center px-6 lg:px-8">
        <Link href="/" className="flex items-center justify-center">
          <MapPin className="" size={40} color="black" />{" "}
          <span className="text-xl font-bold bg-gradient-to-r from-slate-700 via-sky-500 to-slate-700 bg-clip-text text-transparent">
            برنامه سفر
          </span>
        </Link>

        <div className="flex items-center space-x-4">
          {session ? (
            <>
              <Link
                href={"/trips"}
                className="font-bold hover:text-shadow-lg text-slate-900 hover:text-sky-500 "
              >
                سفر های من
              </Link>
              <Link
                href={`/profile/${session.user?.id}`}
                className="text-slate-900 hover:text-sky-500 "
              >
                <Image className="rounded-full object-cover aspect-square w-10 h-10 hover:shadow-md shadow-sky-700" alt="hello" src={ session.user?.image || '/profile.jpg'} width={40} height={40} />
              </Link>
              <button
              className="bg-red-500 text-white font-bold flex items-center gap-2 px-2 py-2 rounded-md cursor-pointer hover:opacity-70 text-center"
              onClick={logoout}
            >
              خروج
              <LogOut />
            </button>
            </>
          ) : (
            <button
              className="bg-black text-white font-bold flex items-center gap-2 px-2 py-2 rounded-md cursor-pointer hover:opacity-70"
              onClick={login}
            >
              ورود
              <Github />
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
