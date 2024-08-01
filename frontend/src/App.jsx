import { BrowserRouter,Route,Routes } from "react-router-dom";
import Layout from "./Shared/Layout";
import Dashboard from "./Dashboard/Dashboard";
import ReactReviews from "./React,reviews/reactReviews";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Layout /> }>
          <Route index element={ <Dashboard /> } />
          <Route path="reactreviews" element={ <ReactReviews /> } />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
