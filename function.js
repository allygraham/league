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
  let unorderedTable = {};

  results.rounds.map(
    round => round.matches.map(
      match => {
        unorderedTable.key = match.team1.key;
        unorderedTable.name = match.team1.name;
        unorderedTable.code = match.team1.code;
        unorderedTable.wins = match.score1 > match.score2 ?  1 : 0;
        unorderedTable.draws = match.score1 === match.score2 ? 1 : 0;
        unorderedTable.loses = match.score1 < match.score2 ? 1 : 0;
        unorderedTable.goals_for = match.score1;
        unorderedTable.goals_against = match.score2;
        unorderedTable.goal_difference = match.score1 - match.score2;
        unorderedTable.points = match.score1 === match.score2 ? 1 : match.score1 > match.score2 ? 3 : 0;

        unorderedTable.key = match.team2.key;
        unorderedTable.name = match.team2.name;
        unorderedTable.code = match.team2.code;
        unorderedTable.wins = match.score2 > match.score1 ?  unorderedTable.wins + 1 : unorderedTable.wins;
        unorderedTable.draws = match.score2 === match.score1 ? 1 : 0;
        unorderedTable.loses = match.score2 < match.score1 ? 1 : 0;
        unorderedTable.goals_for = match.score2;
        unorderedTable.goals_against = match.score1;
        unorderedTable.goal_difference = match.score2 - match.score1;
        unorderedTable.points = match.score1 === match.score2 ? 1 : match.score2 > match.score1 ? 3 : 0
        console.log(unorderedTable);
      }
    )
  )

  return sortTableOrder(unorderedTable);
}

buildTableFromResults(mockData);
