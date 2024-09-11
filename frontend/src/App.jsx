import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navigation from "./components/Navigation";
import SpotList from "./components/AllSpots";
import SpotDetails from "./components/SpotDetails";
import CreateSpot from "./components/CreateSpot/CreateSpot";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { restoreUser } from "./store/session";

function Layout() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(restoreUser()).then(() => {
      setLoading(true)
    });
  }, [dispatch])

  return (
    <>
      <Navigation loading={loading} />
      {loading && <Outlet />}
    </>
    );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <SpotList />
      },
      {
        path: '/spots/:spotId',
        element: <SpotDetails />
      },
      {
        path: '/spots/new',
        element: <CreateSpot />
      }
    ]
  }
])

function App() {
  return <RouterProvider router={router} />;
}

export default App;
