const mockData = require('./mock');

function sortTableOrder(league) {
  // use slice() to copy the array and not just make a reference
  // var byPoints = league.slice(0);
  //   byPoints.sort(function(a,b) {
  //   return a.points - b.points;
  // });

  // var byGoalDifference = byPoints.slice(0);
  //   byGoalDifference.sort(function(a,b) {
  //   return a.goal_difference - b.goal_difference;
  // });

  // console.log(byGoalDifference);
}

function buildTableFromResults(results) {
  const teams = {};

  results.rounds.forEach(
    round => round.matches.forEach(
      match => {
        let team1 = teams[match.team1.key];
        if (!team1) {
          team1 = {
            key: match.team1.key,
            name: match.team1.name,
            code: match.team1.code,
            wins: match.score1 > match.score2 ?  1 : 0,
            draws: match.score1 === match.score2 ? 1 : 0,
            loses: match.score1 < match.score2 ? 1 : 0,
            goals_for: match.score1,
            goals_against: match.score2,
            goal_difference: match.score1 - match.score2,
            points: match.score1 === match.score2 ? 1 : match.score1 > match.score2 ? 3 : 0
          };
          teams[match.team1.key] = team1;
        } else {
          team1.wins = match.score1 > match.score2 ? team1.wins + 1 : team1.wins;
          team1.draws = match.score1 === match.score2 ? team1.draws + 1 : team1.draws;
          team1.loses = match.score1 < match.score2 ? team1.loses + 1 : team1.loses;
          team1.goals_for = team1.goals_for + match.score1;
          team1.goals_against = team1.goals_against + match.score2;
          team1.goal_difference = team1.goal_difference + (match.score1 - match.score2);
          team1.points = match.score1 === match.score2 ? team1.points + 1 : match.score1 > match.score2 ? team1.points + 3 : team1.points;
        }

        let team2 = teams[match.team2.key];
        if (!team2) {
          team2 = {
            key: match.team2.key,
            name: match.team2.name,
            code: match.team2.code,
            wins: match.score2 > match.score1 ? 1 : 0,
            draws: match.score2 === match.score1 ? 1 : 0,
            loses: match.score2 < match.score1 ? 1 : 0,
            goals_for: match.score2,
            goals_against: match.score1,
            goal_difference: match.score2 - match.score1,
            points: match.score1 === match.score2 ? 1 : match.score2 > match.score1 ? 3 : 0
          }
          teams[match.team2.key] = team2;
        } else {
          team2.wins = match.score2 > match.score1 ? team2.wins + 1 : team2.wins;
          team2.draws = match.score2 === match.score1 ? team2.draws + 1 : team2.draws;
          team2.loses = match.score2 < match.score1 ? team2.loses + 1 : team2.loses;
          team2.goals_for = team2.goals_for + match.score2;
          team2.goals_against = team2.goals_against + match.score1;
          team2.goal_difference = team2.goal_difference + (match.score2 - match.score1);
          team2.points = match.score2 === match.score1 ? team2.points + 1 : match.score2 > match.score1 ? team2.points + 3 : team2.points;
        }
      }
    )
  )
  console.log(teams);
  return sortTableOrder(teams);
}

const results = buildTableFromResults(mockData);
