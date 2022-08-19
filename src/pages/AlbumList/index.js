import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { ScrollToTop } from "../../shared/ScrollToTop/index.js";

import "./styles.css";

import { api } from "../../services/api.js";
import { Loading } from "../../shared/Loading/index.js";

// function based component
export const AlbumList = () => {
  // states of this component
  const [albums, setAlbums] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [mytitle, settitle] = useState("");
  const [editbtn, setbtn] = useState(true);

  // in this , we are calling albumlist from services folder
  useEffect(() => {
    const getAlbumList = async () => {
      try {
        setIsLoading(true);
        const albumList = await api.getAlbums();
        if (albumList) {
          setAlbums(albumList);
          setIsLoading(false);
        }
      } catch (error) {
        alert(error);
      }
    };

    getAlbumList();
  }, []);

  // on clicking delete album button
  const delAlbum = async function (e, id) {
    try {
      let delItem = await api.delAlbum(id);
      if (delItem.status === 200) {
        alert(`successfully deleted!,album id :${id}`);
      }
    } catch (e) {
      console.log(e);
    }
  };

  // when change in edit form input
  const editformInput = (e) => {
    settitle(e.target.value);
  };

  // when click album edit form
  const editAlbum = function (e, title, id) {
    settitle(title);
    console.log(e.target);
    let ele = document.getElementById(id);
    ele.style.display = "flex";
    setbtn(false);
  };

  // when submit edit album form
  const editFormSubmit = async function (e, id) {
    try {
      e.preventDefault();
      console.log(mytitle);
      console.log(id);
      let ele = document.getElementById(id);
      ele.style.display = "none";
      setbtn(true);
      let updated = await api.editAlbum(id, mytitle);
      console.log(updated);
      alert(`successfully updated ! , ${JSON.stringify(updated.data)}`);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ul>
      {isLoading && <Loading />}

      {albums.map(({ id, title }) => {
        return (
          <div className="all-album">
            <div>
              {editbtn === true && (
                <button onClick={(e) => editAlbum(e, title, id)}>Edit</button>
              )}
              {editbtn === false && (
                <button
                  className="nondis"
                  onClick={(e) => editAlbum(e, title, id)}
                >
                  Edit
                </button>
              )}
              <button onClick={(e) => delAlbum(e, id)}>Delete</button>
            </div>
            <div className="edit-form">
              <form class="myeditform" id={id}>
                <input
                  className="editinput"
                  type="text"
                  name="userid"
                  onChange={editformInput}
                  value={mytitle}
                ></input>
                <button
                  type="submit"
                  class="updatebtn"
                  onClick={(e) => editFormSubmit(e, id)}
                >
                  Update
                </button>
              </form>
            </div>
            <Link key={id} to={`/albums/${id}`}>
              <li key={id}>
                <h3>{title}</h3>
              </li>
            </Link>
          </div>
        );
      })}

      <ScrollToTop />
    </ul>
  );
};
