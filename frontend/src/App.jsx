import FrontPagesRoutes from "./routes/FrontPages-Routes.jsx";
import ClubRoutes from "./routes/Club-Routes.jsx";
import StudentRoutes from "./routes/Student-Routes.jsx";
import { BrowserRouter} from "react-router-dom";

function App() {

    return (
        <BrowserRouter>
            <FrontPagesRoutes/>
            <ClubRoutes/>
            <StudentRoutes/>
        </BrowserRouter>
    );
}

export default App;
