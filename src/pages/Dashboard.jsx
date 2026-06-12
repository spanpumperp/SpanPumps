import { Link } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard">

      {/* Header */}
      <div className="header">

        <div className="logo-section">
          <img
            src="/span-logo.png"
            alt="Span Pumps"
            className="logo"
          />
        </div>

        <div className="top-menu">

          <Link
            to="/applications"
            className="menu-btn"
          >
            Applications
          </Link>

          <div className="dropdown">
            <button className="menu-btn">
              Record Update ▼
            </button>

            <div className="dropdown-content">

              <Link to="/new-record-upload">
                New Record Update
              </Link>

              <Link to="/master-upload">
                Master Upload
              </Link>

              <Link to="/field-upload">
                Field Upload
              </Link>

              <Link to="/coordinator-upload">
                Coordinator Upload
              </Link>

              <Link to="/logistics-upload">
                Logistics Upload
              </Link>

              <Link to="/installation-upload">
                Installation Upload
              </Link>

              <Link to="/icr-upload">
                ICR Upload
              </Link>

              <Link to="/lineman-upload">
                Lineman Upload
              </Link>

              <Link to="/inspection-upload">
                Inspection Upload
              </Link>

              <Link to="/insurance-upload">
                Insurance Upload
              </Link>

            </div>
          </div>

        </div>

        <div className="title-section">
          <h1>MAHARASHTRA</h1>
          <h2>Project</h2>
        </div>

      </div>

      {/* Body */}
      <div className="dashboard-body">

        {/* Sidebar */}
        <div className="sidebar">

          <h3>Coordinator</h3>

          <h3>Logistics</h3>

          <h3>Project Manager</h3>

          <h3>Site Engineer</h3>

        </div>

      
        </div>

      </div>

  );
}

export default Dashboard;