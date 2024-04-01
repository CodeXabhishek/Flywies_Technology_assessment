const express = require('express');
const routes = express.Router();
const matchControllers = require('./../controllers/match-controllers');

routes.get('/upcoming_match', matchControllers.upcomingMatches);
routes.get('/live_match', matchControllers.liveMatches);
routes.get('/myteamresult', matchControllers.myTeamResult);
routes.get('/playerdetails', matchControllers.myPlayerDetail);
routes.get('/teamplayers/:id', matchControllers.teamPlayersDetail);
routes.get('/scorecards', matchControllers.getScoreCard);
routes.get('/fixtures', matchControllers.getFixtures);
routes.get('/topplayer', matchControllers.getTopPlayer);
routes.get('/pointtable', matchControllers.getPointTable);
routes.get('/venue/:id', matchControllers.venueDetails);
module.exports = routes;
