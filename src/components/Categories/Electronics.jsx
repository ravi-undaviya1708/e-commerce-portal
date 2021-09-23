import React, { useEffect } from "react";
import axiosApi from "../../axiosLib";

export const Electronics = () => {
  useEffect(() => {
    let response;
    async function fetchElectronicsData() {
      response = await axiosApi(
        "get","Category/1"
      );
    }

    fetchElectronicsData();
  }, []);
  return (
    <>
      <h1>Electronics</h1>
    </>
  );
};
