const LEADER_KEY = 'LEADER_KEY';

const uuid = Math.floor(Math.random() * 10000000);
const leaderHeartbeatInterval = 200;
const electionTimeout = 500;

const logNode = document.querySelector('#whoami');

function log(message) {
    logNode.textContent = message;
}

function findLeader() {
    const leaderId = localStorage.getItem(LEADER_KEY);
    if (leaderId === null) {
        return becomeLeader();
    }
    listenToLeaderHeartbeat();
}

function becomeLeader() {
    log(`Node ${uuid} is the leader`);
    localStorage.setItem(LEADER_KEY, uuid);
    localStorage.setItem(uuid, Date.now());
    setTimeout(becomeLeader, leaderHeartbeatInterval);
}

function listenToLeaderHeartbeat() {
    log(`Node ${uuid} is a follower`);
    const leaderUUID = localStorage.getItem(LEADER_KEY);
    const leaderHeartbeat = Number(localStorage.getItem(leaderUUID));
    if (Date.now() - leaderHeartbeat > electionTimeout) {
        return becomeLeader();
    }
    setTimeout(listenToLeaderHeartbeat, electionTimeout);
}

findLeader();
