import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";

const ProjectCard = ({ deleteData, id, name, url }) => {
  return (
    <div className="w-full justify-between flex flex-col">
      <div className="w-full flex m-4">
        <div className="bg-white max-w-72 w-64 h-44 max-h-48 px-4 py-2 rounded-lg flex flex-col shadow">
          <div className="bg-white w-56 h-36 rounded-lg items-center justify-center flex cursor-pointer">
            <img src={url} alt="image" className="rounded-lg h-36" />
          </div>
          <div className="flex justify-center items-center flex-row mt-1">
            <h4 className="font-semibold text-sm">{name}</h4>
            <div>
              <Button onClick={deleteData(id)}>
                <DeleteIcon />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
