import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Applications from "./pages/Applications";
import ApplicationDetails from "./pages/ApplicationDetails";

import NewRecordUpload from "./pages/NewRecordUpload";
import MasterUpload from "./pages/MasterUpload";
import FieldUpload from "./pages/FieldUpload";
import CoordinatorUpload from "./pages/CoordinatorUpload";
import LogisticsUpload from "./pages/LogisticsUpload";
import InstallationUpload from "./pages/InstallationUpload";
import ICRUpload from "./pages/ICRUpload";
import LinemanUpload from "./pages/LinemanUpload";
import InspectionUpload from "./pages/InspectionUpload";
import InsuranceUpload from "./pages/InsuranceUpload";

function App() {
return ( <BrowserRouter> <Routes>

```
    <Route path="/" element={<Dashboard />} />

    <Route path="/applications" element={<Applications />} />
    <Route path="/application/:id" element={<ApplicationDetails />} />

    <Route path="/new-record-upload" element={<NewRecordUpload />} />
    <Route path="/master-upload" element={<MasterUpload />} />
    <Route path="/field-upload" element={<FieldUpload />} />
    <Route path="/coordinator-upload" element={<CoordinatorUpload />} />
    <Route path="/logistics-upload" element={<LogisticsUpload />} />
    <Route path="/installation-upload" element={<InstallationUpload />} />
    <Route path="/icr-upload" element={<ICRUpload />} />
    <Route path="/lineman-upload" element={<LinemanUpload />} />
    <Route path="/inspection-upload" element={<InspectionUpload />} />
    <Route path="/insurance-upload" element={<InsuranceUpload />} />

  </Routes>
</BrowserRouter>

);
}

export default App;
