const { default: axios } = require("axios");

const url =
  "https://raw.githubusercontent.com/openfootball/world-cup.json/master/2018/worldcup.json";

const getWorldCup2018Results = () => {
  let matchDays = [];
  let matches = [];
  let displayArray = [];
  axios.get(url).then((response) => {
    response.data.rounds.forEach((matchday) => {
      matchDays.push(matchday);
    });

    matchDays.forEach((allDayMatches) => {
      allDayMatches.matches.forEach((match) => {
        matches.push(match);
      });
    });

    matches.forEach((match) => {
      displayArray.push(
        `${match.date}\n${match.team1.name} : ${match.score1}\n${match.team2.name} : ${match.score2}\n----------\n`
      );
    });

    console.log(displayArray.join(""));
  });
};

const getSerialScorers = () => {
  let matchDays = [];
  let matches = [];
  let scorers = {};
  let displayArray = [];
  axios.get(url).then((response) => {
    response.data.rounds.forEach((matchday) => {
      matchDays.push(matchday);
    });

    matchDays.forEach((allDayMatches) => {
      allDayMatches.matches.forEach((match) => {
        matches.push(match);
      });
    });

    matches.forEach((item) => {
      // console.log(item.goals1);
      if (item.goals1 !== undefined) {
        item.goals1.forEach((scorer) => {
          let lastname = "";

          if (scorer.name.split(" ").length > 1) {
            lastname = scorer.name.split(" ")[1];
          } else {
            lastname = scorer.name;
          }

          if (scorers[lastname] === undefined) {
            scorers[lastname] = 1;
          } else {
            scorers[lastname] = scorers[lastname] + 1;
          }
        });
      }

      if (item.goals2 !== undefined) {
        item.goals2.forEach((scorer) => {
          let lastname = "";

          if (scorer.name.split(" ").length > 1) {
            lastname = scorer.name.split(" ")[1];
          } else {
            lastname = scorer.name;
          }

          if (scorers[lastname] === undefined) {
            scorers[lastname] = 1;
          } else {
            scorers[lastname] = scorers[lastname] + 1;
          }
        });
      }
    });

    let bestScorers = [];
    for (let key in scorers) {
      bestScorers.push([key, scorers[key]]);
    }
    bestScorers.sort((a, b) => {
      return b[1] - a[1];
    });

    let finalStr = "";
    for (let i = 0; i < 10; i++) {
      finalStr += bestScorers[i][0] + " : " + bestScorers[i][1] + " buts\n";
    }

    console.log(finalStr);
  });
};

getWorldCup2018Results();
getSerialScorers();
