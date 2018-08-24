const data = require('./en.1.json');
const teams = [];
const constants = {
  points: {
    win: 3,
    draw: 1,
    lose: 0
  },
  teams: {
    one: 1,
    two: 2
  }
}

function addTeamToTable(match, team) {
  const homeTeam = match.team1;
  const awayTeam = match.team2;
  const isHomeTeam = team === constants.teams.one;
  const homeTeamWon = match.score1 > match.score2;
  const didTeamWin = (homeTeamWon && isHomeTeam) || (!homeTeamWon && !isHomeTeam);
  const didTeamDraw = match.score1 === match.score2;

  teams.push({
    key: isHomeTeam ? homeTeam.key : awayTeam.key,
    name: isHomeTeam ? homeTeam.name : awayTeam.name,
    code: isHomeTeam ? homeTeam.code : awayTeam.code,
    wins: homeTeamWon && isHomeTeam ? 1 : 0,
    draws: match.score1 === match.score2 ? 1 : 0,
    loses: !homeTeamWon && isHomeTeam ? 1 : 0,
    goals_for: isHomeTeam ? match.score1 : match.score2,
    goals_against: isHomeTeam ? match.score2 : match.score1,
    goal_difference: isHomeTeam ?
      match.score1 - match.score2 :
        match.score2 - match.score1,
    points: !didTeamDraw ?
      didTeamWin ?
        constants.points.win :
          constants.points.lose :
            constants.points.draw
  });
}

function indexOfTeamToUpdate(teamKey) {
  return teams.findIndex(
    team => team.key === teamKey
  );
}

function updateTeamInTable(match, teamKey, team) {
  const teamToUpdate = teams[indexOfTeamToUpdate(teamKey)];
  const isHomeTeam = team === constants.teams.one;
  const homeTeamWon = match.score1 > match.score2;
  const didTeamWin = (homeTeamWon && isHomeTeam) || (!homeTeamWon && !isHomeTeam);
  const didTeamLose = (!homeTeamWon && isHomeTeam) || (homeTeamWon && !isHomeTeam);
  const didTeamDraw = match.score1 === match.score2;

  teamToUpdate.wins = didTeamWin ?
    teamToUpdate.wins + 1 :
      teamToUpdate.wins;
  teamToUpdate.draws = didTeamDraw ?
    teamToUpdate.draws + 1 :
      teamToUpdate.draws;
  teamToUpdate.loses = didTeamLose ?
    teamToUpdate.loses + 1 :
      teamToUpdate.loses;
  teamToUpdate.goals_for = isHomeTeam ?
    teamToUpdate.goals_for + match.score1 :
      teamToUpdate.goals_for + match.score2;
  teamToUpdate.goals_against = isHomeTeam ?
    teamToUpdate.goals_against + match.score2 :
      teamToUpdate.goals_against + match.score1;
  teamToUpdate.goal_difference = isHomeTeam ?
    teamToUpdate.goal_difference + (match.score1 - match.score2) :
      teamToUpdate.goal_difference + (match.score2 - match.score1);
  teamToUpdate.points = !didTeamDraw ?
    didTeamWin ?
      teamToUpdate.points + constants.points.win :
        teamToUpdate.points :
          teamToUpdate.points + constants.points.draw;
}

function haveEqualPoints(a, b) {
  return a.points === b.points;
}

function haveEqualGoalDifference(a, b) {
  return a.goal_difference === b.goal_difference;
}

function sortOnGoalsFor(a, b) {
  return b.goals_for - a.goals_for;
}

function sortOnGoalDifference(a, b) {
  return b.goal_difference - a.goal_difference;
}

function sortOnPoints(a, b) {
  return b.points - a.points;
}

function sortTableIntoOrder() {
  teams.sort((a, b) => {
    const sort = haveEqualPoints(a, b) ?
      haveEqualGoalDifference(a, b) ?
        sortOnGoalsFor(a, b) :
          sortOnGoalDifference(a, b) :
            sortOnPoints(a, b);
    return sort;
  });
}

function addRankToTable() {
  teams.map(
    (team, index) => team.rank = index + 1
  );
}

function findTeamByKey(teamKey) {
  return teams.filter(
    team => team.key === teamKey
  ).length === 0;
}

function buildTableFromResults(results) {
  results.rounds.forEach(
    round => round.matches.forEach(
      match => {
        findTeamByKey(match.team1.key) ?
          addTeamToTable(match, constants.teams.one) :
            updateTeamInTable(match, match.team1.key, constants.teams.one);

        findTeamByKey(match.team2.key) ?
          addTeamToTable(match, constants.teams.two) :
            updateTeamInTable(match, match.team2.key, constants.teams.two);
      }
    )
  )

  sortTableIntoOrder();
  addRankToTable();
  return JSON.stringify(teams);
}

const leagueStandings = buildTableFromResults(data);

console.log(leagueStandings); // Used to view output
