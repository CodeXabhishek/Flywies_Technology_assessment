const axios = require('axios');
const catchAsync = require('./../utils/catch-Async');
const AppError = require('./../utils/app-error');

exports.upcomingMatches = catchAsync(async (req, res, next) => {
  //   const options = {
  //     method: 'GET',
  //     url: 'https://allsportsapi2.p.rapidapi.com/api/cricket/team/410009',
  //     headers: {
  //       'X-RapidAPI-Key': '120a6becffmsh490b1440c277ddbp11d959jsn0c00ca4e4a1d',
  //       'X-RapidAPI-Host': 'allsportsapi2.p.rapidapi.com',
  //     },
  //   };
  const options = {
    method: 'GET',
    url: 'https://crickbuzz-official-apis.p.rapidapi.com/matches/upcoming',
    headers: {
      'X-RapidAPI-Key': '120a6becffmsh490b1440c277ddbp11d959jsn0c00ca4e4a1d',
      'X-RapidAPI-Host': 'crickbuzz-official-apis.p.rapidapi.com',
    },
  };

  const response = await axios.request(options);
  const data =
    response.data.typeMatches[1].seriesMatches[0].seriesAdWrapper.matches;
  let upcomingMatch = [];
  for (let i = 0; i < 3; i++) {
    const matchData = {
      match_Id: data[i].matchInfo.matchId,
      series_Id: data[i].matchInfo.seriesId,
      seriesName: data[i].matchInfo.seriesName,
      matchFormat: data[i].matchInfo.matchFormat,
      status: data[i].matchInfo.status,
      team1: data[i].matchInfo.team1,
      team2: data[i].matchInfo.team2,
      venueInfo: data[i].matchInfo.venueInfo,
    };
    upcomingMatch.push(matchData);
  }
  res.status(200).json({
    status: 'status',
    upcomingMatch,
  });
});

exports.liveMatches = catchAsync(async (req, res, next) => {
  const options = {
    method: 'GET',
    url: 'https://crickbuzz-official-apis.p.rapidapi.com/matches/live',
    headers: {
      'X-RapidAPI-Key': '120a6becffmsh490b1440c277ddbp11d959jsn0c00ca4e4a1d',
      'X-RapidAPI-Host': 'crickbuzz-official-apis.p.rapidapi.com',
    },
  };
  const response = await axios.request(options);
  const data = response.data.typeMatches[0];
  const liveMatch = data.seriesMatches[0].seriesAdWrapper.matches[0].matchInfo;
  console.log(liveMatch);

  const matchData = {
    match_Id: liveMatch.matchId,
    series_Id: liveMatch.seriesId,
    series_Name: liveMatch.seriesName,
    match_Format: liveMatch.matchFormat,
    team_1: liveMatch.team1,
    team_2: liveMatch.team2,
    venue_Information: liveMatch.venueInfo,
    match_start_Date: liveMatch.startDate,
    match_end_Date: liveMatch.endDate,
    series_Start_Date: liveMatch.seriesStartDt,
    series_End_Date: liveMatch.seriesEndDt,
  };
  res.status(200).json({
    status: 'status',
    matchData,
  });
});

exports.myTeamResult = catchAsync(async (req, res, next) => {
  const options = {
    method: 'GET',
    url: 'https://crickbuzz-official-apis.p.rapidapi.com/team/2/result',
    headers: {
      'X-RapidAPI-Key': '120a6becffmsh490b1440c277ddbp11d959jsn0c00ca4e4a1d',
      'X-RapidAPI-Host': 'crickbuzz-official-apis.p.rapidapi.com',
    },
  };
  const response = await axios.request(options);
  const data = response.data.teamMatchesData[0].matchDetailsMap.match;
  let resultData = [];
  for (let i = 0; i < 3; i++) {
    const matchData = {
      match_Id: data[i].matchInfo.matchId,
      series_Id: data[i].matchInfo.seriesId,
      seriesName: data[i].matchInfo.seriesName,
      status: data[i].matchInfo.status,
      team1: data[i].matchInfo.team1,
      team2: data[i].matchInfo.team2,
      venueInfo: data[i].matchInfo.venueInfo,
      team1_Score: data[i].matchScore.team1Score.inngs1,
      team2_Score: data[i].matchScore.team2Score.inngs1,
    };
    resultData.push(matchData);
  }
  res.status(200).json({
    status: 'status',
    resultData,
  });
});

exports.myPlayerDetail = catchAsync(async (req, res, next) => {
  const options = {
    method: 'GET',
    url: 'https://crickbuzz-official-apis.p.rapidapi.com/browse/player/9647',
    headers: {
      'X-RapidAPI-Key': '120a6becffmsh490b1440c277ddbp11d959jsn0c00ca4e4a1d',
      'X-RapidAPI-Host': 'crickbuzz-official-apis.p.rapidapi.com',
    },
  };
  const response = await axios.request(options);
  const data = response.data;
  const playerDetail = {
    player_id: data.id,
    name: data.name,
    team: 'Gujarat Titans',
    bat_style: data.bat,
    bowl_style: data.bowl,
    image: data.image,
    ranking: data.rankings,
  };
  res.status(200).json({
    status: 'status',
    playerDetail,
  });
});

