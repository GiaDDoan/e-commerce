import React, { useEffect, useState } from "react";
import { fetchProductPageSample } from "../../../api-helpers/product-page-helper";
import { useHistory } from "react-router";
import "./Samples.css";
import Loading from "../../loading/Loading";

const Samples = ({ size, sampleKey, sample }) => {
  const [status, setStatus] = useState("loading");
  const [samples, setSamples] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  const history = useHistory();
  const handleProduct = (productId) => {
    history.push(`/product/${productId}`);
  };

  useEffect(() => {
    setStatus("loading");

    const fetchSample = async () => {
      const sampleRes = await fetchProductPageSample(size, sampleKey, sample);
      if (sampleRes.status === 200) {
        setSamples(sampleRes.samples);
        setStatus("idle");
      } else {
        setStatus("error");
      }
    };
    fetchSample();

    // return () => {
    //   cleanup
    // }
  }, []);

  if (status === "loading") {
    return <Loading />;
  }

  if (status === "idle") {
    return (
      <div className="product-sample-container">
        {samples.map((sample) => {
          const { _id, name, imageSrc, rating, price, companyId } = sample;

          let checkedName = name;

          if (name.length > 40) {
            let splitting = name.split(" ");
            let totalLength = 0;

            for (var x = 0; x < splitting.length; x++) {
              if (totalLength >= 35) {
                checkedName = splitting.slice(0, x).join(" ").concat("...");
                break;
              }
              totalLength += splitting[x].length;
            }
          }

          return (
            <div
              key={_id}
              className="product-sample-wrapper"
              onClick={() => handleProduct(_id)}
            >
              <div className="product-sample-img-wrapper">
                <img
                  src={imageSrc}
                  alt="product-sample-img"
                  className="product-sample-img"
                />
              </div>
              <div className="product-sample-info">
                <div className="product-sample-name">{checkedName}</div>
                <div>{rating}⭐</div>
                <div>{price}$</div>
              </div>
            </div>
          );
        })}
      </div>
    );
  } else {
    return <div>No product found</div>;
  }
};

export default Samples;
