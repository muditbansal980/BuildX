import { createBrowserRouter,RouterProvider } from "react-router-dom"
import SignInPage from "./components/auth/sign-in-page"
import SignUpPage from "./components/auth/sign-up-page"
import Role from "./components/role"
import Admin from "./components/admin/admin"
import Events from "./components/events/events"
import YourEvents from "./components/your-events"
export default function App() {
  const router = createBrowserRouter([
    {    
      path:"/role",
      element:<Role/>
    },
    {
      path: "/admin",
      element: <Admin />
    },
    {
      path: "/*",
      element: <SignInPage />
    },
    {
      path: "/sign-up/*",
      element: <SignUpPage />
    },
    {
      path: "/your-events",
      element: <YourEvents />
    },
    {
      path: "/events",
      element: <Events />
    }
  ])
  return (
    <RouterProvider router={router}>
    </RouterProvider>
  )
}