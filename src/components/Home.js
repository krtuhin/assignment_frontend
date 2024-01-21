import React from "react";
import QueueIcon from "@mui/icons-material/Queue";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const Home = () => {
  const [state, setState] = React.useState([]);

  // get data from database
  React.useEffect(() => {
    async function getData() {
      let response = await fetch(
        "https://crud-backend.up.railway.app/api/get-all-data"
      );
      let data = await response.json();
      setState(data);
    }
    getData();
  }, []);

  // method to delete data from database
  function deleteData(id, index) {
    fetch("https://crud-backend.up.railway.app/api/delete-data" + id, {
      method: "DELETE",
    })
      .then((res) => res.json)
      .then((data) => console.log(data));

    let arr = [...state];
    arr.splice(index, 1);
    setState(arr);
  }

  return (
    <div>
      <div className="flex flex-col">
        {/* heading */}
        <h2 className="text-2xl font-bold">My Projects</h2>

        {/* main body */}
        <div className="w-full flex justify-between flex-wrap">
          {/* add project button */}
          <div className="bg-white max-w-96 w-72 md:w-64 h-56 md:h-44 max-h-80 px-4 py-2 rounded-lg flex flex-col shadow m-4">
            <Link to={"/add-project"}>
              <div className="bg-orange-300 w-64 md:w-56 h-36 md:h-28 rounded-lg items-center justify-center flex cursor-pointer">
                <QueueIcon fontSize="large" htmlColor="white" />
              </div>
            </Link>
            <div className="flex justify-center items-center flex-col mt-2">
              <h4 className="font-semibold">Create a new project</h4>
              <p className="text-xs font-semibold mt-1">
                or try a
                <span className="text-orange-300 ml-1">sample project</span>
              </p>
            </div>
          </div>
          {/* end add project button */}

          {/* project cards */}
          {state.map((item, index) => {
            return (
              <div key={index}>
                {/* single project card */}
                <div className="w-full flex m-4">
                  <div className="bg-white max-w-96 w-72 md:w-64 h-56 md:h-44 max-h-80 px-4 py-2 rounded-lg flex flex-col shadow">
                    {/* project image */}
                    <div className="bg-white w-64 md:w-56 h-36 md:h-28 rounded-lg items-center justify-center flex cursor-pointer">
                      <img
                        src={item.url}
                        alt="image"
                        className="rounded-lg mt-7"
                      />
                    </div>

                    {/* name and action button */}
                    <div className="w-full flex justify-center items-center flex-row mt-7">
                      <div className="w-11/12 flex justify-center items-center">
                        <h4 className="font-semibold text-sm">{item.name}</h4>
                      </div>
                      <div className="w-1/12 flex justify-center items-center">
                        <Button
                          color="error"
                          size={"70"}
                          onClick={() => {
                            deleteData(item.id, index);
                          }}
                        >
                          <DeleteIcon />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* end single project card */}
              </div>
            );
          })}
        </div>
        {/* end body */}
      </div>
    </div>
  );
};

export default Home;
