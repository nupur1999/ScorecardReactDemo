import { useState, useEffect } from "react";

const useFetching = (url) => {
  const [data, setData] = useState(null);
  const [isLoaded, setLoaded] = useState(false);
  const [possibleScoreData , setPossibleScoreData]=useState(0);
  const[scoreData , setScoreData]=useState(0);
  const[scorePercent , setScorePercent]=useState(0);

  useEffect(() => {
    setTimeout(() => {
      fetch(url)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          let totalPossible = 0,
            totalScore = 0,
            score_percent=0;

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
          score_percent = (100*totalScore)/totalPossible;
          // data.push({
          //   Page: "Total",
          //   Possible: totalPossible,
          //   score: totalScore,
          //   score_percent: (100 * totalScore) / totalPossible,
          // });
          setLoaded(true);
          setData(data);
          setPossibleScoreData(totalPossible);
          setScoreData(totalScore)
          setScorePercent(score_percent)
        });
    }, 1000);
  }, [url]);

  return { isLoaded, data , possibleScoreData ,scoreData , scorePercent};
};

export default useFetching;
