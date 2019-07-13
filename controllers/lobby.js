// @flow
const express = require('express');

const router = express.Router();

const Lobby = require('../models/lobby');

const LobbyService = async (map) => {
  let status;
  await Lobby.findOne({ name: 'global' }).then((lobby) => {
    if (lobby) {
      status = true;
    } else {
      const arr = [];
      for (let i = 0; i <= 5; i++) {
        arr.push([]);
      }
      console.log('not exisits');
      // if not create new User
      new Lobby({
        name: 'global',
        availableUser: null,
        matchedUsers: null,
        lobby: arr,
      }).save();
      status = false;
    }
  });
  return status;
};

const jsonToMap = jsonStr => new Map(JSON.parse(jsonStr));

router.post('/checkExisits', async (req, res) => {
  const map = jsonToMap(JSON.stringify(req.body));
  const created = await LobbyService(map);
  res.send({ exisits: created });
});

// TO REDEIGN AND IMPLEMENT THIS
const matching = async () => {
  // let range;
  // let userMatched = false;
  // let user = await getRandomUserService();
  // let availableArr = await getCurrentLevel(user.level);
  // range += 0.3;
  // let i = 0;
  // while (userMatched != true && i < availableArr.length) {
  //   if (
  //     (user.id != availableArr[i].id &&
  //       availableArr[i].level < user.level + range) ||
  //     availableArr[i].level > user.level - range
  //   ) {
  //     userMatched;
  //     openInterveiweSessionService();
  //   }
  // }
  // if (!userMatched) {
  //   throw Error("could not find match");
  // }
};

const getRandomUserService = async () => {
  const random = Math.floor(Math.random() * 5 + 1);
  await Lobby.findOne({ name: 'global' }).then((obj) => {});
};

const getCurrentLevel = async (level) => {
  let resultArr;
  await Lobby.findOne({ name: 'global' }).then((obj) => {
    resultArr = obj.lobby[level];
  });
  return resultArr;
};

router.get('/available', (req, res) => {});

router.get('/createInterview', (req, res) => {});

// TO DO MOVE THIS TO SERVICE
const openInterveiweSessionService = () => {};
const addUsersToLobbyService = (user) => {
  const level = 1;
  Lobby.findOneAndUpdate({ name: 'global' }, { $push: { lobby: level } })
    .then((global) => {
      openInterveiweSessionService();
    })
    .catch((error) => {
      console.log(error);
    });
};

router.post('/addUsersToLobby', (req, res) => {
  console.log(typeof req.body);
  addUsersToLobbyService(req.body);
});

module.exports = router;
