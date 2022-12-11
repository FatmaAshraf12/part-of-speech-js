import axios from "axios";
import {useEffect, useState} from "react";

const useAPI = ({url, method, body = null}) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = () => {
      axios[method](url, JSON.parse(body))
        .then((res) => setResponse(res.data))
        .catch((err) => setError(err))
        .finally(() => setLoading(false));
    };
    fetchData();
  }, [url]);

  return {response, error, loading};
};

export default useAPI;
