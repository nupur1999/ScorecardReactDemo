import { useState, useEffect } from "react";

const useFetching = (url) => {
  const [data, setData] = useState(null);
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      fetch(url)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          for (let i = 0; i < data.length; i++) {
            let possibleScore = 0,
              score = 0;
            for (let j = 0; j < data[i].children.length; j++) {
              possibleScore += parseFloat(data[i].children[j].Possible);
              console.log(possibleScore);
              score += parseFloat(data[i].children[j].score);
              console.log(score);
              data[i].children[j].score_percent =
                (100 * parseFloat(data[i].children[j].score)) /
                parseFloat(data[i].children[j].Possible);
            }
            data[i].Possible = possibleScore;
            data[i].score = score;
            data[i].score_percent = (100 * data[i].score) / data[i].Possible;
          }
          setLoaded(true);
          setData(data);
          console.log(data);
        });
    }, 1000);
  }, [url]);

  return { isLoaded, data };
};

export default useFetching;
