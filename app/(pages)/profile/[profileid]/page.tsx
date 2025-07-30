import { auth } from "@/auth";
import ProfileClient from "@/components/ProfileClient";
import { prisma } from "@/lib/prisma";

interface ProfilePageProps {
  params: { profileid: string }
}

export default async function Profile({ params }: ProfilePageProps) {
  const { profileid } = await params;

  const session = await auth();

  if (!session) {
    return <h1>وارد حساب کاربریت شو</h1>;
  }

  const user = await prisma.user.findFirst({
    where: { id: profileid }
  });

  if (!user) {
    return <h1>کاربر پیدا نشد</h1>;
  }

  return <ProfileClient user={user} />;
}
