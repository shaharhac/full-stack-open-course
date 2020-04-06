import React from "react";

import Statistic from "./Statistic";

const Statistics = ({ good, neutral, bad }) => {
  const totalFeedbacks = good + neutral + bad;

  if (totalFeedbacks === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    );
  }

  const scores = {
    good: 1,
    neutral: 0,
    bad: -1
  };

  const goodScore = good * scores["good"];
  const neutralScore = neutral * scores["neutral"];
  const badScore = bad * scores["bad"];
  const average = (goodScore + neutralScore + badScore) / totalFeedbacks;

  const positivePercentege = (goodScore / totalFeedbacks) * 100;

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <Statistic text="good" value={good} />
          </tr>
          <tr>
            <Statistic text="netural" value={neutral} />
          </tr>
          <tr>
            <Statistic text="bad" value={bad} />
          </tr>
          <tr>
            <Statistic text="sum" value={totalFeedbacks} />
          </tr>
          <tr>
            <Statistic text="average" value={average} />
          </tr>
          <tr>
            <Statistic text="positive" value={`${positivePercentege} %`} />
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Statistics;
