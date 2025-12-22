"use client";

import { usePathname } from "next/navigation";
import HorizontalScroll from "./HorixontalScroll";
import CompanyGroupNav from "./CompanyGroupNav";
import TopicGroupNav from "./TopicGroupNav";

export function GroupNav() {
  const pathname = usePathname();
  const showCompanyNav = pathname?.startsWith("/companies/");
  return (
    <div>
      {showCompanyNav && (
        <div className="mt-20 relative px-12 max-sm:px-2 ">
          <div className="absolute right-0 top-0 h-full w-16  from-background pointer-events-none z-10" />
          <HorizontalScroll>
            <div className="w-max pb-2">
              <CompanyGroupNav />
            </div>
          </HorizontalScroll>
        </div>
      )}
    </div>
  );
}

export function GroupNavTopic() {
  const pathname = usePathname();
  const showCompanyNav = pathname?.startsWith("/topic/");
  return (
    <div>
      {showCompanyNav && (
        <div className="mt-20 relative px-12 max-sm:px-2 ">
          <div className="absolute right-0 top-0 h-full w-16  from-background pointer-events-none z-10" />
          <HorizontalScroll>
            <div className="w-max pb-2">
              <TopicGroupNav />
            </div>
          </HorizontalScroll>
        </div>
      )}
    </div>
  );
}
