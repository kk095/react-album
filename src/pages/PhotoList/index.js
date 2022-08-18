import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../../services/api.js";

import "./styles.css";

import { ScrollToTop } from "../../shared/ScrollToTop/index.js";
import { PagesBackButton } from "../../shared/PagesBackButton/index.js";
import { Loading } from "../../shared/Loading/index.js";
import { Title } from "../../shared/Title/index.js";

export const PhotoList = () => {
  const [photos, setPhotos] = useState([]);
  const [albumTitle, setAlbumTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { albumID } = useParams();

  useEffect(() => {
    const getPhotoList = async () => {
      if (albumID) {
        setIsLoading(true);
        const title = await api.getAlbumTitle(albumID);
        const photoList = await api.getPhotos(albumID);

        if (photoList) {
          setAlbumTitle(title);
          setPhotos(photoList);
          setIsLoading(false);
        }
      }
    };

    getPhotoList();
  }, [albumID]);

  return (
    <>
      <Title title={albumTitle} />
      <ul className="photolistcont">
        <PagesBackButton />
        {isLoading && <Loading />}

        {photos.map((photo) => {
          return (
            <Link key={photo.id} to={`/photos/${photo.id}`}>
              <li className="photoitem">
                <img
                  className="picthumb"
                  src={photo.thumbnailUrl}
                  alt="thumbnail_150x150"
                />
              </li>
            </Link>
          );
        })}

        <ScrollToTop />
      </ul>
    </>
  );
};
