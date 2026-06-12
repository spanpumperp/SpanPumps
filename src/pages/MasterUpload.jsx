import { useState } from "react";
import * as XLSX from "xlsx";
import { supabase } from "../supabase";

function MasterUpload() {
  const [excelData, setExcelData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFile = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = (evt) => {
      const data = evt.target.result;

      const workbook = XLSX.read(data, {
        type: "binary",
      });

      const sheet =
        workbook.Sheets[workbook.SheetNames[0]];

      const rows = XLSX.utils.sheet_to_json(sheet);

      console.log(rows);

      setExcelData(rows);
    };

    reader.readAsBinaryString(file);
  };

  const downloadSample = () => {
    const csvContent =
      "application_no,water_source,vendor_selection_date,application_status\n" +
      "MK14068248,Borewell,2024-03-16,Inspection Completed\n" +
      "MK14068249,Well,2024-03-17,Installation Pending";

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "Master_Upload_Sample.csv";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const uploadData = async () => {
    if (excelData.length === 0) {
      alert("Please select Excel file first");
      return;
    }

    setLoading(true);

    let updated = 0;
    let failed = 0;

    for (const row of excelData) {
      const { error } = await supabase
        .from("applications")
        .update({
          water_source: row.water_source,
          vendor_selection_date:
            row.vendor_selection_date,
          application_status:
            row.application_status,
        })
        .eq(
          "application_no",
          row.application_no
        );

      if (error) {
        console.log(error);
        failed++;
      } else {
        updated++;
      }
    }

    setLoading(false);

    alert(
      `Upload Completed

Updated Records : ${updated}
Failed Records : ${failed}`
    );
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Master Upload</h1>

      <button onClick={downloadSample}>
        Download Sample CSV
      </button>

      <br />
      <br />

      <input
        type="file"
        accept=".xlsx,.xls,.csv"
        onChange={handleFile}
      />

      <br />
      <br />

      <h3>
        Preview Records : {excelData.length}
      </h3>

      <button
        onClick={uploadData}
        disabled={loading}
      >
        {loading
          ? "Uploading..."
          : "Upload To Database"}
      </button>

      <br />
      <br />

      {excelData.length > 0 && (
        <table
          border="1"
          cellPadding="10"
          style={{
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              <th>Application No</th>
              <th>Water Source</th>
              <th>Vendor Date</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {excelData
              .slice(0, 10)
              .map((row, index) => (
                <tr key={index}>
                  <td>{row.application_no}</td>
                  <td>{row.water_source}</td>
                  <td>
                    {row.vendor_selection_date}
                  </td>
                  <td>
                    {row.application_status}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default MasterUpload;