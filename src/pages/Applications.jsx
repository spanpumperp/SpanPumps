import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";
import "../App.css";

function Applications() {
  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);
  const [search, setSearch] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchMobile, setSearchMobile] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    getData();
  }, []);

  async function getData(searchText = "") {
    let query = supabase
      .from("applications")
      .select("*");

    if (searchText) {
      query = query.ilike(
        "application_no",
        `%${searchText}%`
      );
    }

    const { data, error } = await query.limit(100);

    if (error) {
      console.log(error);
    } else {
      setApplications(data);
    }
  }

  function viewDetails(app) {
    navigate(`/application/${app.id}`);
  }

  return (
    <div className="main">
      <h1>Applications</h1>

      <h3>Total Records: {applications.length}</h3>

      <input
        type="text"
        placeholder="Search Application No..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          getData(e.target.value);
        }}
        className="search-box"
      />

      <input
        type="text"
        placeholder="Search Beneficiary Name..."
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
        className="search-box"
      />

      <input
        type="text"
        placeholder="Search Mobile No..."
        value={searchMobile}
        onChange={(e) => setSearchMobile(e.target.value)}
        className="search-box"
      />

      <select
        className="search-box"
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
      >
        <option value="">All Status</option>
        <option value="Pending">Pending</option>
        <option value="Approved">Approved</option>
        <option value="Completed">Completed</option>
      </select>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Application No</th>
            <th>Beneficiary</th>
            <th>Mobile</th>
            <th>District</th>
            <th>Vendor Selection Date</th>
            <th>Application Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {applications
            .filter((app) =>
              app.beneficiary_name
                ?.toLowerCase()
                .includes(searchName.toLowerCase())
            )
            .filter((app) =>
              app.mobile
                ?.toString()
                .includes(searchMobile)
            )
            .filter((app) =>
              statusFilter === ""
                ? true
                : app.application_status === statusFilter
            )
            .map((app) => (
              <tr key={app.id}>
                <td>{app.application_no}</td>
                <td>{app.beneficiary_name}</td>
                <td>{app.mobile}</td>
                <td>{app.district}</td>
                <td>{app.vendor_selection_date}</td>
                <td>{app.application_status}</td>

                <td>
                  <button
                    onClick={() => viewDetails(app)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Applications;