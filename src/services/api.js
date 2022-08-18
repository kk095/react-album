import axios from "axios";
const axiosInstance = axios.create({
  baseURL: `https://jsonplaceholder.typicode.com/`,
});

export const api = {
  async getAlbums() {
    const response = await axiosInstance(`/albums`);
    return response.data;
  },

  async getAlbumTitle(albumID) {
    const response = await axiosInstance(`/albums/${albumID}`);
    return response.data.title;
  },

  async getPhotos(albumID) {
    const response = await axiosInstance(`albums/${albumID}/photos`);
    return response.data;
  },

  async getPhoto(photoID) {
    const response = await axiosInstance(`/photos/${photoID}`);
    return response.data;
  },

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

  async delAlbum(delid) {
    const delId = delid;
    let del = await axios.delete(
      `https://jsonplaceholder.typicode.com/albums/${delId}`
    );
    return del;
  },

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
