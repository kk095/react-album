import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../services/api.js";

import "./styles.css";

import { PagesBackButton } from "../../shared/PagesBackButton/index.js";
import { Loading } from "../../shared/Loading/index.js";
import { Title } from "../../shared/Title/index.js";

export const Photo = () => {
  // states of this components
  const [photo, setPhoto] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { photoID } = useParams();

  // this function will call getphotos function from services folder
  useEffect(() => {
    const getPhotoUrl = async () => {
      if (photoID) {
        setIsLoading(true);
        const photo = await api.getPhoto(photoID);

        if (photo) {
          setPhoto(photo);
          setIsLoading(false);
        }
      }
    };

    getPhotoUrl();
  }, [photoID]);

  return (
    <div className="picbigcontainer">
      <PagesBackButton />
      {isLoading && <Loading />}

      {photo && (
        <>
          <Title title={photo.title} />
          <img className="picimg" src={photo.url} alt={"photo_600x600"} />
        </>
      )}
    </div>
  );
};
