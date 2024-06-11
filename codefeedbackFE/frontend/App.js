import UserJoin from "./pages/UserJoin";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import UserLogin from "./pages/UserLogin";
import Home from "./pages/Home";
import UserEdit from "./pages/UserEdit";
import UserInfo from "./pages/UserInfo";
import PostDetail from "./pages/PostDetail";
import PostEdit from "./pages/PostEdit";
import MyPostList from "./pages/MyPostList";
import PublicPostList from "./pages/PublicPostList";

function App() {
  return (
      <>
        <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/user/join" element={<UserJoin />} />
              <Route path="/user/login" element={<UserLogin />} />
              <Route path="/user/edit" element={<UserEdit/>}/>
              <Route path="/user/info" element={<UserInfo/>}/>
              <Route path="/post/:postId" element={<PostDetail/>}/>
              <Route path="/post/edit/:postId" element={<PostEdit/>}/>
              <Route path="/post/mine" element={<MyPostList/>}/>
              <Route path="/post/public" element={<PublicPostList/>}/>
            </Routes>
        </BrowserRouter>
      </>
  );
}

export default App;
