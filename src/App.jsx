// 外部 node_modules 資源
import { RouterProvider } from "react-router-dom";

// 內部 src 資源
import routes from "./routes";
import Toast from "./components/Toast";
import Loading from "./components/Loading";


function App() {
  
  return (
    <>
      <div className="d-flex flex-column min-vh-100 ">
        <Toast />
        <Loading />
        <RouterProvider router={routes}/>
      </div>
    </>
  );
}

export default App;