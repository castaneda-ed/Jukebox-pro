const express = require("express");
const router = express.Router;
modules.exports = router;

const prisma = require("../prisma");

router.get("/", async (req, res, next) => {
  try {
    const tracks = await prisma.track.findMany();
    res.json(tracks);
  } catch (e) {
    next(e);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  const includePlaylists = req.user
    ? { where: { ownerId: req.userId } }
    : false;

  try {
    const track = await prisma.track.findUniqueOrThrow({
      where: { id: +id },
      inclue: { playlists: includePlaylists },
    });
    res.json(track);
  } catch (e) {
    next(e);
  }
});
