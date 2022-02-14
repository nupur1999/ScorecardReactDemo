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
          let totalPossible = 0,
            totalScore = 0;

          for (let i = 0; i < data.length; i++) {
            let possibleScore = 0,
              score = 0;
            for (let j = 0; j < data[i].children.length; j++) {
              possibleScore += parseFloat(data[i].children[j].Possible);
              score += parseFloat(data[i].children[j].score);
              data[i].children[j].score_percent =
                (100 * parseFloat(data[i].children[j].score)) /
                parseFloat(data[i].children[j].Possible);
            }
            data[i].Possible = possibleScore;
            data[i].score = score;
            data[i].score_percent = (100 * data[i].score) / data[i].Possible;

            totalPossible += parseFloat(data[i].Possible);
            totalScore += parseFloat(data[i].score);
          }
          data.push({
            Page: "Total",
            Possible: totalPossible,
            score: totalScore,
            score_percent: (100 * totalScore) / totalPossible,
          });
          setLoaded(true);
          setData(data);
        });
    }, 1000);
  }, [url]);

  return { isLoaded, data };
};

export default useFetching;
