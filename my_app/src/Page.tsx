import React, { useState } from "react";
import { HomePage } from "./HomePage";
import { BasicPage } from "./BasicPage";
import { DetailPage } from "./DetailPage";
import { ReportPage } from "./ReportPage";

// import { useLocalStorage } from "./useLocalStroage";

import "./App.css";

function Page() {
  const [isHome, setHome] = useState<boolean>(true);
  const [isBasic, setBasic] = useState<boolean>(false);
  const [isDetail, setDetail] = useState<boolean>(false);
  const [isReport, setReport] = useState<boolean>(false);
  const [Report, setReports] = useState<string>("");

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [userA, setA] = useState<boolean>(false);

  // useLocalStorage();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const buttonapi = () => {
    setA((current) => !current);
  };

  function updateSetHome(): void {
    setHome(true);
    setBasic(false);
    setDetail(false);
    setReport(false);
  }

  function updateSetBasic(): void {
    setHome(false);
    setBasic(true);
    setDetail(false);
    setReport(false);
  }

  function updatesetDetail(): void {
    setHome(false);
    setBasic(false);
    setDetail(true);
    setReport(false);
  }

  function updatereport(): void {
    setHome(false);
    setBasic(false);
    setDetail(false);
    setReport(true);
  }

  return (
    <div className="all">
      <div className="top_botton">
        <button className="botton" onClick={updateSetHome}>
          Home
        </button>
        <button className="botton" onClick={updateSetBasic}>
          Basic Question
        </button>
        <button className="botton" onClick={updatesetDetail}>
          Detail Question
        </button>
        <button className="botton" onClick={updatereport}>
          Report
        </button>
      </div>
      <div className="body">
        {isHome && <HomePage></HomePage>}
        <div className="body-page">
          {isBasic && <BasicPage setReports={setReports}></BasicPage>}
          {isDetail && <DetailPage setReports={setReports}></DetailPage>}
          {isReport && <ReportPage Report={Report}></ReportPage>}
        </div>
      </div>
    </div>
  );
}

export default Page;
