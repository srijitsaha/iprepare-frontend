import * as React from "react"

// import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { LayoutDashboardIcon, ChartBarIcon, Settings2Icon, SearchIcon, CommandIcon, BookAlert, BookmarkIcon, SwordsIcon } from "lucide-react"
import { getUserInfoAPI } from "@/API/user.API"
import { Navigate } from "react-router-dom"


// interface userDetailsType {
//   name: string;
//   email: string;
//   avatar?: string;
//   isNotSignedIn?: boolean;
// }

let userDetails: any = {}

try {
  userDetails = await getUserInfoAPI()
} catch (error) {
  ;
}

const data = {
  user: {
    name: userDetails.firstName + " " + userDetails.lastName, 
    email: userDetails.email, 
    avatar: userDetails.avatar || "/avatars/shadcn.jpg",
    isNotSignedIn: userDetails.isNotSignedIn
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: ( <LayoutDashboardIcon /> ),
    },
    {
      title: "Analytics",
      url: "/dashboard/analytics",
      icon: ( <ChartBarIcon /> ),
    },
    {
      title: "Mistakes Notebook",
      url: "/dashboard/mistakes-notebook",
      icon: ( <BookAlert /> ),
    },
    {
      title: "All Exams",
      url: "/dashboard/all-exams",
      icon: ( <BookAlert /> ),
    },
    {
      title: "Bookmarked Questions",
      url: "/dashboard/bookmarked-questions",
      icon: ( <BookmarkIcon /> ),
    },
    {
      title: "Challenges",
      url: "/dashboard/challenges",
      icon: ( <SwordsIcon /> ),
    },
  ], 
  navSecondary: [
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: ( <Settings2Icon /> ),
    },
    {
      title: "Search",
      url: "",
      icon: ( <SearchIcon /> ),
    },
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  if(data.user.isNotSignedIn) {
    return <Navigate to="/sign-in" replace />
  }


  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:p-1.5!">
              <a href="#">
                <CommandIcon className="size-5!" />
                <span className="text-base font-semibold">iPrepare</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavDocuments items={data.documents} /> */}
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
