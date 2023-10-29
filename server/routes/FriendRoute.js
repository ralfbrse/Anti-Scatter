const { getFriends, deleteFriend } = require("../controllers/FriendshipController");
const { getFriendRequests, rejectFriendRequest, acceptFriendRequest, addFriendRequest, deleteFriendRequest } = require("../controllers/FriendRequestController");
const router = require("express").Router();

// Friend Requests
router.get("/request/:userId", getFriendRequests)
router.post("/request", addFriendRequest);
router.delete("/request", deleteFriendRequest);
router.put("/request/accept", acceptFriendRequest);
router.put("/request/reject", rejectFriendRequest);

// Friends List
router.get("/:userId", getFriends);
router.delete("/", deleteFriend);

module.exports = router;