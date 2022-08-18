import { useRoutes } from "react-router-dom";

import { AlbumList } from "../pages/AlbumList/index.js";
import { PhotoList } from "../pages/PhotoList/index.js";
import { Photo } from "../pages/Photo/index.js";
import { PageNotFound } from "../pages/PageNotFound/index.js";

export const MainRoutes = () => {
  return useRoutes([
    { path: "/react-album", element: <AlbumList /> },
    { path: "/albums/:albumID", element: <PhotoList /> },
    { path: "/photos/:photoID", element: <Photo /> },
    { path: "*", element: <PageNotFound /> },
  ]);
};
