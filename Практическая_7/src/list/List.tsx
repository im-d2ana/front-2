import Navbar from "../components/Navbar";
import AircraftsGrid from "./components/AircraftsGrid";
import Footer from "../components/Footer";

function List() {
    return (
        <div>
            <Navbar active='2' />
            <AircraftsGrid />
            <Footer />
        </div>
    );
}

export default List;