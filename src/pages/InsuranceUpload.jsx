import { useState } from "react";
import * as XLSX from "xlsx";
import { supabase } from "../supabase";

function InsuranceUpload() {
  const [excelData, setExcelData] = useState([]);

  const handleFile = (e) => {
    const file = e.target.files[0];

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

      setExcelData(
        XLSX.utils.sheet_to_json(sheet)
      );
    };

    reader.readAsBinaryString(file);
  };

  const downloadSample = () => {
    const csv =
      "application_no,insurance_policy_no,insurance_start_date,insurance_end_date\n" +
      "MK14068248,INS12345,2025-06-01,2026-05-31";

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const link =
      document.createElement("a");

    link.href =
      URL.createObjectURL(blob);

    link.download =
      "Insurance_Upload_Sample.csv";

    link.click();
  };

  const uploadData = async () => {
    for (const row of excelData) {
      await supabase
        .from("applications")
        .update({
          insurance_policy_no:
            row.insurance_policy_no,
          insurance_start_date:
            row.insurance_start_date,
          insurance_end_date:
            row.insurance_end_date,
        })
        .eq(
          "application_no",
          row.application_no
        );
    }

    alert("Upload Completed");
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Insurance Upload</h1>

      <button onClick={downloadSample}>
        Download Sample CSV
      </button>

      <br /><br />

      <input
        type="file"
        accept=".xlsx,.xls,.csv"
        onChange={handleFile}
      />

      <h3>
        Records : {excelData.length}
      </h3>

      <button onClick={uploadData}>
        Upload
      </button>
    </div>
  );
}

export default InsuranceUpload;