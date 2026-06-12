import { useState } from "react";
import * as XLSX from "xlsx";
import { supabase } from "../supabase";

function NewRecordUpload() {
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

      setExcelData(rows);
    };

    reader.readAsBinaryString(file);
  };

  const downloadSample = () => {
    const csvContent =
      "application_no,beneficiary_name,mobile,caste_category,water_source,district,taluka,village,division_name,pump_capacity,vendor_selection_date,application_status\n" +
      "MK14070001,Ram Patil,9876543210,OPEN,Borewell,Pune,Haveli,Wagholi,Pune Division,5 HP,2024-03-16,Pending\n" +
      "MK14070002,Shyam Jadhav,9876543211,OBC,Well,Nashik,Sinnar,Malegaon,Nashik Division,7.5 HP,2024-03-17,Approved";

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "New_Record_Sample.csv";
    link.click();
  };

  const uploadData = async () => {
    if (excelData.length === 0) {
      alert("Please Select Excel File");
      return;
    }

    setLoading(true);

    let inserted = 0;
    let duplicate = 0;

    const duplicateList = [];

    for (const row of excelData) {
      const { data: existing } = await supabase
        .from("applications")
        .select("application_no")
        .eq("application_no", row.application_no)
        .maybeSingle();

      if (existing) {
        duplicate++;
        duplicateList.push(
          row.application_no
        );
        continue;
      }

      const { error } = await supabase
        .from("applications")
        .insert([
          {
            application_no: row.application_no,
            beneficiary_name:
              row.beneficiary_name,
            mobile: row.mobile,
            caste_category:
              row.caste_category,
            water_source:
              row.water_source,
            district: row.district,
            taluka: row.taluka,
            village: row.village,
            division_name:
              row.division_name,
            pump_capacity:
              row.pump_capacity,
            vendor_selection_date:
              row.vendor_selection_date,
            application_status:
              row.application_status,
          },
        ]);

      if (!error) {
        inserted++;
      }
    }

    setLoading(false);

    console.log(
      "Duplicate Records:",
      duplicateList
    );

    alert(
      `Upload Completed

Inserted Records : ${inserted}
Duplicate Records : ${duplicate}`
    );
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>New Record Update</h1>

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
    </div>
  );
}

export default NewRecordUpload;