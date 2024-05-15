import { useState } from "react";
import ReactQuill from "react-quill";
import { Textarea } from "../components/ui/textarea.jsx";
import "react-quill/dist/quill.snow.css";
import { Button } from "../components/ui/button.jsx";
import { userRequest } from "../lib/requestMethod.js";
import { useSelector } from "react-redux";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../lib/firebase.js";

export default function NewBlog() {
  const user = useSelector((state) => state.user.currentUser);
  const [blog, setBlog] = useState("");
  const [title, setTitle] = useState("");
  const [categories, setCategories] = useState([]);
  const [file, setFile] = useState(null);
  const ondescription = (value) => {
    setBlog(value);
    console.log(value)
  };

  const handlePublish = async () => {
    const fileName = new Date().getTime() + file.name;
    console.log(fileName);
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          const newBlog = {
            userId: user.iduser,
            Title: title,
            Thumbnail: downloadURL,
            Categories: categories.split(",").map((c) => c.trim()),
            Content: blog,
          };
          try {
            await userRequest.post("/blog/", newBlog);
            window.location.replace("/");
          } catch (err) {
            console.log(err);
          }
        });
      }
    );
  }
  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      [{ align: [] }],

      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],

      [{ size: ["small", false, "large", "huge"] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["link", "image", "video", "code-block"],
      [{ color: [] }, { background: [] }],

      ["clean"],
    ],
    clipboard: {
      matchVisual: false,
    },
  };
  return (
    <div className="text-black bg-muted p-2">
      <h2 className="font-bold text-xl m-2">
        Blog Title
      </h2>
      <Textarea
        value={title}
        className="mb-2 bg-white font-bold text-2xl border border-secondary-foreground"
        placeholder="Enter your blog title"
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <h2 className="font-bold text-lg p-2">Blog Thumbnail</h2>
      <input
        type="file"
        className="bg-white p-2"
        onChange={(e) => {
          setFile(e.target.files[0]);
        }}
      />
      <ReactQuill
        className=" bg-white"
        theme="snow"
        value={blog}
        modules={modules}
        onChange={ondescription}
        placeholder={"Write something awesome..."}
      />
      <div className="prose ql-editor" dangerouslySetInnerHTML={{ __html: blog }}></div>

      <h2 className="font-bold">
        Blog Categories
      </h2>
      <input
        type="text"
        onChange={(e) => {
          setCategories(e.target.value);
        }}
        placeholder="AI, Finance, Crypto"
        className="bg-white text-black border w-full p-2 border-secondary-foreground" />

      <Button onClick={handlePublish} className="m-2">
        Publish
      </Button>

    </div>
  );
}
