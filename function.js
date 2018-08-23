// const data = require('./mock');
const data = require('./en.1.json');

const teams = [];

function addTeamToTable(match, team) {
  teams.push({
    key: team === 1 ? match.team1.key : match.team2.key,
    name: team === 1 ? match.team1.name : match.team2.key,
    code: team === 1 ? match.team1.code : match.team2.code,
    wins: match.score1 > match.score2 && team === 1 ? 1 : 0,
    draws: match.score1 === match.score2 ? 1 : 0,
    loses: match.score1 < match.score2 && team === 1 ? 1 : 0,
    goals_for: team === 1 ? match.score1 : match.score2,
    goals_against: team === 1 ? match.score2 : match.score1,
    goal_difference: team === 1 ? match.score1 - match.score2 : match.score2 - match.score1,
    points: match.score1 !== match.score2 ?
      (match.score1 > match.score2 && team === 1) || (match.score1 < match.score2 && team === 2) ?
        3 :
          0 :
            1
  });
}

function updateTeam(match, teamKey, team) {
  const teamToUpdate = teams.findIndex((team => team.key === teamKey));
  teams[teamToUpdate].wins = (match.score1 > match.score2 && team === 1) || (match.score1 < match.score2 && team === 2) ? teams[teamToUpdate].wins + 1 : teams[teamToUpdate].wins;
  teams[teamToUpdate].draws = match.score1 === match.score2 ? teams[teamToUpdate].draws + 1 : teams[teamToUpdate].draws;
  teams[teamToUpdate].loses = (match.score1 < match.score2 && team === 1) || (match.score1 > match.score2 && team === 2) ? teams[teamToUpdate].loses + 1 : teams[teamToUpdate].loses;
  teams[teamToUpdate].goals_for = team === 1 ? teams[teamToUpdate].goals_for + match.score1 : teams[teamToUpdate].goals_for + match.score2;
  teams[teamToUpdate].goals_against = team === 1 ?
    teams[teamToUpdate].goals_against + match.score2 : teams[teamToUpdate].goals_against + match.score1;
  teams[teamToUpdate].goal_difference = team === 1 ?
    teams[teamToUpdate].goal_difference + (match.score1 - match.score2) : teams[teamToUpdate].goal_difference + (match.score2 - match.score1);
  teams[teamToUpdate].points = match.score1 !== match.score2 ?
    (match.score1 > match.score2 && team === 1) || (match.score1 < match.score2 && team === 2) ?
      teams[teamToUpdate].points + 3 :
        teams[teamToUpdate].points :
          teams[teamToUpdate].points + 1;
}

function sortTable() {
  teams.sort((a, b) => {
    const sort = a.points === b.points ?
      a.goal_difference === b.goal_difference ?
        b.goals_for - a.goals_for :
          b.goal_difference - a.goal_difference :
            b.points - a.points;
    return sort;
  });
}

function addRankToTable() {
  teams.map(
    (team, index) => team.rank = index + 1
  );
}

function buildTableFromResults(results) {
  results.rounds.forEach(
    round => round.matches.forEach(
      match => {
        if (teams.filter(team => (team.key === match.team1.key)).length === 0) {
          addTeamToTable(match, 1);
        } else {
          updateTeam(match, match.team1.key, 1);
        }

        if (teams.filter(team => (team.key === match.team2.key)).length === 0) {
          addTeamToTable(match, 2);
        } else {
          updateTeam(match, match.team2.key, 2);
        }
      }
    )
  )

  sortTable();
  addRankToTable();
  const finalTable = JSON.stringify(Object.assign({}, teams));
  console.log(finalTable);
  return finalTable;
}

buildTableFromResults(data);
