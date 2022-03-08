import { Link } from "react-router-dom";
import { logoutReq } from "./HomeApi";

function Home({ userName }: { userName: string }) {
  const handleLogout = async () => {
    await logoutReq();
  };
  return (
    <div className="App">
      <div className="Header">
        {userName ? <h1>Welcome {userName}</h1> : <></>}
      </div>
      <div className="Сentered" style={{ marginTop: "30px" }}>
        <h2>To logout click&nbsp;</h2>
        <Link onClick={handleLogout} className="EntryLink" to="/">
          <h2 style={{ borderBottom: "1px" }}>
            <u>here</u>
          </h2>
        </Link>
      </div>
    </div>
  );
}

export default Home;
