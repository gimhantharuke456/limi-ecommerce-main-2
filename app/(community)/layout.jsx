import RIghsidebar from "@/components/community/shared/RIghsidebar";
import LeftSidebar from "@/components/community/shared/LeftSidebar";
import React from "react";
import Topbar from "@/components/community/shared/Topbar";

export default function Layout({ children }) {
  return (
    <div>
      <html lang="en">
        <body>
          <Topbar />
          <main>
            <LeftSidebar />
            <section className="flex min-h-screen flex-1 flex-col items-center bg-dark-1 px-6 pb-10 pt-28 max-md:pb-32 sm:px-10">
              <div className="w-full max-w-4xl">{children}</div>
            </section>
            <RIghsidebar />
          </main>
        </body>
      </html>
    </div>
  );
}
