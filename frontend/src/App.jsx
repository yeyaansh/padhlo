import "./App.css";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  ScrollRestoration,
} from "react-router";
import HomePageLayout from "./components/layouts/HomePageLayout/HomePageLayout";
import UserPageLayout from "./components/layouts/UserPageLayout/UserPageLayout";
import ProblemPageLayout from "./components/layouts/ProblemPageLayout/ProblemPageLayout";
import ProblemQuestionPageLayout from "./components/layouts/ProblemQuestionPageLayout/ProblemQuestionPageLayout";
import OsmosisPageLayout from "./components/layouts/OsmosisPageLayout/OsmosisPageLayout";
import UserPage from "./pages/UserPage";
import ProblemPageAll from "./pages/ProblemPage";
import ProblemQuestionPage from "./pages/ProblemQuestionPage";
import OsmosisPage from "./pages/OsmosisPage";
import AuthPageLayout from "./components/layouts/AuthPageLayout/AuthPageLayout";
import RegisterPage from "./pages/AuthPage/RegisterPage";
import LoginPage from "./pages/AuthPage/LoginPage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./redux/authSlice";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import ProblemPageById from "./pages/ProblemPage/ProblemPageById.jsx";
import ProblemPageSolved from "./pages/ProblemPage/ProblemPageSolved.jsx";
import ProblemPageAttemptedQuestion from "./pages/ProblemPage/ProblemPageAttemptedQuestion.jsx";
import LoadingGeneral from "./components/skeleton/loadingGeneral.jsx";
import HomepageLoggedOut from "./pages/HomePage/homePageLoggedOut.jsx";
import HomePageLoggedIn from "./pages/HomePage/homePageLoggedIn.jsx";
import ProfilePageLayout from "./components/layouts/ProfiePageLayout/index.jsx";
import ProfilePage from "./pages/ProfilePage/index.jsx";
import PlaylistPageLayout from "./components/layouts/PlaylistPageLayout/PlaylistPageLayout.jsx";
import PlaylistPageById from "./pages/PlaylistPage/index.jsx";
import AdminAuthorizedRoutes from "./routes/AdminAuthorizedRoutes.jsx";
import AdminAuthLoginPage from "./pages/AdminPage/AdminAuthLoginPage.jsx";
import AdminAuthLayout from "./components/layouts/AdminLayout/AdminAuthLayout/AdminAuthLayout.jsx";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage.jsx";
import AdminDashboard from "./pages/AdminPage/Dashboard/admindashboard.jsx";

function App() {
  const { isLoading, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // console.log(
  //   "inside app.jsx",
  //   location.pathname,
  //   " isAuthen: ",
  //   isAuthenticated
  // );

  useEffect(() => {
    dispatch(checkAuth()).then((data) => {
      console.log(data);
    });
  }, [dispatch]);

  if (isLoading) return <LoadingGeneral />;

  return (
    <>
      {/* <ScrollRestoration
getKey={(location,matches)=>{
  return location.pathname}}
/> */}
      <Routes>
        <Route path="/" element={<HomePageLayout></HomePageLayout>}>
          <Route index element={<HomepageLoggedOut />}></Route>
        </Route>
        <Route
          path="/auth"
          element={
            !isAuthenticated ? (
              <AuthPageLayout></AuthPageLayout>
            ) : (
              <Navigate to={"/dashboard"}></Navigate>
            )
          }
        >
          <Route index element={<Navigate to="register" replace />}></Route>
          <Route path="register" element={<RegisterPage />}></Route>
          <Route path="login" element={<LoginPage />}></Route>
        </Route>

        <Route element={<ProtectedRoutes />}>
          <Route
            path="/profile"
            element={<ProfilePageLayout></ProfilePageLayout>}
          >
            <Route index element={<ProfilePage />}></Route>
            {/* <Route path="edit" element={""}></Route> */}
          </Route>
          <Route path="/playlist" element={<PlaylistPageLayout />}>
            <Route index element={<Navigate to={"id"}></Navigate>}></Route>
            <Route path="id/:playlistId" element={<PlaylistPageById />}></Route>
          </Route>
          <Route path="/dashboard" element={<HomePageLoggedIn />}></Route>
          <Route path="/user" element={<UserPageLayout></UserPageLayout>}>
            <Route index element={<UserPage />}></Route>
          </Route>
          <Route
            path="/problem"
            element={<ProblemPageLayout></ProblemPageLayout>}
          >
            <Route index element={<Navigate to="all"></Navigate>}></Route>
            <Route path="all" element={<ProblemPageAll />}></Route>
            <Route path="id/:id" element={<ProblemPageById />}></Route>
            <Route path="solved" element={<ProblemPageSolved />}></Route>
            <Route
              path="attempted"
              element={<ProblemPageAttemptedQuestion />}
            ></Route>
          </Route>
          <Route
            path="/pid"
            element={<ProblemQuestionPageLayout></ProblemQuestionPageLayout>}
          >
            <Route index element={<ProblemQuestionPage />}></Route>
          </Route>
          <Route
            path="/osmosis"
            element={<OsmosisPageLayout></OsmosisPageLayout>}
          >
            <Route index element={<OsmosisPage />}></Route>
          </Route>
        </Route>

        <Route
          path="/admin/auth"
          element={
            !isAuthenticated ? (
              <AdminAuthLayout></AdminAuthLayout>
            ) : (
              <Navigate to={"/admin/dashboard"}></Navigate>
            )
          }
        >
          <Route index element={<Navigate to="login" replace />}></Route>
          <Route path="login" element={<AdminAuthLoginPage />}></Route>
        </Route>

        <Route element={<ProtectedRoutes />}>
          <Route path="/admin" element={<AdminAuthorizedRoutes />}>
          <Route index element={<Navigate to={"dashboard"} replace/>}></Route>
          <Route path="dashboard" element={<AdminDashboard/>}></Route>
          </Route>
        </Route>
        <Route path="*" element={<NotFoundPage/>}></Route>
      </Routes>
    </>
  );
}

export default App;
