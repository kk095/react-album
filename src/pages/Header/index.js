import { useState } from "react";
import "./styles.css";
import { api } from "../../services/api.js";

export const Header = () => {
  const [userid, setuserid] = useState("");
  const [id, setid] = useState("");
  const [title, settitle] = useState("");
  const [dis, setdis] = useState(true);

  const handleNewBtn = (e) => {
    setdis(false);
  };

  const inputChange = (e) => {
    const name = e.target.name;
    if (name === "userid") {
      setuserid(e.target.value);
    } else if (name === "id") {
      setid(e.target.value);
    } else {
      settitle(e.target.value);
    }
  };

  async function formClicked(e) {
    e.preventDefault();
    try {
      let newdata = await api.addAlbum(userid, id, title);
      setid("");
      settitle("");
      setuserid("");
      setdis(true);
      alert(`added successfully! ${JSON.stringify(newdata.data)}`);
    } catch (e) {
      console.log(e);
      alert("error!");
    }
  }
  return (
    <header>
      <div className="headerdiv">
        <h1>Gallery</h1>
        {dis === true && (
          <button className="add-alb" onClick={handleNewBtn}>
            New Album
          </button>
        )}
        {dis === false && (
          <button className="add-alb btn-display" onClick={handleNewBtn}>
            New Album
          </button>
        )}
      </div>
      <div className="album-form">
        {dis === true && (
          <form className="btn-display">
            <input
              type="text"
              name="userid"
              value={userid}
              onChange={inputChange}
              placeholder="Enter UserID"
            ></input>
            <input
              type="text"
              name="id"
              value={id}
              onChange={inputChange}
              placeholder="Enter Id"
            ></input>
            <input
              type="text"
              name="title"
              value={title}
              onChange={inputChange}
              placeholder="Enter Title"
            ></input>
            <button type="submit" onClick={formClicked}>
              Add Album
            </button>
          </form>
        )}
        {dis === false && (
          <form>
            <input
              type="text"
              name="userid"
              value={userid}
              onChange={inputChange}
              placeholder="Enter UserID"
            ></input>
            <input
              type="text"
              name="id"
              value={id}
              onChange={inputChange}
              placeholder="Enter Id"
            ></input>
            <input
              type="text"
              name="title"
              value={title}
              onChange={inputChange}
              placeholder="Enter Title"
            ></input>
            <button type="submit" onClick={formClicked}>
              Add Album
            </button>
          </form>
        )}
      </div>
    </header>
  );
};
