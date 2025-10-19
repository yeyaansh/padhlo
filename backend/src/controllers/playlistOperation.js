import playlistContainer from "../models/playlistContainerSchema.js";

const fetchAllPlaylist = async (req, res) => {
  try {
    const playlistInfo = await playlistContainer.find({
      playlistCreator: `${req.result._id}`,
    });

    console.log(playlistInfo);
    

    res.status(200).send({
      playlistInfo,
      status: true,
      message: "Successfully fetched all Playlist",
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: false,
      message: `${error.message}`,
    });
  }
};
const fetchPlaylistById = async (req, res) => {
  try {
    const { playlistId } = req.params;
    console.log(playlistId);

    const playlistInfo = await playlistContainer
      .findById(`${playlistId}`)
      .populate("problemStore");

    if (!playlistInfo)
      throw new Error("This playlist doesn't exist or has been removed!");
    console.log(playlistInfo);

    res.status(200).send({
      playlistInfo,
      status: true,
      message: "Successfully fetched the Playlist by Id",
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: false,
      message: `${error.message}`,
    });
  }
};

const createPlaylist = async (req, res) => {
  try {
    console.log(req.body);
    const playlistData = {};
    const { playlistName, playlistDescription } = req.body;

    if (!playlistName) throw new Error("Plese enter playlist name!");
    playlistData.playlistName = playlistName;
    if (playlistDescription)
      playlistData.playlistDescription = playlistDescription;

    const playlistInfo = await playlistContainer.create({
      ...playlistData,
      playlistCreator: req.result._id,
    });

    req.result.playlist.push(playlistInfo._id);

    req.result.save();

    res.status(201).send({
      playlistInfo,
      success: true,
      message: "Playlist created successfully...",
    });
  } catch (error) {
    console.log(error);
    res.send({
      success: false,
      message: `${error.message}` || "Error while creating playlist...",
    });
  }
};

const addProblemToPlaylist = async (req, res) => {
  try {
    const { problemId, playlistId } = req.body;

    const playlist = await playlistContainer.findById(playlistId);

    if (!playlist.playlistCreator.equals(req.result._id)) {
      throw new Error("You are not the owner of this playlist!");
    }

    if (!playlist.problemStore.find((problem) => problem == problemId))
      playlist.problemStore.push(problemId);
    else throw new Error("This problem already exist in your playlist!");

    await playlist.save();

    console.log(playlist);

    res.status(201).send({
      playlist,
      success: true,
      message: "Problem added successfully to your playlist!",
    });
  } catch (error) {
    console.log(error);
    res.send({
      success: false,
      message:
        `${error.message}` || "Error while adding problem to your playlist!",
    });
  }
};

export {
  fetchPlaylistById,
  createPlaylist,
  addProblemToPlaylist,
  fetchAllPlaylist,
};
