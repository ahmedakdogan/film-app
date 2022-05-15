import { useEffect } from "react";
import "./styles.css";
import Masonry from "react-masonry-css";
import { useDispatch, useSelector } from "react-redux";
import { fetchCharacters } from "../../api/service";
import { Loading } from "../../components/Loading";
import { Error } from "../../components/Error";

function Home() {
    const dispatch = useDispatch();
    const isLoading = useSelector((state: any) => state.characters.isLoading);
    const error = useSelector((state: any) => state.characters.error);
    const characters = useSelector((state: any) => state.characters.items);
    const nextPage = useSelector((state: any) => state.characters.page);
    const hasNextPage = useSelector((state: any) => state.characters.hasNextPage);

    useEffect(() => {
        dispatch(fetchCharacters(nextPage) as any);
    }, [dispatch]);

    if (error) {
        return (<Error error={error}></Error>)
    }

    return (
        <div>
            <Masonry
                key={"1"}
                breakpointCols={4}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column">
                {characters.map((character: any) => (
                    <div key={character.char_id}>
                        <img alt={character.name} src={character.img} className="character"></img>
                        <div>{character.name}</div>
                    </div>
                ))}
            </Masonry>
            <div style={{ padding: "20px 0 40px 0", textAlign: "center" }}>
                {isLoading && <Loading></Loading>}
                {hasNextPage && !isLoading && <button onClick={() => dispatch(fetchCharacters(nextPage) as any)}>Load more({nextPage})</button>}
            </div>
        </div>
    )
}

export default Home;