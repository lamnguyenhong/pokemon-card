import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import routes from "@app/routes";

function App() {
  return (
    <Router>
      <Routes>
        {routes.map((route, idx) => {
          const Component = route.component;
          return <Route path={route.path} element={<Component />} key={idx} />;
        })}
      </Routes>
    </Router>
  );
}

export default App;
