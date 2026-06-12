import { useState } from "react";
import * as XLSX from "xlsx";
import { supabase } from "../supabase";

function InstallationUpload() {
  const [excelData, setExcelData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFile = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = (evt) => {
      const workbook = XLSX.read(
        evt.target.result,
        { type: "binary" }
      );

      const sheet =
        workbook.Sheets[
          workbook.SheetNames[0]
        ];

      const rows =
        XLSX.utils.sheet_to_json(sheet);

      setExcelData(rows);
    };

    reader.readAsBinaryString(file);
  };

  const downloadSample = () => {
    const csv =
      "application_no,installation_date,project_remark\n" +
      "MK14068248,2025-06-20,Installation Completed Successfully";

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const link =
      document.createElement("a");

    link.href =
      URL.createObjectURL(blob);

    link.download =
      "Installation_Upload_Sample.csv";

    link.click();
  };

  const uploadData = async () => {
    setLoading(true);

    let updated = 0;
    let failed = 0;

    for (const row of excelData) {
      const { error } = await supabase
        .from("applications")
        .update({
          installation_date:
            row.installation_date,
          project_remark:
            row.project_remark,
        })
        .eq(
          "application_no",
          row.application_no
        );

      if (error) {
        failed++;
      } else {
        updated++;
      }
    }

    setLoading(false);

    alert(
      `Updated : ${updated}
Failed : ${failed}`
    );
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Installation Upload</h1>

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
          : "Upload"}
      </button>
    </div>
  );
}

export default InstallationUpload;