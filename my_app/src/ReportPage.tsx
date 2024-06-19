import React from "react";

interface Reports {
  Report: string;
}

interface Career {
  title: string;
  description: string;
}
export function ReportPage({ Report }: Reports): JSX.Element {
  try {
    if (!Report) alert("Report is empty!!!");
    const reportObject = JSON.parse(Report);

    // Extract careers and descriptions into arrays
    const careers: Career[] = [];

    // Iterate over the keys (e.g., "Job1", "Job2", etc.)
    Object.keys(reportObject).forEach((key: string) => {
      const job = reportObject[key];
      careers.push({
        title: job.title,
        description: job.description,
      });
    });
    return (
      <div className="quiz-page">
        {careers.map((r, index) => (
          <div key={index}>
            <p className="report_title">{r.title}</p>
            <p className="report_name">{r.description}</p>
          </div>
        ))}
      </div>
    );
  } catch (error) {
    console.error(error);
    return <div></div>;
  }
}
