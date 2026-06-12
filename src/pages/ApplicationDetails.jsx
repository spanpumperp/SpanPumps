import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../supabase";

function ApplicationDetails() {
  const { id } = useParams();

  const [application, setApplication] = useState(null);

  useEffect(() => {
    getApplication();
  }, []);

  async function getApplication() {
    const { data, error } = await supabase
      .from("applications")
      .select("*")
      .eq("id", id)
      .single();

    console.log("ID =", id);
    console.log("DATA =", data);
    console.log("ERROR =", error);

    if (!error) {
      setApplication(data);
    }
  }

  if (!application) {
    return <h2>Loading...</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Application Details</h1>

      <hr />

      <h3>Application No: {application.application_no}</h3>
      <h3>Beneficiary: {application.beneficiary_name}</h3>
      <h3>Mobile: {application.mobile}</h3>
      <h3>District: {application.district}</h3>
      <h3>Taluka: {application.taluka}</h3>
      <h3>Village: {application.village}</h3>
      <h3>Status: {application.application_status}</h3>

      <hr />

      <h2>Coordinator Details</h2>
      <p>Contractor: {application.assigned_contractor}</p>
      <p>Area Manager: {application.area_manager}</p>

      <h2>Logistics Details</h2>
      <p>Dispatch Date: {application.actual_dispatch_date}</p>
      <p>DC No: {application.dc_no}</p>
      <p>Vehicle No: {application.vehicle_no}</p>
    </div>
  );
}

export default ApplicationDetails;