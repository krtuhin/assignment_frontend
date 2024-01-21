import { Button } from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const AddProject = () => {
  const navigate = useNavigate();

  let val = Math.floor(Math.random() * 6);

  const [imgs, setImgs] = React.useState([]);
  const [form, setForm] = React.useState({
    name: "",
    url: "https://picsum.photos/id/4/5000/3333",
  });

  React.useEffect(() => {
    async function getData() {
      let call = await fetch("https://picsum.photos/v2/list?page=1&limit=6");
      let _data = await call.json();
      setImgs(_data);
    }
    getData();
  }, []);

  const addData = async () => {
    setForm({ ...form, url: imgs[val].download_url });
    try {
      if (form.name.trim() != "") {
        await fetch("https://crud-backend.up.railway.app/api/save-data", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });

        console.log("done");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="p-4 md:p-5 md:mx-96 mx-4">
        <div>
          <input
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            type="text"
            id="name"
            placeholder="Card name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            required
          />
          {form.name.trim() == "" ? (
            <h4 className="text-xs text-red-600 ml-2">
              Project name cannot be empty..!
            </h4>
          ) : (
            ""
          )}
        </div>
        <div className="mt-4">
          <input
            value={form.url}
            type="text"
            id="url"
            placeholder="Image URL"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            required
          />
          {form.url.trim() == "" ? (
            <h4 className="text-xs text-red-600 ml-2">
              Project URL cannot be empty..!
            </h4>
          ) : (
            ""
          )}
        </div>
        <div className="flex mt-4 justify-center">
          <Button
            color="warning"
            variant="contained"
            onClick={() => {
              addData();
            }}
          >
            Add Card
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddProject;
