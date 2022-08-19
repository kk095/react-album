import axios from "axios";
const axiosInstance = axios.create({
  baseURL: `https://jsonplaceholder.typicode.com/`,
});

export const api = {
  // to fetch all albums
  async getAlbums() {
    const response = await axiosInstance(`/albums`);
    return response.data;
  },

  // to fetch particular album info
  async getAlbumTitle(albumID) {
    const response = await axiosInstance(`/albums/${albumID}`);
    return response.data.title;
  },

  // to get all photos of particular album
  async getPhotos(albumID) {
    const response = await axiosInstance(`albums/${albumID}/photos`);
    return response.data;
  },

  // to get particaular photo from photos of particular album
  async getPhoto(photoID) {
    const response = await axiosInstance(`/photos/${photoID}`);
    return response.data;
  },

  // to add new album
  async addAlbum(userid, id, title) {
    try {
      let data = {
        userId: userid,
        id: id,
        title: title,
      };
      const newAlbum = await axios.post(
        "https://jsonplaceholder.typicode.com/albums",
        data
      );
      if (newAlbum) {
        return newAlbum;
      }
    } catch (e) {
      console.log(e);
      return {
        msg: "error",
      };
    }
  },

  // to delete particular album
  async delAlbum(delid) {
    const delId = delid;
    let del = await axios.delete(
      `https://jsonplaceholder.typicode.com/albums/${delId}`
    );
    return del;
  },

  // to edit or update the particular album
  async editAlbum(id, title) {
    const newtitle = {
      title: title,
    };
    let edit = await axios.patch(
      `https://jsonplaceholder.typicode.com/albums/${id}`,
      newtitle
    );
    return edit;
  },
};
