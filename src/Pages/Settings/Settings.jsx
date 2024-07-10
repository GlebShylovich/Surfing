import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { updateUsername } from "../../Common/edit";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getUserData, useEditData } from "../../Services/services";
import { storage } from "../../main";
import Loading from "../../Components/Loading/Loading";
import { IoCheckmark } from "react-icons/io5";
import defaultPic from "../../assets/defaultProfilePic.svg";
import backbtn from "../../assets/backbtn.svg";
import "./Settings.scss";

export default function Settings() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState(defaultPic);
  const [file, setFile] = useState(null);

  const auth = getAuth();
  const navigate = useNavigate();
  const editDataMutation = useEditData();

  useEffect(() => {
    async function fetchUserData() {
      try {
        const currentUser = auth.currentUser;
        if (currentUser) {
          const data = await getUserData(currentUser.uid);
          setUser(data);
          const storageRef = ref(storage, `avatars/${currentUser.uid}`);
          const url = await getDownloadURL(storageRef);
          setAvatar(url);
        }
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchUserData();
  }, [auth]);

  function handleUpdateUsername(e) {
    e.preventDefault();
    const user = auth.currentUser;
    if (username && user) {
      updateUsername(editDataMutation, username, user.uid);
    }
  }

  function handleFile(e) {
    setFile(e.target.files[0]);
  }

  async function uploadFile() {
    const user = auth.currentUser;
    if (file && user) {
      const storageRef = ref(storage, `avatars/${user.uid}`);
      try {
        const snapshot = await uploadBytes(storageRef, file);
        const url = await getDownloadURL(snapshot.ref);
        setAvatar(url);
        setFile(null);
      } catch (error) {
        console.error(error);
      }
    }
  }

  if (loading) return <Loading />;

  return (
    <div className="settings">
      <button onClick={() => navigate("/profile")} className="backBtn">
        <img src={backbtn} alt="back" />
      </button>
      <div className="settings__container">
        <div className="settings__title">Settings</div>
        <div className="settings__pic">
          <img src={avatar} alt="User Avatar" />
          <input
            onChange={handleFile}
            type="file"
            id="file"
            className="settings__picInput"
          />
          {!file ? (
            <label htmlFor="file" className="settings__picLabel">
              Change avatar
            </label>
          ) : (
            <button
              onClick={uploadFile}
              className="settings__picLabel"
              disabled={!file}
            >
              Save
            </button>
          )}
        </div>
        <div className="settings__profileEdit">
          <form
            onSubmit={handleUpdateUsername}
            className="settings__usernameBox"
          >
            <label>Username</label>
            <div className="settings__usernameBox-inputBox">
              <input
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                type="text"
                placeholder={user.name}
              />
              {username.length > 2 && (
                <IoCheckmark
                  type="submit"
                  className="settings__usernameBox-submit"
                />
              )}
            </div>
          </form>
          <form className="settings__emailBox">
            <label>Email</label>
            <input type="text" value={user.email} />
          </form>
        </div>
      </div>
    </div>
  );
}
