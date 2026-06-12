import { useState } from "react";
import * as XLSX from "xlsx";
import { supabase } from "../supabase";

function ICRUpload() {
  const [excelData, setExcelData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFile = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();

    reader.onload = (evt) => {
      const workbook = XLSX.read(evt.target.result, {
        type: "binary",
      });

      const sheet =
        workbook.Sheets[workbook.SheetNames[0]];

      setExcelData(
        XLSX.utils.sheet_to_json(sheet)
      );
    };

    reader.readAsBinaryString(file);
  };

  const downloadSample = () => {
    const csv =
      "application_no,icr_upload_date\n" +
      "MK14068248,2025-06-20";

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const link =
      document.createElement("a");

    link.href =
      URL.createObjectURL(blob);

    link.download =
      "ICR_Upload_Sample.csv";

    link.click();
  };

  const uploadData = async () => {
    let updated = 0;

    for (const row of excelData) {
      await supabase
        .from("applications")
        .update({
          icr_upload_date:
            row.icr_upload_date,
        })
        .eq(
          "application_no",
          row.application_no
        );

      updated++;
    }

    alert(`Updated : ${updated}`);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>ICR Upload</h1>

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

export default ICRUpload;