exports.teamPlayersDetail = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const options = {
    method: 'GET',
    url: `https://crickbuzz-official-apis.p.rapidapi.com/team/${id}/players`,
    headers: {
      'X-RapidAPI-Key': '120a6becffmsh490b1440c277ddbp11d959jsn0c00ca4e4a1d',
      'X-RapidAPI-Host': 'crickbuzz-official-apis.p.rapidapi.com',
    },
  };
  const response = await axios.request(options);
  const data = response.data;
  res.status(200).json({
    status: 'status',
    data,
  });
});

exports.getScoreCard = catchAsync(async (req, res, next) => {
  const options = {
    method: 'GET',
    url: 'https://cricket-live-data.p.rapidapi.com/match/2432999',
    headers: {
      'X-RapidAPI-Key': '120a6becffmsh490b1440c277ddbp11d959jsn0c00ca4e4a1d',
      'X-RapidAPI-Host': 'cricket-live-data.p.rapidapi.com',
    },
  };
  const response = await axios.request(options);
  const data = response.data.results;
  const scoreCard = {
    match_title: data.fixture.match_title,
    venue: data.fixture.venue,
    start_date: data.fixture.start_date,
    end_date: data.fixture.end_date,
    // status: data.fixture.series.status,
    status: 'Draw',
    scorecard: data.live_details.scorecard,
  };
  res.status(200).json({
    status: 'status',
    scoreCard,
  });
});

exports.getFixtures = catchAsync(async (req, res, next) => {
  const options = {
    method: 'GET',
    url: 'https://cricket-live-data.p.rapidapi.com/fixtures',
    headers: {
      'X-RapidAPI-Key': '120a6becffmsh490b1440c277ddbp11d959jsn0c00ca4e4a1d',
      'X-RapidAPI-Host': 'cricket-live-data.p.rapidapi.com',
    },
  };
  const response = await axios.request(options);
  const data = response.data.results;
  let fixtureData = [];
  for (i = 0; i < data.length; i++) {
    const fixdata = {
      id: data[i].id,
      venue: data[i].venue,
      match_title: data[i].match_title,
      match_subtitle: data[i].match_subtitle,
      home_team: data[i].home,
      away_team: data[i].away,
    };
    fixtureData.push(fixdata);
  }
  res.status(200).json({
    status: 'status',
    fixtureData,
  });
});

exports.getTopPlayer = catchAsync(async (req, res, next) => {
  const options = {
    method: 'GET',
    url: 'https://allsportsapi2.p.rapidapi.com/api/cricket/tournament/11165/season/41321/top-players',
    headers: {
      'X-RapidAPI-Key': '120a6becffmsh490b1440c277ddbp11d959jsn0c00ca4e4a1d',
      'X-RapidAPI-Host': 'allsportsapi2.p.rapidapi.com',
    },
  };
  const response = await axios.request(options);
  const data = response.data.topPlayers.runsScored;
  let topPlayer = [];
  for (i = 0; i < data.length; i++) {
    const playerData = {
      name: data[i].player.name,
      team: data[i].team.name,
      battingInnings: data[i].statistics.battingInnings,
      battingMatches: data[i].statistics.battingMatches,
      runsScored: data[i].statistics.runsScored,
      avgRunsPerGame: data[i].statistics.avgRunsPerGame,
      battingAverage: data[i].statistics.battingAverage,
      total_matches: data[i].statistics.matches,
    };
    topPlayer.push(playerData);
  }
  res.status(200).json({
    status: 'status',
    topPlayer,
  });
});

exports.getPointTable = catchAsync(async (req, res, next) => {
  const options = {
    method: 'GET',
    url: 'https://live-line.p.rapidapi.com/pointTable/206',
    headers: {
      'X-RapidAPI-Key': '120a6becffmsh490b1440c277ddbp11d959jsn0c00ca4e4a1d',
      'X-RapidAPI-Host': 'live-line.p.rapidapi.com',
    },
  };

  const response = await axios.request(options);
  const data = response.data.data.A;
  let pointTable = [];
  for (i = 0; i < data.length; i++) {
    const dataPoint = {
      team: data[i].teams,
      matche: data[i].P,
      win: data[i].W,
      lose: data[i].L,
      draw: data[i].NR,
      point: data[i].Pts,
    };
    pointTable.push(dataPoint);
  }
  res.status(200).json({
    status: 'status',
    pointTable,
  });
});

exports.venueDetails = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const options = {
    method: 'GET',
    url: `https://crickbuzz-official-apis.p.rapidapi.com/venue/${id}`,
    headers: {
      'X-RapidAPI-Key': '120a6becffmsh490b1440c277ddbp11d959jsn0c00ca4e4a1d',
      'X-RapidAPI-Host': 'crickbuzz-official-apis.p.rapidapi.com',
    },
  };
  const response = await axios.request(options);
  const data = response.data;
  const venueData = {
    name: data.ground,
    city: data.city,
    country: data.country,
    timezone: data.timezone,
    capacity: data.capacity,
    hometeam: data.hometeam,
  };
  res.status(200).json({
    status: 'status',
    venueData,
  });
});
