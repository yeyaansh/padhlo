import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axiosClient from "../../axiosClient";
const ProblemPageById = () => {
  const [fetchedProblem, setFetchedProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [apiError, setAPIError] = useState(null);

  const { id } = useParams();
  useEffect(() => {
    async function problemById() {
      const response = await axiosClient(`/problem/id/${id}`);
      console.log(response.data);

      setLoading(false);

      if (response.data?.success == false) setAPIError(response.data.message);

      setFetchedProblem(response.data);
    }
    problemById();
  }, [id]);

  return (
    <div>
      <div>ProblemPageById</div>
      <div>id is {id}</div>
      <div>_doc is {fetchedProblem?._doc?.title}</div>
    </div>
  );
};

export default ProblemPageById;
