import { useState } from "react";
import * as XLSX from "xlsx";
import { supabase } from "../supabase";

function LogisticsUpload() {
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
      "application_no,actual_dispatch_date,dc_no,vehicle_no,lr_no,driver_no,deliver_date,logistic_remark,status\n" +
      "MK14068248,2025-06-15,DC001,MH12AB1234,LR001,9876543210,2025-06-18,Material Dispatched,Delivered";

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const link =
      document.createElement("a");

    link.href =
      URL.createObjectURL(blob);

    link.download =
      "Logistics_Upload_Sample.csv";

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
          actual_dispatch_date:
            row.actual_dispatch_date,
          dc_no: row.dc_no,
          vehicle_no: row.vehicle_no,
          lr_no: row.lr_no,
          driver_no: row.driver_no,
          deliver_date:
            row.deliver_date,
          logistic_remark:
            row.logistic_remark,
          status: row.status,
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
      <h1>Logistics Upload</h1>

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

export default LogisticsUpload;