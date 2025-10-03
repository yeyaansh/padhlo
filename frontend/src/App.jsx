import "./App.css";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router";
import HomePageLayout from "./components/layouts/HomePageLayout/HomePageLayout";
import UserPageLayout from "./components/layouts/UserPageLayout/UserPageLayout";
import ProblemPageLayout from "./components/layouts/ProblemPageLayout/ProblemPageLayout";
import ProblemQuestionPageLayout from "./components/layouts/ProblemQuestionPageLayout/ProblemQuestionPageLayout";
import OsmosisPageLayout from "./components/layouts/OsmosisPageLayout/OsmosisPageLayout";
import HomePage from "./pages/HomePage";
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

function App() {
  
  const { isLoading, isAuthenticated } = useSelector((state) => state.auth);
  const location = useLocation();
  const dispatch = useDispatch();

  console.log("inside app.jsx" , location.pathname , " isAuthen: ",isAuthenticated );

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) return <LoadingGeneral />;

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePageLayout></HomePageLayout>}>
          <Route index element={<HomePage />}></Route>
        </Route>
        <Route path="/auth" element={<AuthPageLayout></AuthPageLayout>}>
          <Route index element={<Navigate to="register" replace />}></Route>
          <Route path="register" element={<RegisterPage />}></Route>
          <Route path="login" element={<LoginPage />}></Route>
        </Route>

        <Route element={<ProtectedRoutes />}>
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
      </Routes>
    </>
  );
}

export default App;
