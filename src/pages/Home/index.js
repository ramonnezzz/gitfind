import { AnimatePresence, motion } from "framer-motion";
import { Header } from "../../components/Header";
import background from "../../assets/background.png";
import "./styles.css";
import ItemList from "../../components/ItemList";
import { useState } from "react";
import { fadeIn } from "./variants";

function App() {
  const [user, setUser] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [repos, setRepos] = useState(null);
  const handleGetData = async () => {
    const userData = await fetch(`https://api.github.com/users/${user}`);
    const newUser = await userData.json();

    if (newUser.name) {
      const { avatar_url, name, bio, login } = newUser;
      setCurrentUser({ avatar_url, name, bio, login });

      const reposData = await fetch(
        `https://api.github.com/users/${user}/repos`
      );
      const newRepos = await reposData.json();

      if (newRepos.length) {
        setRepos(newRepos);
      }
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        variants={fadeIn("down", 0.2)}
        initial="hidden"
        animate="show"
        exit="hidden"
      >
        <Header />
        <div className="conteudo">
          <img
          variants={fadeIn('right', 0.6)}
          initial="hidden"
          animate="show"
          exit="hidden"
          src={background}
          className="background"
          alt="background.png" 
          />
          <div className="info">
            <div>
              <input
                name="user"
                value={user}
                onChange={(event) => setUser(event.target.value)}
                placeholder="@username"
                required
              />
              <button onClick={handleGetData}>Search</button>
            </div>
            {currentUser?.name ? (
              <>
                <div className="perfil">
                  <img
                    src={currentUser.avatar_url}
                    className="profile"
                    alt="profile-user"
                  />

                  <div>
                    <h3>{currentUser.name}</h3>
                    <span>@{currentUser.login}</span>
                    <p>{currentUser.bio}</p>
                  </div>
                </div>
                <hr />
              </>
            ) : null}
            {repos?.length ? (
              <div>
                <h4 className="repo">Repositories</h4>
                {repos.map((repo, index) => (
                  <ItemList
                    key={index}
                    title={repo.name}
                    description={repo.description}
                  />
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default App;
