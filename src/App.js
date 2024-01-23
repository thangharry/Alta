import { useEffect, useState } from "react";
import "./App.css";
import Auth from "./components/Auth";

import { db } from "./firebase";
import {
    getDocs,
    collection,
    addDoc,
    deleteDoc,
    doc,
} from "firebase/firestore";

function App() {
    let [newtitle, setnewtitle] = useState("");
    let [newdate, setnewdate] = useState(0);
    let [newoscar, setnewoscar] = useState(false);

    const [movielist, setmovielist] = useState([]);

    // dòng này tham chiếu đến bộ sưu tập "movies" trong firestore
    const moviesCollection = collection(db, "movies");

    //dùng để lấy dữ liệu từ firebase
    const getMovieList = async () => {
        try {
            // dòng này lấy tất cả các dữ liệu từ collection "movies" trong firestore
            const data = await getDocs(moviesCollection);
            console.log(data);

            const filterData = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            // console.log(filterData);
            setmovielist(filterData);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getMovieList();
    }, []);

    let handleChangeTitle = (e) => {
        setnewtitle(e.target.value);
    };
    let handleChangeDate = (e) => {
        setnewdate(Number(e.target.value));
    };
    let handelCheck = (e) => {
        setnewoscar(e.target.checked);
    };
    let handelSubmit = async () => {
        try {
            await addDoc(moviesCollection, {
                tieuDe: newtitle,
                namSanXuat: newdate,
                NhanOscar: newoscar,
            });
            getMovieList();
        } catch (error) {}
    };

    let handleClickdelet = async (id) => {
        let docs = doc(db, "movies", id);
        try {
            await deleteDoc(docs);
        } catch (error) {}
    };
    return (
        <div className="App">
            <Auth />
            <input
                type="text"
                placeholder="tựa đề phim...."
                value={newtitle}
                onChange={(e) => {
                    handleChangeTitle(e);
                }}
            />
            <input
                type="number"
                placeholder="năm phát hành..."
                value={newdate}
                onChange={(e) => {
                    handleChangeDate(e);
                }}
            />
            <input
                type="checkbox"
                onChange={(e) => {
                    handelCheck(e);
                }}
            />
            <label>nhận giải oscar</label>
            <button
                onClick={() => {
                    handelSubmit();
                }}
            >
                submit
            </button>
            {movielist.map((movie) => {
                return (
                    <div>
                        <h1
                            style={{ color: movie.NhanOscar ? "green" : "red" }}
                        >
                            {movie.tieuDe}
                        </h1>
                        <p>{movie.namSanXuat}</p>
                        <button onClick={() => handleClickdelet(movie.id)}>
                            Delete movie
                        </button>
                    </div>
                );
            })}
        </div>
    );
}

export default App;
