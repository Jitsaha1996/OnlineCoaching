import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Login";
import { About } from "./About";
import { Home } from "./Home";
import Header from "./Header";
import { StudentDetails } from "./StudentDetails";
import { TeacherDetails } from "./TeacherDetails";
import Register from "./Register";
import AdminPanel from "./admin/AdminPanel";
// import { Header } from "./Header";

interface RouteConfig {
    path: string;
    element: React.ReactElement;
  }
  
  const routes: RouteConfig[] = [
    { path: '/', element: <Home/> },
    { path: '/about', element: <About /> },
    { path: '/student-details', element: <StudentDetails/> },
    { path: '/register', element: <Register /> },
    { path: '/admin-panel', element: <AdminPanel /> },
    {path: '/login', element: <Login />},
    {path: '/teacher-details', element: <TeacherDetails/> },
    
    
    
    // { path: '/contact', element: <Contact /> },
    // { path: '/register', element: <Register /> },
    // { path: '/user-details', element: <UserDetails /> },
    
    // { path: '/admin-panel', element: <AdminPanel /> },
    // { path: '/seat-details', element: <BusLayout /> },
  ];
  
  const AppRouter: React.FC = () => {
  
    return (
      <BrowserRouter>
        <Header />
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </BrowserRouter>
    );
  };
  
  export default AppRouter;