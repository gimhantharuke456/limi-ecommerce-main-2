import Bottombar from "@/components/shared/Bottombar";
import LeftSidebar from "@/components/shared/LeftSidebar";
import RIghsidebar from "@/components/shared/RIghsidebar";
import Topbar from "@/components/shared/Topbar";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
export default async function Layout({ children }) {
  const session = getServerSession(authOptions);
  const user = (await session).user;
  return (
    <div>
      <html lang="en">
        <body>
          <Topbar />
          <main className="flex flex-row">
            <LeftSidebar uid={user.id} />
            <section
              style={{ backgroundColor: "black" }}
              className="flex min-h-screen flex-1 flex-col items-center px-6 pb-10 pt-28 max-md:pb-32 sm:px-10"
            >
              <div className="w-full max-w-4xl">{children}</div>
            </section>
            <RIghsidebar />
          </main>
          <Bottombar />
        </body>
      </html>
    </div>
  );
}
